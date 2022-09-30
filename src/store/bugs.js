import { createSelector, createSlice } from '@reduxjs/toolkit';
import moment from 'moment/moment';
import { apiCallBegan } from './api';

const slice = createSlice({
	name: 'bugs',
	initialState: {
		list: [],
		loading: false,
		lastFetch: null,
	},
	reducers: {
		bugsRequested: (bugs, action) => {
			bugs.loading = true;
		},

		bugsReceived: (bugs, action) => {
			bugs.list = action.payload;
			bugs.loading = false;
			bugs.lastFetch = Date.now();
		},

		bugsRequestFailed: (bugs, action) => {
			bugs.loading = false;
		},

		bugAdded: (bugs, action) => {
			bugs.list.push(action.payload);
		},

		bugRemoved: (bugs, action) => {
			bugs.list.filter((item) => item.id !== action.payload.id);
		},

		bugAssignedToMember: (bugs, action) => {
			const { id: bugId, userId } = action.payload;
			const index = bugs.list.findIndex((bug) => bug.id === bugId);
			bugs.list[index].userId = userId;
		},

		bugResolved: (bugs, action) => {
			const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
			bugs.list[index].resolved = true;
		},
	},
});

const {
	bugAdded,
	bugResolved,
	bugsReceived,
	bugsRequested,
	bugsRequestFailed,
	bugAssignedToMember,
} = slice.actions;
export default slice.reducer;

// Action creators
const API_ENDPOINT = '/bugs';
export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs;

	const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
	if (diffInMinutes < 10) return;

	dispatch(
		apiCallBegan({
			url: API_ENDPOINT,
			onStart: bugsRequested.type,
			onSuccess: bugsReceived.type,
			onFailed: bugsRequestFailed.type,
		})
	);
};

export const addBug = (bug) =>
	apiCallBegan({
		url: API_ENDPOINT,
		method: 'POST',
		data: bug,
		onSuccess: bugAdded.type,
	});

export const assignBugToMember = (bugId, userId) =>
	apiCallBegan({
		url: `${API_ENDPOINT}/${bugId}`,
		method: 'PATCH',
		data: {
			bugId,
			userId,
		},
		onSuccess: bugAssignedToMember.type,
	});

export const resolveBug = (bugId) =>
	apiCallBegan({
		url: `${API_ENDPOINT}/${bugId}`,
		method: 'PATCH',
		data: {
			resolved: true,
		},
		onSuccess: bugResolved.type,
	});

// Selectors
export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(bugs) => bugs.filter((bug) => !bug.resolved)
);
