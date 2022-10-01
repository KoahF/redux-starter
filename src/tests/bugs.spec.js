import { addBug } from '../store/bugs';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureStore from '../store/configureStore';

describe('bugsSlice', () => {
	let store;
	let fakeAxios;

	beforeEach(() => {
		store = configureStore();
		fakeAxios = new MockAdapter(axios);
	});

	const bugsSlice = () => store.getState().entities.bugs;

	it("should add a bug to the store if it's saved to the server", async () => {
		const bug = { description: 'a' };
		const savedBug = { ...bug, id: 1 };
		fakeAxios.onPost('/bugs').reply(200, savedBug);

		await store.dispatch(addBug(bug));

		expect(bugsSlice().list).toContainEqual(savedBug);
	});

	it("should not add a bug to the store if it's not saved to the server", async () => {
		const bug = { description: 'a' };
		const savedBug = { ...bug, id: 1 };
		fakeAxios.onPost('/bugs').reply(500, savedBug);

		await store.dispatch(addBug(bug));

		expect(bugsSlice().list).toHaveLength(0);
	});
});
