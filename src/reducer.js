import * as actionTypes from './actionTypes';

let lastId = 0;

export default function reducer(state = [], action) {
	switch (action.type) {
		case actionTypes.BUG_ADDED: {
			return [
				...state,
				{
					id: ++lastId,
					description: action.payload.description,
					resolved: false,
				},
			];
		}
		case actionTypes.BUG_REMOVED: {
			return state.filter((bugItem) => bugItem.id !== action.payload.id);
		}
		case actionTypes.BUG_RESOLVED: {
			return state.map((bugItem) =>
				bugItem.id === action.payload.id
					? { ...bugItem, resolved: true }
					: bugItem
			);
		}
		default: {
			return state;
		}
	}
}
