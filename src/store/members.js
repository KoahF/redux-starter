import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;
const slice = createSlice({
	name: 'members',
	initialState: [],
	reducers: {
		memberAdded: (members, action) => {
			members.push({
				id: ++lastId,
				name: action.payload.name,
				bugIds: [],
			});
		},
	},
});

export const { memberAdded } = slice.actions;
export default slice.reducer;
