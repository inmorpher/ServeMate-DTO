"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("../src/dto/global");
describe('Global Utils', () => {
    describe('parseQueryArray', () => {
        it('should handle undefined input', () => {
            expect((0, global_1.parseQueryArray)(undefined)).toEqual([]);
        });
        it('should handle empty string', () => {
            expect((0, global_1.parseQueryArray)('')).toEqual([]);
        });
        it('should parse comma-separated string', () => {
            expect((0, global_1.parseQueryArray)('a,b,c')).toEqual(['a', 'b', 'c']);
        });
        it('should handle array input', () => {
            expect((0, global_1.parseQueryArray)(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
        });
        it('should filter out empty values', () => {
            expect((0, global_1.parseQueryArray)('a,,b,c,')).toEqual(['a', 'b', 'c']);
        });
    });
    describe('arrayQueryParamSchema', () => {
        it('should transform string to array', () => {
            const result = global_1.arrayQueryParamSchema.parse('a,b,c');
            expect(result).toEqual(['a', 'b', 'c']);
        });
        it('should accept array input', () => {
            const result = global_1.arrayQueryParamSchema.parse(['a', 'b', 'c']);
            expect(result).toEqual(['a', 'b', 'c']);
        });
        it('should handle empty string', () => {
            const result = global_1.arrayQueryParamSchema.parse('');
            expect(result).toEqual([]);
        });
    });
});
