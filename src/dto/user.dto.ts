import { z } from 'zod';
import { UserRole } from './enums';

/**
 * User-related constants
 */

export const UserSortColumn = {
	ID: 'id',
	NAME: 'name',
	EMAIL: 'email',
	ROLE: 'role',
	CREATED_AT: 'createdAt',
	UPDATED_AT: 'updatedAt',
} as const;

export type UserSortColumn = (typeof UserSortColumn)[keyof typeof UserSortColumn];
/**
 *
 * User schemas
 */

/**
 * Schema for a complete user object.
 * This schema defines all the fields that a user can have in the system.
 * It uses Zod for runtime type checking and validation.
 */
export const UserSchema = z.object({
	id: z.number().min(1, { message: 'ID must not be empty' }),
	name: z.string().min(1, { message: 'Name must not be empty' }),
	email: z.string().email({ message: 'Invalid email address' }),
	role: z.nativeEnum(UserRole, { message: 'Invalid role' }),
	isActive: z.boolean().default(true),
	password: z.string(),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
	lastLogin: z.date().optional().nullable(),
});

/**
 * Schema for creating a new user.
 * This schema picks specific fields from the UserSchema to ensure only necessary data is provided when creating a user.
 *
 * @remarks
 * The schema includes the following fields:
 * - name: The user's name
 * - email: The user's email address
 * - role: The user's role in the system
 * - password: The user's password
 *
 * @returns A Zod schema object that can be used to validate data for creating a new user
 */
export const CreateUserSchema = UserSchema.pick({
	name: true,
	email: true,
	role: true,
	password: true,
});

/**
 * Schema for a single ID parameter.
 * Used when an API endpoint requires only an ID as input.
 *
 * @property {string} id - The unique identifier (non-empty string).
 */
export const IdParamSchema = z.object({
	id: z.string().min(1, { message: 'ID must not be empty' }),
});

/**
 * Schema for user query parameters.
 * This schema defines and validates the structure of query parameters used for searching, filtering, and sorting users.
 *
 * @param {object} params - The object containing user query parameters
 * @param {string} [params.id] - The user's ID (optional, will be transformed to a number)
 * @param {string} [params.email] - The user's email address (optional, must be a valid email)
 * @param {string} [params.name] - The user's name (optional, minimum 3 characters)
 * @param {string} [params.page] - The page number for pagination (optional, will be transformed to a number)
 * @param {string} [params.pageSize] - The number of items per page (optional, will be transformed to a number)
 * @param {UserSortColumn} [params.sortBy] - The column to sort by (optional, must be a valid UserSortColumn)
 * @param {'asc' | 'desc'} [params.sortOrder] - The order to sort in (optional, 'asc' or 'desc')
 * @param {string} [params.role] - The user's role (optional, will be transformed to uppercase and validated against Role enum)
 * @param {boolean} [params.isActive] - The user's active status (optional)
 * @param {string} [params.createdAfter] - The date after which users were created (optional, must be a valid date string)
 * @param {string} [params.createdBefore] - The date before which users were created (optional, must be a valid date string)
 *
 * @returns {z.ZodObject} A Zod schema object that can be used to validate and transform user query parameters
 */
export const UserParamSchema = z
	.object({
		id: z.coerce.number(),
		email: z.string().email().optional(),
		name: z.string().min(3).optional(),
		page: z
			.string()
			.optional()
			.transform((value) => (value ? parseInt(value) : undefined)),
		pageSize: z
			.string()
			.optional()
			.transform((value) => (value ? parseInt(value) : undefined)),
		sortBy: z.nativeEnum(UserSortColumn).optional(),
		sortOrder: z.enum(['asc', 'desc']).optional(),
		role: z
			.string()
			.optional()
			.transform((value) => value?.toUpperCase())
			.pipe(z.nativeEnum(UserRole))
			.optional(),
		isActive: z
			.enum(['true', 'false'])
			.optional()
			.transform((val) => {
				if (val === 'true') return true;
				if (val === 'false') return false;
				return undefined;
			}),
		createdAfter: z
			.string()
			.optional()
			.refine((value) => !value || !isNaN(Date.parse(value)), {
				message: 'createdAfter must be a valid date string',
			}),
		createdBefore: z
			.string()
			.optional()
			.refine((value) => !value || !isNaN(Date.parse(value)), {
				message: 'createdBefore must be a valid date string',
			}),
	})
	.partial();

/**
 * Schema for updating user information.
 * All fields are optional, but at least one must be provided.
 *
 * @property {string} [name] - The user's new name (optional, minimum 1 character).
 * @property {string} [email] - The user's new email address (optional).
 * @property {Role} [role] - The user's new role (optional).
 * @property {boolean} [isActive] - The user's new active status (optional).
 */
export const UpdateUserSchema = UserSchema.pick({
	name: true,
	email: true,
	role: true,
	isActive: true,
	lastLogin: true,
})
	.partial()
	.refine((data) => Object.values(data).some((value) => value !== undefined), {
		message: 'At least one field must be provided in the body',
		path: ['name', 'email', 'role', 'isActive', 'lastLogin'],
	});

/**
 * Schema for user login credentials.
 * Used for authenticating users in the system.
 *
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */
export const UserLoginSchema = UserSchema.pick({
	email: true,
	password: true,
});

/**
 * User types
 */

/**
 * Type definition for a complete user object.
 * This type is inferred from the UserSchema, ensuring type safety when working with user data.
 * @typedef {Object} UserDto
 * @property {number} id - The unique identifier for the user
 * @property {string} name - The user's full name
 * @property {string} email - The user's email address
 * @property {Role} role - The user's role in the system
 * @property {boolean} isActive - Whether the user account is active
 * @property {string} password - The user's hashed password
 * @property {Date} createdAt - The timestamp when the user account was created
 * @property {Date} updatedAt - The timestamp when the user account was last updated
 * @property {Date | null} [lastLogin] - The timestamp of the user's last login (optional)
 */
