"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = exports.UpdateUserSchema = exports.UserParamSchema = exports.IdParamSchema = exports.CreateUserSchema = exports.UserSchema = exports.UserSortColumn = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
/**
 * User-related constants
 */
exports.UserSortColumn = {
    ID: 'id',
    NAME: 'name',
    EMAIL: 'email',
    ROLE: 'role',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
};
/**
 *
 * User schemas
 */
/**
 * Schema for a complete user object.
 * This schema defines all the fields that a user can have in the system.
 * It uses Zod for runtime type checking and validation.
 */
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().min(1, { message: 'ID must not be empty' }),
    name: zod_1.z.string().min(1, { message: 'Name must not be empty' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    role: zod_1.z.nativeEnum(enums_1.UserRole, { message: 'Invalid role' }),
    isActive: zod_1.z.boolean().default(true),
    password: zod_1.z.string(),
    createdAt: zod_1.z.date().default(() => new Date()),
    updatedAt: zod_1.z.date().default(() => new Date()),
    lastLogin: zod_1.z.date().optional().nullable(),
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
exports.CreateUserSchema = exports.UserSchema.pick({
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
exports.IdParamSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: 'ID must not be empty' }),
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
exports.UserParamSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number().optional(),
    email: zod_1.z.email().optional(),
    name: zod_1.z.string().min(3).optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).default(10),
    sortBy: zod_1.z.enum(exports.UserSortColumn).default(exports.UserSortColumn.NAME),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('asc'),
    role: zod_1.z.preprocess((value) => (typeof value === 'string' ? value.toUpperCase() : value), zod_1.z.enum(enums_1.UserRole).optional()),
    isActive: zod_1.z.preprocess((val) => {
        if (val === 'true' || val === true)
            return true;
        if (val === 'false' || val === false)
            return false;
        return undefined;
    }, zod_1.z.boolean().optional()),
    createdAfter: zod_1.z
        .string()
        .refine((value) => !value || !isNaN(Date.parse(value)), {
        message: 'createdAfter must be a valid date string',
    })
        .transform((val) => val ? new Date(val) : undefined).optional(),
    createdBefore: zod_1.z
        .string()
        .refine((value) => !value || !isNaN(Date.parse(value)), {
        message: 'createdBefore must be a valid date string',
    })
        .transform((val) => val ? new Date(val) : undefined).optional(),
});
/**
 * Schema for updating user information.
 * All fields are optional, but at least one must be provided.
 *
 * @property {string} [name] - The user's new name (optional, minimum 1 character).
 * @property {string} [email] - The user's new email address (optional).
 * @property {Role} [role] - The user's new role (optional).
 * @property {boolean} [isActive] - The user's new active status (optional).
 */
exports.UpdateUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, { message: 'Name must not be empty' }).optional(),
    email: zod_1.z.email({ message: 'Invalid email address' }).optional(),
    role: zod_1.z.enum(enums_1.UserRole, { message: 'Invalid role' }).optional(),
    isActive: zod_1.z.boolean().optional(),
    lastLogin: zod_1.z.date().optional().nullable(),
})
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
exports.UserLoginSchema = exports.UserSchema.pick({
    email: true,
    password: true,
});
//# sourceMappingURL=user.dto.js.map