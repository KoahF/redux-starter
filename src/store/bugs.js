import { createAction, createReducer } from '@reduxjs/toolkit';

// Actions
export const bugAdded = createAction('bugAdded');
export const bugRemoved = createAction('bugRemoved');
export const bugResolved = createAction('bugResolved');

// Reducer
let lastId = 0;

export default createReducer([], {
	[bugAdded.type]: (bugs, action) => {
		bugs.push({
			id: ++lastId,
			description: action.payload.description,
			resolved: false,
		});
	},
	[bugRemoved.type]: (bugs, action) => {
		bugs.filter((item) => item.id !== action.payload.id);
	},
	[bugResolved.type]: (bugs, action) => {
		const index = bugs.findIndex((bug) => bug.id === action.payload.id);
		bugs[index].resolved = true;
	},
});


