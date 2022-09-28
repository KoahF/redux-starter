import configureStore from './store/configureStore';
import { bugAdded, bugResolved, getUnresolvedBugs } from './store/bugs';
import { projectAdded } from './store/projects';
import * as actions from './store/api';
const store = configureStore();

store.dispatch(
	actions.apiCallBegan({
		url: '/bugs',
		onSuccess: 'bugsReceived',
	})
);
