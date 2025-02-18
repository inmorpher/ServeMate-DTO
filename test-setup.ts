import { ZodError } from 'zod';

export function expectValidationError(fn: () => any): void {
	expect(fn).toThrow(ZodError);
}

export function expectNoValidationError(fn: () => any): void {
	expect(fn).not.toThrow();
}
