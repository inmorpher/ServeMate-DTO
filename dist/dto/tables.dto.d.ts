import { z } from 'zod';
/**
 * Defines the options for sorting tables in the system.
 *
 */
export declare const TableSortOptionsEnum: {
    readonly ID: "id";
    readonly TABLE_NUMBER: "tableNumber";
    readonly CAPACITY: "capacity";
    readonly STATUS: "status";
    readonly SERVER_ID: "serverId";
    readonly ORDER_TIME: "orderTime";
    readonly IS_OCCUPIED: "isOccupied";
    readonly WALK_IN: "walkIn";
    readonly RESERVATION: "reservation";
};
export type TableSortOptions = (typeof TableSortOptionsEnum)[keyof typeof TableSortOptionsEnum];
export declare const SeatingType: {
    readonly WALK_IN: "WALK_IN";
    readonly RESERVATION: "RESERVATION";
};
export type SeatingType = (typeof SeatingType)[keyof typeof SeatingType];
/**
 * Table-related schemas
 */
export declare const TableBaseTableSchema: z.ZodObject<{
    id: z.ZodNumber;
    tableNumber: z.ZodNumber;
    capacity: z.ZodNumber;
    additionalCapacity: z.ZodNumber;
    isOccupied: z.ZodBoolean;
    status: z.ZodEnum<{
        readonly AVAILABLE: "AVAILABLE";
        readonly OCCUPIED: "OCCUPIED";
        readonly RESERVED: "RESERVED";
        readonly ORDERING: "ORDERING";
        readonly SERVING: "SERVING";
        readonly PAYMENT: "PAYMENT";
    }>;
    guests: z.ZodNumber;
    originalCapacity: z.ZodNumber;
}, z.core.$strip>;
export declare const TableSeatingSchema: z.ZodObject<{
    tableNumber: z.ZodNumber;
    guests: z.ZodNumber;
    reservationId: z.ZodOptional<z.ZodNumber>;
    SeatingType: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly WALK_IN: "WALK_IN";
        readonly RESERVATION: "RESERVATION";
    }>>>;
}, z.core.$strip>;
export declare const TableAssignmentSchema: z.ZodObject<{
    serverId: z.ZodCoercedNumber<unknown>;
    isPrimary: z.ZodDefault<z.ZodBoolean>;
    assignedTables: z.ZodArray<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const TableSchema: z.ZodObject<{
    id: z.ZodNumber;
    tableNumber: z.ZodNumber;
    capacity: z.ZodNumber;
    additionalCapacity: z.ZodNumber;
    isOccupied: z.ZodBoolean;
    status: z.ZodEnum<{
        readonly AVAILABLE: "AVAILABLE";
        readonly OCCUPIED: "OCCUPIED";
        readonly RESERVED: "RESERVED";
        readonly ORDERING: "ORDERING";
        readonly SERVING: "SERVING";
        readonly PAYMENT: "PAYMENT";
    }>;
    guests: z.ZodNumber;
    originalCapacity: z.ZodNumber;
    orders: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodCoercedNumber<unknown>;
        orderTime: z.ZodDate;
        status: z.ZodDefault<z.ZodEnum<{
            readonly AWAITING: "AWAITING";
            readonly RECEIVED: "RECEIVED";
            readonly SERVED: "SERVED";
            readonly CANCELED: "CANCELED";
            readonly DISPUTED: "DISPUTED";
            readonly READY_TO_PAY: "READY_TO_PAY";
            readonly COMPLETED: "COMPLETED";
        }>>;
    }, z.core.$strip>>>;
    assignment: z.ZodOptional<z.ZodArray<z.ZodObject<{
        serverId: z.ZodCoercedNumber<unknown>;
        isPrimary: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const TableSearchCriteriaSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>;
    tableNumber: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    minCapacity: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxCapacity: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    isOccupied: z.ZodPipe<z.ZodOptional<z.ZodEnum<{
        true: "true";
        false: "false";
    }>>, z.ZodTransform<boolean | undefined, "true" | "false" | undefined>>;
    status: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly AVAILABLE: "AVAILABLE";
        readonly OCCUPIED: "OCCUPIED";
        readonly RESERVED: "RESERVED";
        readonly ORDERING: "ORDERING";
        readonly SERVING: "SERVING";
        readonly PAYMENT: "PAYMENT";
    }>>>;
    serverId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodString>> & z.ZodType<TableSortOptions, string | undefined, z.core.$ZodTypeInternals<TableSortOptions, string | undefined>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
export declare const TableCreateSchema: z.ZodObject<{
    tableNumber: z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>;
    capacity: z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>;
}, z.core.$strip>;
export declare const TableUpdatesSchema: z.ZodObject<{
    tableNumber: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    capacity: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
}, z.core.$strip>;
export declare const TableIdSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
}, z.core.$strip>;
/**
 * Table-related types
 */
export type TablesDTO = z.infer<typeof TableSchema>;
/**
 * Represents a table assignment in the restaurant management system.
 * This type is inferred from the TableAssignmentSchema and includes details about
 * the assignment of a server to a specific table.
 */
export type TableAssignment = z.infer<typeof TableAssignmentSchema>;
/**
 * Represents the structure for creating a new table in the restaurant management system.
 *
 * @property {number} tableNumber - The number assigned to the table. Must be a positive integer.
 * @property {number} capacity - The seating capacity of the table. Must be a positive integer.
 */
export type TableCreate = z.infer<typeof TableCreateSchema>;
/**
 * Represents the search criteria for tables in the system.
 *
 * @property {number} [id] - The unique identifier of the table.
 * @property {number} [tableNumber] - The number assigned to the table.
 * @property {number} [minCapacity] - The minimum seating capacity of the table.
 * @property {number} [maxCapacity] - The maximum seating capacity of the table.
 * @property {boolean} [isOccupied] - Whether the table is currently occupied.
 * @property {TableCondition} [status] - The current status of the table.
 * @property {number} [serverId] - The ID of the server assigned to the table.
 * @property {number} [page=1] - The page number for pagination (default: 1).
 * @property {number} [pageSize=10] - The number of items per page (default: 10).
 * @property {TableSortOptions} [sortBy] - The field to sort the results by.
 * @property {'asc' | 'desc'} [sortOrder='asc'] - The order of sorting (default: 'asc').
 */
export type TableSearchCriteria = z.infer<typeof TableSearchCriteriaSchema> & {
    page: number;
    pageSize: number;
    sortBy: TableSortOptions;
    sortOrder: 'asc' | 'desc';
};
/**
 * Represents a table list item derived from the TablesDTO type, excluding the 'originalCapacity' property.
 *
 * @typedef {Omit<TablesDTO, 'originalCapacity'>} TableListItem
 */
export type TableListItem = Omit<TablesDTO, 'originalCapacity'>;
export type TablesList = {
    tables: TableListItem[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
};
/**
 * Represents the structure for updating an existing table.
 *
 * @property {number} [tableNumber] - The new number to assign to the table. Must be a positive integer.
 * @property {number} [capacity] - The new seating capacity for the table. Must be a positive integer.
 */
export type TableUpdate = z.infer<typeof TableUpdatesSchema>;
/**
 * Represents the structure for identifying a specific table.
 *
 * @property {number} id - The unique identifier of the table. Must be a positive integer.
 */
export type TableId = z.infer<typeof TableIdSchema>;
export type TableSeatingDTO = z.infer<typeof TableSeatingSchema>;
//# sourceMappingURL=tables.dto.d.ts.map