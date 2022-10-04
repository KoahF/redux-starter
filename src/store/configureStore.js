import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import reducer from './reducer';
import toast from './middleware/toast';
import api from './middleware/api';

export default function () {
	return configureStore({
		reducer,
		middleware: (getDefaultMiddleware) => [
			...getDefaultMiddleware(),
			// logger({ destination: 'console' }),
			toast,
			api,
		],
	});
}
