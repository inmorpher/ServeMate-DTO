"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationGuestInfoSchema = exports.UpdateReservationSchema = exports.ReservationDetailedSchema = exports.ReservationConflict = exports.ReservationWithTablesSchema = exports.CreateReservationSchema = exports.ReservationSearchCriteria = exports.ReservationSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
const global_1 = require("./global");
const tables_dto_1 = require("./tables.dto");
/**
 * Schema for validating reservation data using Zod.
 *
 * Properties:
 * - `id`: A positive integer representing the reservation ID.
 * - `guestsCount`: A positive integer representing the number of guests.
 * - `time`: A union of string (transformed to Date) or Date representing the reservation time.
 * - `name`: A string representing the name of the person making the reservation.
 * - `email`: An optional nullable string representing the email of the person making the reservation.
 * - `phone`: A string representing the phone number of the person making the reservation.
 * - `status`: A string transformed to uppercase and validated against the `ReservationStatus` enum, defaulting to `PENDING`.
 * - `tables`: A union of an array of table IDs or a comma-separated string of table IDs, defaulting to an empty array.
 * - `allergies`: An array of allergies, defaulting to an empty array.
 * - `comments`: An optional nullable string for additional comments.
 * - `createdAt`: A date representing when the reservation was created, defaulting to the current date.
 * - `updatedAt`: A date representing when the reservation was last updated.
 * - `isActive`: A union of boolean or string (transformed to boolean), defaulting to `true`.
 */
exports.ReservationSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
    guestsCount: zod_1.z.coerce.number().int().positive(),
    time: zod_1.z.union([zod_1.z.string().transform((time) => new Date(time)), zod_1.z.date()]),
    name: zod_1.z.string(),
    email: zod_1.z.email().nullish(),
    phone: zod_1.z.string(),
    status: zod_1.z
        .string()
        .transform((status) => status === null || status === void 0 ? void 0 : status.toUpperCase())
        .pipe(zod_1.z.enum(enums_1.ReservationStatus))
        .default(enums_1.ReservationStatus.PENDING),
    tables: zod_1.z
        .preprocess((tables) => {
        if (Array.isArray(tables)) {
            return tables.map((table) => typeof table === 'object' && table !== null && 'id' in table
                ? table.id
                : table);
        }
        if (typeof tables === 'string') {
            if (!tables)
                return [];
            return tables.split(',').map((table) => Number(table.trim()));
        }
        return tables;
    }, zod_1.z.array(zod_1.z.coerce.number().int().positive()).default([])),
    comments: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.date().default(() => new Date()),
    updatedAt: zod_1.z.date(),
    isActive: zod_1.z
        .union([
        zod_1.z.boolean(),
        zod_1.z.string().transform((isActive) => {
            if (isActive === 'true')
                return true;
            if (isActive === 'false')
                return false;
            return undefined;
        }),
    ])
        .default(true),
});
/**
 * @constant
 * @name ReservationSearchCriteria
 * @description
 * This schema defines the search criteria for reservations. It extends the base `searchCriteriaSchema`
 * and includes a partial selection of fields from `ReservationSchema` with additional search-specific fields.
 *
 * @property {string} sortBy - The field by which to sort the results. Defaults to 'time'.
 * @property {number} [guestsCountMin] - The minimum number of guests. Must be a positive integer.
 * @property {number} [guestsCountMax] - The maximum number of guests. Must be a positive integer.
 * @property {Date | string} [timeStart] - The start time for the reservation search. Can be a string that will be transformed into a Date object.
 * @property {Date | string} [timeEnd] - The end time for the reservation search. Can be a string that will be transformed into a Date object.
 *
 * @extends searchCriteriaSchema
 * @see ReservationSchema
 */
