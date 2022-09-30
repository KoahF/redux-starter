import configureStore from './store/configureStore';
import { loadBugs, addBug, resolveBug, assignBugToMember } from './store/bugs';

const store = configureStore();

store.dispatch(loadBugs());


setTimeout(() => store.dispatch(assignBugToMember(2, 3)), 1000);
