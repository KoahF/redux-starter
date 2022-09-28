import configureStore from './store/configureStore';
import { bugAdded, bugResolved, getUnresolvedBugs } from './store/bugs';
import { projectAdded } from './store/projects';

const store = configureStore();

store.dispatch({
	type: 'apiCallBegan',
	payload: {
		url: '/bugs',
		onSuccess: 'bugsReceived',
		onError: 'apiRequestFailed',
	},
});