export type UserDto = z.infer<typeof UserSchema>;

/**
 * Type definition for the data required to create a new user.
 * This type is inferred from the CreateUserSchema, ensuring type safety when creating users.
 *
 * @property {string} name - The user's name (non-empty string)
 * @property {string} email - The user's email address (valid email format)
 * @property {Role} role - The user's role in the system. Must be one of the following:
 *   - ADMIN: Administrator with full system access
 *   - USER: Standard user with basic privileges
 *   - HOST: User with hosting capabilities
 *   - MANAGER: User with management responsibilities
 * @property {string} password - The user's password (will be hashed before storage)
 *
 * @see {@link Role} for the complete list of available roles
 * @see {@link UserSchema} for the full user schema including additional fields
 */
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

/**
 * Type definition for an ID parameter.
 * This type is inferred from the IdParamSchema.
 *
 * @property {string} id - The unique identifier (non-empty string)
 */
export type IdParamDto = z.infer<typeof IdParamSchema>;

/**
 * Represents the shape of query parameters used for user-related operations.
 * This type is inferred from the UserParamSchema, ensuring type safety and consistency
 * with the defined schema for user query parameters.
 *
 *
 * @property {number} [id] - The user's ID (optional)
 * @property {string} [email] - The user's email address (optional)
 * @property {string} [name] - The user's name (optional, minimum 3 characters)
 * @property {number} [page] - The page number for pagination (optional)
 * @property {number} [pageSize] - The number of items per page (optional)
 * @property {UserSortColumn} [sortBy] - The column to sort by (optional)
 * @property {'asc' | 'desc'} [sortOrder] - The order to sort in (optional)
 * @property {Role} [role] - The user's role (optional)
 * @property {boolean} [isActive] - The user's active status (optional)
 * @property {string} [createdAfter] - The date after which users were created (optional)
 * @property {string} [createdBefore] - The date before which users were created (optional)
 * @see {@link UserSortColumn} for the available sort columns
 * @see {@link Role} for the available user roles
 */
export type UserSearchCriteria = z.infer<typeof UserParamSchema>;

/**
 * Type definition for updating user information.
 * This type is inferred from the UpdateUserSchema.
 *
 * @property {string} [name] - The user's new name (optional, minimum 1 character)
 * @property {string} [email] - The user's new email address (optional)
 * @property {Role} [role] - The user's new role (optional)
 * @property {boolean} [isActive] - The user's new active status (optional)
 *
 * @see {@link Role} for the available user roles
 */
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

/**
 * Type definition for user validation credentials.
 * This type is inferred from the UserLoginSchema and used for authenticating users.
 *
 * @property {string} email - The user's email address
 * @property {string} password - The user's password
 */
export type UserCredentials = z.infer<typeof UserLoginSchema>;

/**
 * Type definition for validated user data.
 * This type represents the user data after successful authentication, excluding sensitive information.
 *
 * @property {number} id - The unique identifier for the user
 * @property {string} name - The user's full name
 * @property {string} email - The user's email address
 * @property {Role} role - The user's role in the system
 */
export type ValidatedUserData = Omit<
	UserDto,
	'password' | 'isActive' | 'createdAt' | 'updatedAt' | 'lastLogin'
>;

/**
 * Type definition for a user list item.
 * This type represents a user in a list view, excluding the password for security reasons.
 *
 * @property {number} id - The unique identifier for the user
 * @property {string} name - The user's full name
 * @property {string} email - The user's email address
 * @property {Role} role - The user's role in the system
 * @property {boolean} isActive - Whether the user account is active
 * @property {Date} createdAt - The timestamp when the user account was created
 * @property {Date} updatedAt - The timestamp when the user account was last updated
 * @property {Date | null} [lastLogin] - The timestamp of the user's last login (optional)
 */
export type UserListItem = Omit<UserDto, 'password'>;

/**
 * Represents the result of a user list query.
 * This type encapsulates both the list of users and the total count of users matching the query criteria.
 *
 * @see {@link UserListItem}
 * @property { UserListItem[]} users -  An array of user objects, each containing non-sensitive user information.
 * @property {number} totalCount - The total number of users that match the query criteria, regardless of pagination.
 */
export type UserListResult = {
	users: UserListItem[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
};

/**
 * Represents the filters that can be applied when querying users.
 *
 * @interface IUserFilters
 * @property {Role} [role] - Optional. The role to filter users by.
 * @property {boolean} [isActive] - Optional. Whether to filter for active or inactive users.
 * @property {Date} [createdAfter] - Optional. The date after which users were created.
 * @property {Date} [createdBefore] - Optional. The date before which users were created.
 * @see {@link Role} for the available user roles.
 */
export type IUserFilters = {
	role?: UserRole;
	isActive?: boolean;
	createdAfter?: Date;
	createdBefore?: Date;
};

/**
 * Type definition for creating a new user.
 * This type is inferred from the CreateUserSchema and contains all necessary fields for user creation.
 *
 * @property {string} name - The user's full name
 * @property {string} email - The user's email address
 * @property {Role} role - The user's role in the system
 * @property {string} password - The user's password (will be hashed before storage)
 * @see {@link Role} for the available user roles
 */
export type CreateUser = z.infer<typeof CreateUserSchema>;

/**
 * Type definition for data returned after creating a new user.
 * This type contains only non-sensitive information about the newly created user.
 *
 * @property {string} name - The user's full name
 * @property {string} email - The user's email address
 */
export type CreatedUserData = Pick<UserDto, 'name' | 'email'>;
