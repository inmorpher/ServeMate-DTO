"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectValidationError = expectValidationError;
exports.expectNoValidationError = expectNoValidationError;
const zod_1 = require("zod");
function expectValidationError(fn) {
    expect(fn).toThrow(zod_1.ZodError);
}
function expectNoValidationError(fn) {
    expect(fn).not.toThrow();
}
