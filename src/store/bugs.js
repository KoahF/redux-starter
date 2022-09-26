import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;
const slice = createSlice({
	name: 'bugs',
	initialState: [],
	reducers: {
		bugAdded: (bugs, action) => {
			bugs.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			});
		},
		bugRemoved: (bugs, action) => {
			bugs.filter((item) => item.id !== action.payload.id);
		},
		bugResolved: (bugs, action) => {
			const index = bugs.findIndex((bug) => bug.id === action.payload.id);
			bugs[index].resolved = true;
		},
	},
});

// Selectors
export function getUnresolvedBugs(state) {
	return state.entities.bugs.filter((bug) => !bug.resolved);
}

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;
