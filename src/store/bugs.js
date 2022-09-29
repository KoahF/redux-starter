import { createSelector, createSlice } from '@reduxjs/toolkit';
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
		bugsReceived: (bugs, action) => {
			bugs.list = action.payload;
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

export const { bugAdded, bugResolved, bugsReceived } = slice.actions;
export default slice.reducer;

// Action creators
const API_ENDPOINT = '/bugs';
export const loadBugs = () =>
	apiCallBegan({
		url: API_ENDPOINT,
		onSuccess: bugsReceived.type,
	});

// Selectors
export const getUnresolvedBugs = createSelector(
	(state) => state.entities.bugs,
	(bugs) => bugs.filter((bug) => !bug.resolved)
);
