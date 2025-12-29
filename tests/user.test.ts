import { UserRole } from '../src/dto/enums';
import {
	CreateUserSchema,
	UpdateUserSchema,
	UserParamSchema,
	UserSchema,
	UserSortColumn,
} from '../src/dto/user.dto';
import { expectNoValidationError, expectValidationError } from '../test-setup';

describe('User DTOs', () => {
	describe('UserSchema', () => {
		it('should validate a valid user', () => {
			const validUser = {
				id: 1,
				name: 'Test User',
				email: 'test@example.com',
				role: UserRole.USER,
				isActive: true,
				password: 'password123',
			};

			expectNoValidationError(() => {
				UserSchema.parse(validUser);
			});
		});

		it('should reject invalid email', () => {
			const invalidEmail = {
				id: 1,
				name: 'Test User',
				email: 'invalid-email',
				role: UserRole.USER,
				isActive: true,
				password: 'password123',
			};

			expectValidationError(() => {
				UserSchema.parse(invalidEmail);
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

			expectValidationError(() => {
				UserSchema.parse(invalidRole);
			});
		});

		it('should handle date fields correctly', () => {
			const userWithDates = {
				id: 1,
				name: 'Test User',
				email: 'test@example.com',
				role: UserRole.USER,
				isActive: true,
				password: 'password123',
				createdAt: new Date(),
				updatedAt: new Date(),
				lastLogin: new Date(),
			};

			expectNoValidationError(() => {
				const parsed = UserSchema.parse(userWithDates);
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
				role: UserRole.USER,
				isActive: true,
				password: 'password123',
				lastLogin: null,
			};

			expectNoValidationError(() => {
				const parsed = UserSchema.parse(userWithNullLogin);
				expect(parsed.lastLogin).toBeNull();
			});
		});
	});

	describe('CreateUserSchema', () => {
		it('should validate valid user creation data', () => {
			const validCreate = {
				name: 'New User',
				email: 'new@example.com',
				role: UserRole.HOST,
				password: 'securepass123',
			};

			expectNoValidationError(() => {
				CreateUserSchema.parse(validCreate);
			});
		});

		it('should reject empty name', () => {
			const emptyName = {
				name: '',
				email: 'new@example.com',
				role: UserRole.HOST,
				password: 'securepass123',
			};

			expectValidationError(() => {
				CreateUserSchema.parse(emptyName);
			});
		});

		it('should require all mandatory fields', () => {
			const missingFields = {
				name: 'New User',
				email: 'new@example.com',
				// missing role and password
			};

			expectValidationError(() => {
				CreateUserSchema.parse(missingFields);
			});
		});
	});

	describe('UpdateUserSchema', () => {
		it('should validate partial user updates', () => {
			const validUpdate = {
				name: 'Updated Name',
				isActive: false,
			};

			expectNoValidationError(() => {
				UpdateUserSchema.parse(validUpdate);
			});
		});

		it('should reject empty update object', () => {
			const emptyUpdate = {};

			expectValidationError(() => {
				UpdateUserSchema.parse(emptyUpdate);
			});
		});
	});

	describe('UserSearchCriteriaSchema', () => {
		it('should validate valid search criteria', () => {
			const validSearch = {
				id: 1,
				name: 'John',
				role: UserRole.MANAGER,
				isActive: 'true',
				sortBy: UserSortColumn.NAME,
				sortOrder: 'desc',
				page: '1',
				pageSize: '10',
			};

			expectNoValidationError(() => {
				UserParamSchema.parse(validSearch);
			});
		});

		it('should handle date filters correctly', () => {
			const dateFilters = {
				id: 1,
				createdAfter: '2024-01-01',
				createdBefore: '2024-12-31',
			};

			expectNoValidationError(() => {
				UserParamSchema.parse(dateFilters);
			});
		});

		it('should reject invalid date formats', () => {
			const invalidDates = {
				id: 1,
				createdAfter: 'not-a-date',
				createdBefore: '2024-13-45', // invalid date
			};

			expectValidationError(() => {
				UserParamSchema.parse(invalidDates);
			});
		});

		it('should transform boolean string values', () => {
			const booleanStrings = {
				id: 1,
				isActive: 'true',
			};

			const parsed = UserParamSchema.parse(booleanStrings);
			expect(parsed.isActive).toBe(true);
		});

		it('should properly transform and validate role', () => {
			const searchWithRole = {
				id: 1,
				role: 'admin', // lowercase input
			};

			const parsed = UserParamSchema.parse(searchWithRole);
			expect(parsed.role).toBe(UserRole.ADMIN);
		});

		it('should reject invalid role values', () => {
			const invalidRole = {
				id: 1,
				role: 'INVALID_ROLE',
			};

			expectValidationError(() => {
				UserParamSchema.parse(invalidRole);
			});
		});
	});
});
