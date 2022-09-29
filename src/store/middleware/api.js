import axios from 'axios';
import * as actions from '../api';
const api =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== actions.apiCallBegan.type) return next(action);

		const { url, method, data, onSuccess, onStart, onError } = action.payload;

		if (onStart) dispatch({ type: onStart });

		next(action);

		try {
			const response = await axios.request({
				baseURL: 'http://localhost:9001/api',
				url,
				method,
				data,
			});
			// General
			dispatch(actions.apiCallSuccess(response.data));
			// Specific
			if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
		} catch (e) {
			// General
			dispatch(actions.apiCallFailed(e.message));
			// Specific
			if (onError) dispatch({ type: onError, payload: e.message });
		}
	};

export default api;
