"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMeta = exports.PrepareItems = exports.OrderIds = exports.OrderItemIdsSchema = exports.OrderUpdateItemsSchema = exports.OrderUpdateProps = exports.OrderFullSingleSchema = exports.OrderCreateSchema = exports.foodAndDrinkSchema = exports.OrderSearchSchema = exports.OrderSchema = exports.orderItemSchema = exports.OrderSortOptions = exports.PaymentStatus = exports.Allergies = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
/**
 * Order-related enums
 */
exports.Allergies = {
    GLUTEN: 'GLUTEN',
    DAIRY: 'DAIRY',
    EGG: 'EGG',
    PEANUT: 'PEANUT',
    TREENUT: 'TREENUT',
    FISH: 'FISH',
    SHELLFISH: 'SHELLFISH',
    SOY: 'SOY',
    SESAME: 'SESAME',
    CELERY: 'CELERY',
    MUSTARD: 'MUSTARD',
    LUPIN: 'LUPIN',
    SULPHITES: 'SULPHITES',
    MOLLUSCS: 'MOLLUSCS',
};
exports.PaymentStatus = {
    NONE: 'NONE',
    PAID: 'PAID',
    REFUNDED: 'REFUNDED',
    CANCELED: 'CANCELLED',
    PENDING: 'PENDING',
};
exports.OrderSortOptions = {
    ID: 'id',
    TABLE_NUMBER: 'tableNumber',
    GUESTS_NUMBER: 'guestsCount',
    ORDER_TIME: 'orderTime',
    UPDATED_AT: 'updatedAt',
    STATUS: 'status',
    TOTAL_AMOUNT: 'totalAmount',
};
/**
 * Order-related schemas
 */
const baseItemSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    price: zod_1.z.number().nonnegative(),
    discount: zod_1.z.number().default(0),
    itemId: zod_1.z.number().int().positive(),
    finalPrice: zod_1.z.number().default(0),
    specialRequest: zod_1.z.string().nullable(),
    printed: zod_1.z.boolean().default(false),
    fired: zod_1.z.boolean().default(false),
    guestNumber: zod_1.z.number().int().positive(),
    paymentStatus: zod_1.z.nativeEnum(exports.PaymentStatus).default(exports.PaymentStatus.NONE),
});
const foodItemSchema = baseItemSchema.extend({
    foodItem: zod_1.z.object({
        name: zod_1.z.string(),
        id: zod_1.z.number(),
    }),
});
const drinkItemSchema = baseItemSchema.extend({
    drinkItem: zod_1.z.object({
        name: zod_1.z.string(),
        id: zod_1.z.number(),
    }),
});
exports.orderItemSchema = baseItemSchema.extend({
    foodItem: zod_1.z
        .object({
        name: zod_1.z.string(),
        id: zod_1.z.number(),
    })
        .optional(),
    drinkItem: zod_1.z
        .object({
        name: zod_1.z.string(),
        id: zod_1.z.number(),
    })
        .optional(),
});
const guestItemsBaseSchema = zod_1.z.object({
    guestNumber: zod_1.z.number().int().positive(),
    items: zod_1.z.array(baseItemSchema.extend({ id: zod_1.z.number().optional(), guestNumber: zod_1.z.number().optional() })),
});
const createGuestItemsSchema = zod_1.z.object({
    guestNumber: zod_1.z.number().int().positive(),
    items: zod_1.z.array(baseItemSchema.omit({ id: true, guestNumber: true })),
});
exports.OrderSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
    tableNumber: zod_1.z.coerce.number().int().positive(),
    orderNumber: zod_1.z.coerce.number().int().positive(),
    guestsCount: zod_1.z.coerce.number().int().positive(),
    orderTime: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    allergies: zod_1.z.array(zod_1.z.nativeEnum(exports.Allergies)).optional(),
    serverId: zod_1.z.coerce.number().int().positive(),
    totalAmount: zod_1.z.coerce.number().int().nonnegative().default(0),
    status: zod_1.z.nativeEnum(enums_1.OrderState).default(enums_1.OrderState.RECEIVED),
    comments: zod_1.z.string().optional().nullable(),
    completionTime: zod_1.z.date().optional().nullable(),
    discount: zod_1.z.number().default(0),
    tip: zod_1.z.number().default(0),
    shiftId: zod_1.z.string().optional().nullable(),
});
/**
 * Schema for searching orders.
 *
 * This schema validates the search parameters for querying orders.
 *
 * @property {number} [id] - The unique identifier of the order. Must be a positive integer.
 * @property {number} [tableNumber] - The table number associated with the order. Must be a positive integer.
 * @property {number} [guestNumber] - The number of guests for the order. Must be a positive integer.
 * @property {Allergies[]} allergies - An array of allergies associated with the order. Defaults to an empty array.
 * @property {string} [server] - The server's identifier. If provided, it will be coerced to an integer.
 * @property {OrderState} [status] - The status of the order. If provided, it will be transformed to uppercase and validated against the OrderState enum.
 * @property {number} [page=1] - The page number for pagination. Must be a positive integer. Defaults to 1.
 * @property {number} [pageSize=10] - The number of items per page for pagination. Must be a positive integer and cannot exceed 100. Defaults to 10.
 * @property {OrderSortOptions} [sortBy=OrderSortOptions.ID] - The field by which to sort the results. Defaults to OrderSortOptions.ID.
 * @property {'asc' | 'desc'} [sortOrder='asc'] - The order in which to sort the results. Defaults to 'asc'.
 * @property {boolean} [meta=false] - A flag indicating whether to include metadata in the response. Defaults to false.
 */
