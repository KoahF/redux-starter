import store from './store';
import { BUG_ADDED, BUG_REMOVED } from './actionTypes';

const unsubscribe = store.subscribe(() => {
	console.log("Store changed!", store.getState());
})

store.dispatch({
	type: BUG_ADDED,
	payload: {
		description: 'Bug 1',
	},
});

store.dispatch({
	type: BUG_REMOVED,
	payload: {
		id: 1,
	}
})