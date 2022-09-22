import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

store.dispatch(bugAdded('Bug 1'));
console.log(store.getState());

store.dispatch(bugResolved(1));
console.log('Store resolved bug', store.getState());