exports.OrderSearchSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive().optional(),
    tableNumbers: zod_1.z.preprocess(val => {
        if (typeof val === 'string') {
            const items = val.split(',').map(item => parseInt(item.trim())).filter(item => item !== undefined || !isNaN(item));
            return items.length > 0 ? items : undefined;
        }
        if (Array.isArray(val)) {
            return val.map(item => {
                const num = typeof item === 'string' ? parseInt(item) : item;
                return isNaN(num) ? undefined : num;
            });
        }
        return undefined;
    }, zod_1.z.optional(zod_1.z.array(zod_1.z.coerce.number().int().positive()))),
    guestsCount: zod_1.z.coerce.number().int().positive().optional(),
    allergies: zod_1.z.preprocess((val) => {
        if (typeof val === 'string') {
            const items = val
                .split(',')
                .map((item) => item.trim().toUpperCase())
                .filter((item) => item !== '');
            return items.length > 0 ? items : undefined;
        }
        if (Array.isArray(val)) {
            // Если массив, приводим каждый элемент к верхнему регистру
            return val.map((item) => (typeof item === 'string' ? item.toUpperCase() : item));
        }
        return undefined;
    }, zod_1.z.optional(zod_1.z.array(zod_1.z.enum(exports.Allergies)))),
    serverId: zod_1.z
        .string()
        .transform((server) => (server ? parseInt(server) : undefined)).optional(),
    serverName: zod_1.z.string().optional(),
    status: zod_1.z
        .string()
        .transform((status) => status === null || status === void 0 ? void 0 : status.toUpperCase())
        .pipe(zod_1.z.enum(enums_1.OrderState))
        .optional(),
    minAmount: zod_1.z.coerce.number().int().positive().optional(),
    maxAmount: zod_1.z.coerce.number().int().positive().optional(),
    page: zod_1.z.coerce.number().int().positive().optional().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: zod_1.z
        .enum(Object.values(exports.OrderSortOptions))
        .default(exports.OrderSortOptions.ID),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('asc'),
    dateFrom: zod_1.z.coerce.date().optional(),
    dateTo: zod_1.z.coerce.date().optional(),
});
exports.foodAndDrinkSchema = zod_1.z.object({
    foodItemId: zod_1.z.number().int().positive(),
    quantity: zod_1.z.number().int().positive(),
    price: zod_1.z.number().nonnegative(),
    guestNumber: zod_1.z.number().int().positive(),
});
exports.OrderCreateSchema = exports.OrderSchema.omit({
    id: true,
    orderNumber: true,
    orderTime: true,
    updatedAt: true,
    tip: true,
    shiftId: true,
})
    .extend({
    foodItems: zod_1.z.array(guestItemsBaseSchema).default([]),
    drinkItems: zod_1.z.array(guestItemsBaseSchema).default([]),
})
    .refine((order) => (order.foodItems && order.foodItems.length > 0) ||
    (order.drinkItems && order.drinkItems.length > 0), {
    message: 'At least one of foodItems or drinkItems must be provided',
    path: ['foodItems', 'drinkItems'],
});
exports.OrderFullSingleSchema = exports.OrderSchema.omit({
    orderNumber: true,
}).extend({
    server: zod_1.z.object({
        name: zod_1.z.string(),
        id: zod_1.z.number(),
    }),
    foodItems: zod_1.z.array(guestItemsBaseSchema),
    drinkItems: zod_1.z.array(guestItemsBaseSchema),
});
exports.OrderUpdateProps = zod_1.z
    .object({
    tableNumber: zod_1.z.coerce.number().int().positive().optional(),
    guestsCount: zod_1.z.coerce.number().int().positive().optional(),
    allergies: zod_1.z.array(zod_1.z.enum(exports.Allergies)).optional(),
    totalAmount: zod_1.z.coerce.number().int().nonnegative().optional(),
    status: zod_1.z.enum(enums_1.OrderState).optional(),
    comments: zod_1.z.string().optional().nullable(),
    discount: zod_1.z.number().optional(),
    tip: zod_1.z.number().optional(),
})
    .refine((order) => Object.keys(order).length > 0, {
    message: 'At least one property must be provided',
    path: [
        'order',
        'paymentStatus',
        'orderTime',
        'updatedAt',
        'shiftId',
        'serverId',
        'completionTime',
        'id',
    ],
});
exports.OrderUpdateItemsSchema = zod_1.z
    .object({
    foodItems: zod_1.z.array(createGuestItemsSchema).default([]),
    drinkItems: zod_1.z.array(createGuestItemsSchema).default([]),
})
    .refine((data) => data.foodItems.length > 0 || data.drinkItems.length > 0, {
    message: 'At least one of foodItems or drinkItems must be provided',
});
const orderItemIdsPayloadSchema = zod_1.z.union([
    zod_1.z.object({
        ids: zod_1.z.array(zod_1.z.coerce.number().int().positive()).min(1, 'At least one order item ID is required'),
    }),
    zod_1.z.object({
        orderItemsIds: zod_1.z.array(zod_1.z.coerce.number().int().positive()).min(1, 'At least one order item ID is required'),
    }),
]);
exports.OrderItemIdsSchema = orderItemIdsPayloadSchema.transform((payload) => ({
    ids: 'ids' in payload ? payload.ids : payload.orderItemsIds,
}));
exports.OrderIds = exports.OrderItemIdsSchema;
exports.PrepareItems = zod_1.z.object({
    foodItems: zod_1.z.array(foodItemSchema.partial()).default([]),
    drinkItems: zod_1.z.array(drinkItemSchema.partial()).default([]),
});
exports.OrderMeta = zod_1.z.object({
    statuses: zod_1.z.array(zod_1.z.enum(enums_1.OrderState)),
    allergies: zod_1.z.array(zod_1.z.enum(exports.Allergies)),
    maxGuests: zod_1.z.number().int().positive(),
    prices: zod_1.z.object({
        min: zod_1.z.number().int().nonnegative(),
        max: zod_1.z.number().int().nonnegative(),
    }),
    dates: zod_1.z.object({
        min: zod_1.z.string().datetime(),
        max: zod_1.z.string().datetime(),
    }),
    tableNumbers: zod_1.z.array(zod_1.z.coerce.number().int().positive()),
    filtered: zod_1.z.object({
        maxGuests: zod_1.z.number().int().positive(),
        prices: zod_1.z.object({
            min: zod_1.z.number().int().nonnegative(),
            max: zod_1.z.number().int().nonnegative(),
        }),
        dates: zod_1.z.object({
            min: zod_1.z.string().datetime(),
            max: zod_1.z.string().datetime(),
        }),
        tableNumbers: zod_1.z.array(zod_1.z.coerce.number().int().positive()),
    }),
});
