import bugs, { addBug, getUnresolvedBugs, resolveBug } from '../store/bugs';
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

	const createState = () => ({
		entities: {
			bugs: {
				list: [],
			},
		},
	});
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

	it("should resolved a bug in the store if it's resolved to the server", async () => {
		const resolvedBug = { id: 2, resolved: true };
		fakeAxios.onPost("/bugs").reply(200, { id: 2, resolved: false})
		fakeAxios.onPatch(`bugs/2`).reply(200, resolvedBug);

		await store.dispatch(addBug({}))
		await store.dispatch(resolveBug(2));

		expect(bugsSlice().list[0].resolved).toBe(true);
	});

	it("should not resolved a bug in the store if it's not resolved to the server", async () => {
		const resolvedBug = { id: 2, resolved: true };
		fakeAxios.onPost("/bugs").reply(200, { id: 2, resolved: false})
		fakeAxios.onPatch(`bugs/2`).reply(500, resolvedBug);

		await store.dispatch(addBug({}))
		await store.dispatch(resolveBug(2));

		expect(bugsSlice().list[0].resolved).not.toBe(true);
	});

	describe('selectors', () => {
		it('getUnresolvedBugs', () => {
			const state = createState();
			state.entities.bugs.list = [
				{ id: 1, resolved: true },
				{ id: 2 },
				{ id: 3 },
			];

			const results = getUnresolvedBugs(state);

			expect(results).toHaveLength(2);
		});
	});
});
