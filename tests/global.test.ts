import { arrayQueryParamSchema, parseQueryArray } from '../src/dto/global';

describe('Global Utils', () => {
	describe('parseQueryArray', () => {
		it('should handle undefined input', () => {
			expect(parseQueryArray(undefined)).toEqual([]);
		});

		it('should handle empty string', () => {
			expect(parseQueryArray('')).toEqual([]);
		});

		it('should parse comma-separated string', () => {
			expect(parseQueryArray('a,b,c')).toEqual(['a', 'b', 'c']);
		});

		it('should handle array input', () => {
			expect(parseQueryArray(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
		});

		it('should filter out empty values', () => {
			expect(parseQueryArray('a,,b,c,')).toEqual(['a', 'b', 'c']);
		});
	});

	describe('arrayQueryParamSchema', () => {
		it('should transform string to array', () => {
			const result = arrayQueryParamSchema.parse('a,b,c');
			expect(result).toEqual(['a', 'b', 'c']);
		});

		it('should accept array input', () => {
			const result = arrayQueryParamSchema.parse(['a', 'b', 'c']);
			expect(result).toEqual(['a', 'b', 'c']);
		});

		it('should handle empty string', () => {
			const result = arrayQueryParamSchema.parse('');
			expect(result).toEqual([]);
		});
	});
});