exports.ReservationSearchCriteria = global_1.searchCriteriaSchema.extend({
    ...exports.ReservationSchema.pick({
        name: true,
        email: true,
        phone: true,
        status: true,
        guestsCount: true,
        time: true,
        tables: true,
        isActive: true,
    }).partial().shape,
    sortBy: zod_1.z.string().default('time'),
    guestsCountMin: zod_1.z.coerce.number().int().positive().optional(),
    guestsCountMax: zod_1.z.coerce.number().int().positive().optional(),
    timeStart: zod_1.z.union([zod_1.z.string().transform((time) => new Date(time)), zod_1.z.date()]).optional(),
    timeEnd: zod_1.z.union([zod_1.z.string().transform((time) => new Date(time)), zod_1.z.date()]).optional(),
});
/**
 * Schema for creating a reservation, omitting the following fields:
 * - `id`: The unique identifier for the reservation.
 * - `updatedAt`: The timestamp when the reservation was last updated.
 * - `createdAt`: The timestamp when the reservation was created.
 * - `isActive`: The status indicating whether the reservation is active.
 */
exports.CreateReservationSchema = exports.ReservationSchema.omit({
    id: true,
    updatedAt: true,
    createdAt: true,
    isActive: true,
});
/**
 * Extends the ReservationSchema to include an array of tables.
 * Each table in the array contains only the `id` and `tableNumber` properties.
 *
 * @constant
 * @type {ZodSchema}
 */
exports.ReservationWithTablesSchema = exports.ReservationSchema.extend({
    tables: tables_dto_1.TableSchema.pick({ id: true, tableNumber: true }).array(),
});
/**
 * Represents a conflict in a reservation.
 *
 * @constant
 * @type {z.ZodObject}
 *
 * @property {string} reservationId - The unique identifier of the reservation.
 * @property {string} time - The time of the reservation.
 * @property {Array<{ id: string, tableNumber: number }>} tables - An array of tables involved in the reservation conflict, each containing an id and table number.
 */
exports.ReservationConflict = zod_1.z.object({
    reservationId: exports.ReservationSchema.shape.id,
    time: exports.ReservationSchema.shape.time,
    tables: tables_dto_1.TableBaseTableSchema.pick({ id: true, tableNumber: true }).array(),
});
exports.ReservationDetailedSchema = zod_1.z.object({
    reservation: exports.ReservationWithTablesSchema,
    conflict: exports.ReservationConflict.array(),
});
/**
 * Schema for updating a reservation.
 *
 * This schema is derived from `ReservationSchema` by omitting the fields
 * `createdAt`, `updatedAt`, and `id`. The resulting schema is then made
 * partially optional, meaning that any of the remaining fields can be
 * provided, but none are required.
 *
 * Additionally, a refinement is added to ensure that at least one field
 * is provided when updating a reservation. If no fields are provided,
 * an error message "At least one field must be provided to update a reservation."
 * will be returned.
 */
exports.UpdateReservationSchema = exports.ReservationSchema.omit({
    createdAt: true,
    updatedAt: true,
    id: true,
})
    .partial()
    .refine((data) => {
    return Object.keys(data).length > 0;
}, {
    message: 'At least one field must be provided to update a reservation.',
});
/**
 * Schema for validating partial updates to reservation guest information.
 *
 * This schema allows partial updates by making all fields optional and
 * ensures that at least one field is provided when updating a reservation.
 *
 * Fields:
 * - `email`: The email address of the guest.
 * - `name`: The name of the guest.
 * - `phone`: The phone number of the guest.
 * - `guestsCount`: The number of guests.
 *
 * Validation:
 * - At least one field must be provided to update a reservation.
 *
 * @constant {object} ReservationGuestInfoSchema
 */
exports.ReservationGuestInfoSchema = exports.ReservationSchema.pick({
    email: true,
    name: true,
    phone: true,
    guestsCount: true,
})
    .partial()
    .refine((data) => {
    return Object.keys(data).length > 0;
}, {
    message: 'At least one field must be provided to update a reservation.',
});
//# sourceMappingURL=reservation.dto.js.map