"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../src/dto/enums");
const user_dto_1 = require("../src/dto/user.dto");
const test_setup_1 = require("../test-setup");
describe('User DTOs', () => {
    describe('UserSchema', () => {
        it('should validate a valid user', () => {
            const validUser = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                role: enums_1.UserRole.USER,
                isActive: true,
                password: 'password123',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                user_dto_1.UserSchema.parse(validUser);
            });
        });
        it('should reject invalid email', () => {
            const invalidEmail = {
                id: 1,
                name: 'Test User',
                email: 'invalid-email',
                role: enums_1.UserRole.USER,
                isActive: true,
                password: 'password123',
            };
            (0, test_setup_1.expectValidationError)(() => {
                user_dto_1.UserSchema.parse(invalidEmail);
            });
        });
        it('should reject invalid role', () => {
            const invalidRole = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                role: 'INVALID_ROLE',
                isActive: true,
                password: 'password123',
            };
            (0, test_setup_1.expectValidationError)(() => {
                user_dto_1.UserSchema.parse(invalidRole);
            });
        });
        it('should handle date fields correctly', () => {
            const userWithDates = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                role: enums_1.UserRole.USER,
                isActive: true,
                password: 'password123',
                createdAt: new Date(),
                updatedAt: new Date(),
                lastLogin: new Date(),
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                const parsed = user_dto_1.UserSchema.parse(userWithDates);
                expect(parsed.createdAt).toBeInstanceOf(Date);
                expect(parsed.updatedAt).toBeInstanceOf(Date);
                expect(parsed.lastLogin).toBeInstanceOf(Date);
            });
        });
        it('should allow null for lastLogin', () => {
            const userWithNullLogin = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                role: enums_1.UserRole.USER,
                isActive: true,
                password: 'password123',
                lastLogin: null,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                const parsed = user_dto_1.UserSchema.parse(userWithNullLogin);
                expect(parsed.lastLogin).toBeNull();
            });
        });
    });
    describe('CreateUserSchema', () => {
        it('should validate valid user creation data', () => {
            const validCreate = {
                name: 'New User',
                email: 'new@example.com',
                role: enums_1.UserRole.HOST,
                password: 'securepass123',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                user_dto_1.CreateUserSchema.parse(validCreate);
            });
        });
        it('should reject empty name', () => {
            const emptyName = {
                name: '',
                email: 'new@example.com',
                role: enums_1.UserRole.HOST,
                password: 'securepass123',
            };
            (0, test_setup_1.expectValidationError)(() => {
                user_dto_1.CreateUserSchema.parse(emptyName);
            });
        });
        it('should require all mandatory fields', () => {
            const missingFields = {
                name: 'New User',
                email: 'new@example.com',
                // missing role and password
            };
            (0, test_setup_1.expectValidationError)(() => {
                user_dto_1.CreateUserSchema.parse(missingFields);
            });
        });
    });
    describe('UpdateUserSchema', () => {
        it('should validate partial user updates', () => {
            const validUpdate = {
                name: 'Updated Name',
                isActive: false,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                user_dto_1.UpdateUserSchema.parse(validUpdate);
            });
        });
        it('should reject empty update object', () => {
            const emptyUpdate = {};
            (0, test_setup_1.expectValidationError)(() => {
                user_dto_1.UpdateUserSchema.parse(emptyUpdate);
            });
        });
    });
    describe('UserSearchCriteriaSchema', () => {
        it('should validate valid search criteria', () => {
            const validSearch = {
                id: 1,
                name: 'John',
                role: enums_1.UserRole.MANAGER,
                isActive: 'true',
                sortBy: user_dto_1.UserSortColumn.NAME,
                sortOrder: 'desc',
                page: '1',
                pageSize: '10',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                user_dto_1.UserParamSchema.parse(validSearch);
            });
        });
        it('should handle date filters correctly', () => {
            const dateFilters = {
                id: 1,
                createdAfter: '2024-01-01',
                createdBefore: '2024-12-31',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                user_dto_1.UserParamSchema.parse(dateFilters);
            });
        });
        it('should reject invalid date formats', () => {
            const invalidDates = {
                id: 1,
                createdAfter: 'not-a-date',
                createdBefore: '2024-13-45', // invalid date
            };
            (0, test_setup_1.expectValidationError)(() => {
                user_dto_1.UserParamSchema.parse(invalidDates);
            });
        });
        it('should transform boolean string values', () => {
            const booleanStrings = {
                id: 1,
                isActive: 'true',
            };
            const parsed = user_dto_1.UserParamSchema.parse(booleanStrings);
            expect(parsed.isActive).toBe(true);
        });
        it('should properly transform and validate role', () => {
            const searchWithRole = {
                id: 1,
                role: 'admin', // lowercase input
            };
            const parsed = user_dto_1.UserParamSchema.parse(searchWithRole);
            expect(parsed.role).toBe(enums_1.UserRole.ADMIN);
        });
        it('should reject invalid role values', () => {
            const invalidRole = {
                id: 1,
                role: 'INVALID_ROLE',
            };
            (0, test_setup_1.expectValidationError)(() => {
                user_dto_1.UserParamSchema.parse(invalidRole);
            });
        });
    });
});
