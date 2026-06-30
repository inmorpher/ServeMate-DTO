import { z } from 'zod';
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
export declare const ReservationSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    guestsCount: z.ZodCoercedNumber<unknown>;
    time: z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>;
    name: z.ZodString;
    email: z.ZodOptional<z.ZodNullable<z.ZodEmail>>;
    phone: z.ZodString;
    status: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly PENDING: "PENDING";
        readonly CONFIRMED: "CONFIRMED";
        readonly CANCELLED: "CANCELLED";
        readonly COMPLETED: "COMPLETED";
        readonly NO_SHOW: "NO_SHOW";
    }>>>;
    tables: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodCoercedNumber<unknown>>>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDate;
    isActive: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodString, z.ZodTransform<boolean | undefined, string>>]>>;
}, z.core.$strip>;
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
export declare const ReservationSearchCriteria: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        readonly ASC: "asc";
        readonly DESC: "desc";
    }>>>;
    sortBy: z.ZodDefault<z.ZodString>;
    guestsCountMin: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    guestsCountMax: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    timeStart: z.ZodOptional<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>>;
    timeEnd: z.ZodOptional<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>>;
    name: z.ZodOptional<z.ZodString>;
    guestsCount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly PENDING: "PENDING";
        readonly CONFIRMED: "CONFIRMED";
        readonly CANCELLED: "CANCELLED";
        readonly COMPLETED: "COMPLETED";
        readonly NO_SHOW: "NO_SHOW";
    }>>>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEmail>>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodString, z.ZodTransform<boolean | undefined, string>>]>>>;
    time: z.ZodOptional<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>>;
    phone: z.ZodOptional<z.ZodString>;
    tables: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodCoercedNumber<unknown>>>>>;
}, z.core.$strip>;
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
export declare const CreateReservationSchema: z.ZodObject<{
    name: z.ZodString;
    guestsCount: z.ZodCoercedNumber<unknown>;
    status: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly PENDING: "PENDING";
        readonly CONFIRMED: "CONFIRMED";
        readonly CANCELLED: "CANCELLED";
        readonly COMPLETED: "COMPLETED";
        readonly NO_SHOW: "NO_SHOW";
    }>>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodEmail>>;
    time: z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>;
    phone: z.ZodString;
    tables: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodCoercedNumber<unknown>>>>;
}, z.core.$strip>;
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
export declare const ReservationWithTablesSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    guestsCount: z.ZodCoercedNumber<unknown>;
    time: z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>;
    name: z.ZodString;
    email: z.ZodOptional<z.ZodNullable<z.ZodEmail>>;
    phone: z.ZodString;
    status: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly PENDING: "PENDING";
        readonly CONFIRMED: "CONFIRMED";
        readonly CANCELLED: "CANCELLED";
        readonly COMPLETED: "COMPLETED";
        readonly NO_SHOW: "NO_SHOW";
    }>>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDate;
    isActive: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodString, z.ZodTransform<boolean | undefined, string>>]>>;
    tables: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        tableNumber: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
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
export declare const ReservationConflict: z.ZodObject<{
    reservationId: z.ZodCoercedNumber<unknown>;
    time: z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>;
    tables: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        tableNumber: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ReservationConflictDTO = z.infer<typeof ReservationConflict>;
export declare const ReservationDetailedSchema: z.ZodObject<{
    reservation: z.ZodObject<{
        id: z.ZodCoercedNumber<unknown>;
        guestsCount: z.ZodCoercedNumber<unknown>;
        time: z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>;
        name: z.ZodString;
        email: z.ZodOptional<z.ZodNullable<z.ZodEmail>>;
        phone: z.ZodString;
        status: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
            readonly PENDING: "PENDING";
            readonly CONFIRMED: "CONFIRMED";
            readonly CANCELLED: "CANCELLED";
            readonly COMPLETED: "COMPLETED";
            readonly NO_SHOW: "NO_SHOW";
        }>>>;
        comments: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodDefault<z.ZodDate>;
        updatedAt: z.ZodDate;
        isActive: z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodString, z.ZodTransform<boolean | undefined, string>>]>>;
        tables: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            tableNumber: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    conflict: z.ZodArray<z.ZodObject<{
        reservationId: z.ZodCoercedNumber<unknown>;
        time: z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>;
        tables: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            tableNumber: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
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
export declare const UpdateReservationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    guestsCount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly PENDING: "PENDING";
        readonly CONFIRMED: "CONFIRMED";
        readonly CANCELLED: "CANCELLED";
        readonly COMPLETED: "COMPLETED";
        readonly NO_SHOW: "NO_SHOW";
    }>>>>;
    comments: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEmail>>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodUnion<readonly [z.ZodBoolean, z.ZodPipe<z.ZodString, z.ZodTransform<boolean | undefined, string>>]>>>;
    time: z.ZodOptional<z.ZodUnion<readonly [z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>, z.ZodDate]>>;
    phone: z.ZodOptional<z.ZodString>;
    tables: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodCoercedNumber<unknown>>>>>;
}, z.core.$strip>;
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
 * - `guestsCount`: The number of guests.
 *
 * Validation:
 * - At least one field must be provided to update a reservation.
 *
 * @constant {object} ReservationGuestInfoSchema
 */
export declare const ReservationGuestInfoSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    guestsCount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEmail>>>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Type representing the guest information for a reservation.
 *
 * This type is inferred from the `ReservationGuestInfoSchema` using Zod's `infer` method.
 *
 * @see ReservationGuestInfoSchema
 */
export type ReservationGuestInfo = z.infer<typeof ReservationGuestInfoSchema>;
//# sourceMappingURL=reservation.dto.d.ts.map