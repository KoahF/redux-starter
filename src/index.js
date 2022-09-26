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
// console.log('Unresolved bug 1', getUnresolvedBugs(store.getState()));

const unresolvedBugs1 = getUnresolvedBugs(store.getState());
const unresolvedBugs2 = getUnresolvedBugs(store.getState());
console.log(
	'Compare unresolved bugs list',
	unresolvedBugs1 === unresolvedBugs2
);
