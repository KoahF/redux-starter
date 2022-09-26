import configureStore from './store/configureStore';
import { bugAdded, bugResolved, getUnresolvedBugs } from './store/bugs';
import { projectAdded } from './store/projects';
const store = configureStore();

store.dispatch(projectAdded({ name: 'Project 1' }));
store.dispatch(bugAdded({ description: 'Bug 1' }));
store.dispatch(bugAdded({ description: 'Bug 2' }));
store.dispatch(bugAdded({ description: 'Bug 3' }));
console.log(store.getState());

store.dispatch(bugResolved({ id: 1 }));
console.log('Unresolved bug', getUnresolvedBugs(store.getState));
