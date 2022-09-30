import { isEven } from './src/math';

describe('isEven', () => {
	it('should return true if number is even', () => {
		const result = isEven(2);
		expect(result).toEqual(true);
	});

	it('should return false if number is odd', () => {
		const result = isEven(3);
		expect(result).toEqual(false);
	});
});
