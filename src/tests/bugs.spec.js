import { addBug } from '../store/bugs';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureStore from '../store/configureStore';

describe('bugsSlice', () => {
	it('should handle the addBug action', async () => {
		const store = configureStore();
		const bug = { description: 'a' };
		const savedBug = { ...bug, id: 1 };

		const fakeAxios = new MockAdapter(axios);
		fakeAxios.onPost('/bugs').reply(200, savedBug);
	
		await store.dispatch(addBug(bug));
		expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
	});
});
