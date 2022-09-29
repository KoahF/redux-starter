import { createSelector, createSlice } from '@reduxjs/toolkit';
import moment from 'moment/moment';
import { apiCallBegan } from './api';

let lastId = 0;
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
			bugs.list.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			});
		},

		bugRemoved: (bugs, action) => {
			bugs.list.filter((item) => item.id !== action.payload.id);
		},

		bugResolved: (bugs, action) => {
			const index = bugs.findIndex((bug) => bug.id === action.payload.id);
			bugs.list[index].resolved = true;
		},
	},
});

export const {
	bugAdded,
	bugResolved,
	bugsReceived,
	bugsRequested,
	bugsRequestFailed,
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

// Selectors
export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(bugs) => bugs.filter((bug) => !bug.resolved)
);
