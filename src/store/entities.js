import { combineReducers } from '@reduxjs/toolkit';
import bugsReducer from './bugs';
import projectsReducer from './projects';
import membersReducer from './members';

export default combineReducers({
	bugs: bugsReducer,
	projects: projectsReducer,
	members: membersReducer,
});
