"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableIdSchema = exports.TableUpdatesSchema = exports.TableCreateSchema = exports.TableSearchCriteriaSchema = exports.TableSchema = exports.TableAssignmentSchema = exports.TableSeatingSchema = exports.TableBaseTableSchema = exports.SeatingType = exports.TableSortOptionsEnum = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
const orders_dto_1 = require("./orders.dto");
/**
 * Defines the options for sorting tables in the system.
 *
 */
exports.TableSortOptionsEnum = {
    ID: 'id',
    TABLE_NUMBER: 'tableNumber',
    CAPACITY: 'capacity',
    STATUS: 'status',
    SERVER_ID: 'serverId',
    ORDER_TIME: 'orderTime',
    IS_OCCUPIED: 'isOccupied',
    WALK_IN: 'walkIn',
    RESERVATION: 'reservation',
};
exports.SeatingType = {
    WALK_IN: 'WALK_IN',
    RESERVATION: 'RESERVATION',
};
/**
 * Table-related schemas
 */
exports.TableBaseTableSchema = zod_1.z.object({
    id: zod_1.z.number(),
    tableNumber: zod_1.z.number().int().positive(),
    capacity: zod_1.z.number(),
    additionalCapacity: zod_1.z.number(),
    isOccupied: zod_1.z.boolean(),
    status: zod_1.z.nativeEnum(enums_1.TableCondition),
    guests: zod_1.z.number(),
    originalCapacity: zod_1.z.number(),
});
exports.TableSeatingSchema = exports.TableBaseTableSchema.pick({
    tableNumber: true,
    guests: true,
}).extend({
    reservationId: zod_1.z.number().positive().int().optional(),
    SeatingType: zod_1.z
        .string()
        .transform((status) => status === null || status === void 0 ? void 0 : status.toUpperCase())
        .pipe(zod_1.z.nativeEnum(exports.SeatingType))
        .default('WALK_IN'),
});
exports.TableAssignmentSchema = zod_1.z.object({
    serverId: zod_1.z.coerce.number(),
    isPrimary: zod_1.z.boolean().default(true),
    assignedTables: zod_1.z.array(zod_1.z.coerce.number()),
});
exports.TableSchema = exports.TableBaseTableSchema.extend({
    orders: zod_1.z
        .array(orders_dto_1.OrderSchema.pick({
        id: true,
        orderTime: true,
        status: true,
    }))
        .optional(),
    assignment: zod_1.z
        .array(exports.TableAssignmentSchema.pick({
        serverId: true,
        isPrimary: true,
    }))
        .optional(),
});
exports.TableSearchCriteriaSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .optional()
        .transform((id) => (id ? parseInt(id) : undefined)),
    tableNumber: zod_1.z.coerce.number().int().positive().optional(),
    minCapacity: zod_1.z.coerce.number().int().positive().optional(),
    maxCapacity: zod_1.z.coerce.number().int().positive().optional(),
    isOccupied: zod_1.z
        .enum(['true', 'false'])
        .optional()
        .transform((val) => {
        if (val === 'true')
            return true;
        if (val === 'false')
            return false;
        return undefined;
    }),
    status: zod_1.z
        .string()
        .transform((status) => status === null || status === void 0 ? void 0 : status.toUpperCase())
        .pipe(zod_1.z.nativeEnum(enums_1.TableCondition))
        .optional(),
    serverId: zod_1.z.coerce.number().int().positive().optional(),
    page: zod_1.z.coerce.number().int().positive().optional().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: zod_1.z
        .string()
        .optional()
        .default(exports.TableSortOptionsEnum.ID)
        .refine((val) => Object.values(exports.TableSortOptionsEnum).includes(val), {
        message: `Invalid sort option. Must be one of: ${Object.values(exports.TableSortOptionsEnum).join(', ')}`,
    }),
    sortOrder: zod_1.z.enum(['asc', 'desc']).optional().default('asc'),
});
exports.TableCreateSchema = zod_1.z.object({
    tableNumber: zod_1.z
        .union([
        zod_1.z.number(),
        zod_1.z
            .string()
            .refine((tableNumber) => !isNaN(Number(tableNumber)), {
            message: 'Table number must be a valid number',
        })
            .transform(Number),
    ])
        .refine((tableNumber) => tableNumber > 0, {
        message: 'Table number must be a positive number',
    })
        .refine((tableNumber) => Number.isInteger(tableNumber), {
        message: 'Table number must be an integer',
    }),
    capacity: zod_1.z
        .union([
        zod_1.z.number(),
        zod_1.z
            .string()
            .refine((capacity) => !isNaN(Number(capacity)), {
            message: 'Capacity must be a valid number',
        })
            .transform(Number),
    ])
        .refine((capacity) => capacity > 0, { message: 'Capacity must be a positive number' })
        .refine((capacity) => Number.isInteger(capacity), {
        message: 'Capacity number must be an integer',
    }),
});
exports.TableUpdatesSchema = zod_1.z.object({
    tableNumber: zod_1.z
        .union([
        zod_1.z.number(),
        zod_1.z.string().refine((val) => !isNaN(Number(val)), {
            message: 'Table number must be a valid number',
        }),
    ])
        .transform((val) => Number(val))
        .refine((val) => val > 0, {
        message: 'Table number must be a positive number',
    })
        .refine((val) => Number.isInteger(val), {
        message: 'Table number must be an integer',
    })
        .optional(),
    capacity: zod_1.z
        .union([
        zod_1.z.number(),
        zod_1.z.string().refine((val) => !isNaN(Number(val)), {
            message: 'Capacity must be a valid number',
        }),
    ])
        .transform((val) => Number(val))
        .refine((val) => val > 0, {
        message: 'Capacity must be a positive number',
    })
        .refine((val) => Number.isInteger(val), {
        message: 'Capacity must be an integer',
    })
        .optional(),
});
exports.TableIdSchema = zod_1.z.object({
    id: zod_1.z
        .union([
        zod_1.z.number(),
        zod_1.z.string().refine((id) => !isNaN(Number(id)), {
            message: 'Table ID must be a valid number',
        }),
    ])
        .transform((id) => Number(id))
        .refine((id) => id > 0, {
        message: 'Table ID must be a positive number',
    })
        .refine((id) => Number.isInteger(id), {
        message: 'Table ID must be an integer',
    }),
});
