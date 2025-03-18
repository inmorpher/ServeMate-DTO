import { z } from 'zod';
import { ReservationStatus } from './enums';
import { searchCriteriaSchema } from './global';
import { Allergies } from './orders.dto';
import { TableBaseTableSchema, TableSchema } from './tables.dto';

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
 * - `allergies`: A union of an array of strings (transformed to uppercase) or a comma-separated string (transformed to an array of uppercase strings), validated against the `Allergies` enum.
 * - `tables`: A union of an array of table IDs or a comma-separated string of table IDs, defaulting to an empty array.
 * - `comments`: An optional nullable string for additional comments.
 * - `createdAt`: A date representing when the reservation was created, defaulting to the current date.
 * - `updatedAt`: A date representing when the reservation was last updated.
 * - `isActive`: A union of boolean or string (transformed to boolean), defaulting to `true`.
 */
export const ReservationSchema = z.object({
	id: z.coerce.number().int().positive(),
	guestsCount: z.coerce.number().int().positive(),
	time: z.union([z.string().transform((time) => new Date(time)), z.date()]),
	name: z.string(),
	email: z.string().email().nullable().optional(),
	phone: z.string(),
	status: z
		.string()
		.transform((status) => status?.toUpperCase())
		.pipe(z.nativeEnum(ReservationStatus))
		.default(ReservationStatus.PENDING),
	allergies: z
		.union([
			z
				.array(z.string())
				.transform((allergies) => allergies.map((allergy) => allergy.toUpperCase())),
			z.string().transform((str) => {
				if (!str) return [];
				return str
					.split(',')
					.map((item) => item.trim().toUpperCase())
					.filter(Boolean);
			}),
		])
		.pipe(z.array(z.nativeEnum(Allergies))),
	tables: z
		.union([
			z.array(TableBaseTableSchema.pick({ id: true })),
			z.string().transform((tables) => {
				if (!tables) return [];
				return tables.split(',').map((table) => Number(table.trim()));
			}),
		])
		.pipe(z.array(TableBaseTableSchema.shape.id).default([])),
	comments: z.string().nullable().optional(),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date(),
	isActive: z
		.union([
			z.boolean(),
			z.string().transform((isActive) => {
				if (isActive === 'true') return true;
				if (isActive === 'false') return false;
				return undefined;
			}),
		])
		.default(true),
});

/**
 * Type representing a reservation data transfer object (DTO).
 */
export type ReservationDTO = z.infer<typeof ReservationSchema>;

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
export const ReservationSearchCriteria = searchCriteriaSchema.extend({
	...ReservationSchema.pick({
		name: true,
		email: true,
		phone: true,
		status: true,
		guestsCount: true,
		time: true,
		allergies: true,
		tables: true,
		isActive: true,
	}).partial().shape,
	sortBy: z.string().default('time'),
	guestsCountMin: z.coerce.number().int().positive().optional(),
	guestsCountMax: z.coerce.number().int().positive().optional(),
	timeStart: z.union([z.string().transform((time) => new Date(time)), z.date()]).optional(),
	timeEnd: z.union([z.string().transform((time) => new Date(time)), z.date()]).optional(),
});

/**
 * Type representing the search criteria for reservations.
 */
export type ReservationSearchCriteriaDTO = z.infer<typeof ReservationSearchCriteria>;

/**
 * Schema for creating a reservation, omitting the following fields:
 * - `id`: The unique identifier for the reservation.
 * - `updatedAt`: The timestamp when the reservation was last updated.
 * - `createdAt`: The timestamp when the reservation was created.
 * - `isActive`: The status indicating whether the reservation is active.
 */
export const CreateReservationSchema = ReservationSchema.omit({
	id: true,
	updatedAt: true,
	createdAt: true,
	isActive: true,
});

/**
 * Type representing the data transfer object (DTO) for creating a reservation.
 */
export type CreateReservationDTO = z.infer<typeof CreateReservationSchema>;

/**
 * Extends the ReservationSchema to include an array of tables.
 * Each table in the array contains only the `id` and `tableNumber` properties.
 *
 * @constant
 * @type {ZodSchema}
 */
export const ReservationWithTablesSchema = ReservationSchema.extend({
	tables: TableSchema.pick({ id: true, tableNumber: true }).array(),
});

/**
 * Type representing a reservation with detailed table information.
 */
export type ReservationWithTablesDTO = z.infer<typeof ReservationWithTablesSchema>;

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
export const ReservationConflict = z.object({
	reservationId: ReservationSchema.shape.id,
	time: ReservationSchema.shape.time,
	tables: TableBaseTableSchema.pick({ id: true, tableNumber: true }).array(),
});

export type ReservationConflictDTO = z.infer<typeof ReservationConflict>;

export const ReservationDetailedSchema = z.object({
	reservation: ReservationWithTablesSchema,
	conflict: ReservationConflict.array(),
});

/**
 * Type representing detailed reservation information, including conflicts.
 */
export type ReservationDetailedDTO = z.infer<typeof ReservationDetailedSchema>;

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
export const UpdateReservationSchema = ReservationSchema.omit({
	createdAt: true,
	updatedAt: true,
	id: true,
})
	.partial()
	.refine(
		(data) => {
			return Object.keys(data).length > 0;
		},
		{
			message: 'At least one field must be provided to update a reservation.',
		}
	);

/**
 * Type representing the data transfer object (DTO) for updating a reservation.
 * This type is inferred from the `UpdateReservationSchema` using Zod.
 */
export type UpdateReservationDTO = z.infer<typeof UpdateReservationSchema>;

/**
 * Type representing the ID of a reservation.
 *
 * This type is inferred from the `id` shape of the `ReservationSchema`.
 */
export type ReservationId = z.infer<typeof ReservationSchema.shape.id>;

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
 * - `allergies`: Any allergies the guest may have.
 * - `guestsCount`: The number of guests.
 *
 * Validation:
 * - At least one field must be provided to update a reservation.
 *
 * @constant {object} ReservationGuestInfoSchema
 */
export const ReservationGuestInfoSchema = ReservationSchema.pick({
	email: true,
	name: true,
	phone: true,
	allergies: true,
	guestsCount: true,
})
	.partial()
	.refine(
		(data) => {
			return Object.keys(data).length > 0;
		},
		{
			message: 'At least one field must be provided to update a reservation.',
		}
	);

/**
 * Type representing the guest information for a reservation.
 *
 * This type is inferred from the `ReservationGuestInfoSchema` using Zod's `infer` method.
 *
 * @see ReservationGuestInfoSchema
 */
export type ReservationGuestInfo = z.infer<typeof ReservationGuestInfoSchema>;
