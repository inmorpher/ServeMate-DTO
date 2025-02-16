import { z } from 'zod';
import { OrderState } from './enums';

/**
 * Order-related enums
 */

export const Allergies = {
	NONE: 'NONE',
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
} as const;

export type Allergies = (typeof Allergies)[keyof typeof Allergies];

export const PaymentStatus = {
	NONE: 'NONE',
	PAID: 'PAID',
	REFUNDED: 'REFUNDED',
	CANCELED: 'CANCELLED',
	PENDING: 'PENDING',
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const OrderSortOptions = {
	ID: 'id',
	TABLE_NUMBER: 'tableNumber',
	GUEST_NUMBER: 'guestsCount',
	ORDER_TIME: 'orderTime',
	UPDATED_AT: 'updatedAt',
	STATUS: 'status',
} as const;

/**
 * Order-related schemas
 */

const baseItemSchema = z.object({
	id: z.number().int().positive(),
	price: z.number().nonnegative(),
	discount: z.number().default(0),
	itemId: z.number().int().positive(),
	finalPrice: z.number().default(0),
	specialRequest: z.string().nullable(),
	allergies: z.array(z.nativeEnum(Allergies)).default([]),
	printed: z.boolean().default(false),
	fired: z.boolean().default(false),
	guestNumber: z.number().int().positive(),
	paymentStatus: z.nativeEnum(PaymentStatus).default(PaymentStatus.NONE),
});

const foodItemSchema = baseItemSchema.extend({
	foodItem: z.object({
		name: z.string(),
		id: z.number(),
	}),
});

const drinkItemSchema = baseItemSchema.extend({
	drinkItem: z.object({
		name: z.string(),
		id: z.number(),
	}),
});

const orderItemSchema = baseItemSchema.extend({
	foodItem: z
		.object({
			name: z.string(),
			id: z.number(),
		})
		.optional(),
	drinkItem: z
		.object({
			name: z.string(),
			id: z.number(),
		})
		.optional(),
});

const guestItemsBaseSchema = z.object({
	guestNumber: z.number().int().positive(),
	items: z.array(
		baseItemSchema.extend({ id: z.number().optional(), guestNumber: z.number().optional() })
	),
});

const createGuestItemsSchema = z.object({
	guestNumber: z.number().int().positive(),
	items: z.array(baseItemSchema.omit({ id: true, guestNumber: true })),
});

export const OrderSchema = z.object({
	id: z.coerce.number().int().positive(),
	tableNumber: z.coerce.number().int().positive(),
	orderNumber: z.coerce.number().int().positive(),
	guestsCount: z.coerce.number().int().positive(),
	orderTime: z.date(),
	updatedAt: z.date(),
	allergies: z.array(z.nativeEnum(Allergies)).optional(),
	serverId: z.coerce.number().int().positive(),
	totalAmount: z.coerce.number().int().positive().default(0),
	status: z.nativeEnum(OrderState).default(OrderState.RECEIVED),
	comments: z.string().optional().nullable(),
	completionTime: z.date().optional().nullable(),
	discount: z.number().default(0),
	tip: z.number().default(0),
	shiftId: z.string().optional().nullable(),
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
 */
export const OrderSearchSchema = z.object({
	id: z.coerce.number().int().positive().optional(),
	tableNumber: z.coerce.number().int().positive().optional(),
	test: z.string().optional(),
	guestsCount: z.coerce.number().int().positive().optional(),
	allergies: z.array(z.nativeEnum(Allergies)).optional(),
	serverId: z
		.string()
		.optional()
		.transform((server) => (server ? parseInt(server) : undefined)),
	serverName: z.string().optional(),
	status: z
		.string()
		.transform((status) => status?.toUpperCase())
		.pipe(z.nativeEnum(OrderState))
		.optional(),
	page: z.coerce.number().int().positive().optional().default(1),
	pageSize: z.coerce.number().int().positive().max(100).optional().default(10),
	sortBy: z
		.enum(Object.values(OrderSortOptions) as [string, ...string[]])
		.default(OrderSortOptions.ID),
	sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const foodAndDrinkSchema = z.object({
	foodItemId: z.number().int().positive(),
	quantity: z.number().int().positive(),
	price: z.number().nonnegative(),
	guestNumber: z.number().int().positive(),
});

export const OrderCreateSchema = OrderSchema.omit({
	id: true,
	orderNumber: true,
	orderTime: true,
	updatedAt: true,
	tip: true,
	shiftId: true,
})
	.extend({
		foodItems: z.array(guestItemsBaseSchema).default([]),
		drinkItems: z.array(guestItemsBaseSchema).default([]),
	})
	.refine(
		(order) =>
			(order.foodItems && order.foodItems.length > 0) ||
			(order.drinkItems && order.drinkItems.length > 0),
		{
			message: 'At least one of foodItems or drinkItems must be provided',
			path: ['foodItems', 'drinkItems'],
		}
	);

export const OrderFullSingleSchema = OrderSchema.omit({
	orderNumber: true,
}).extend({
	server: z.object({
		name: z.string(),
		id: z.number(),
	}),
	foodItems: z.array(guestItemsBaseSchema),
	drinkItems: z.array(guestItemsBaseSchema),
});

export const OrderUpdateProps = OrderSchema.omit({
	orderNumber: true,
	orderTime: true,
	updatedAt: true,
	shiftId: true,
	serverId: true,
	completionTime: true,
	id: true,
})
	.partial()
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

export const OrderUpdateItemsSchema = z
	.object({
		foodItems: z.array(createGuestItemsSchema).default([]),
		drinkItems: z.array(createGuestItemsSchema).default([]),
	})
	.refine((data) => data.foodItems.length > 0 || data.drinkItems.length > 0, {
		message: 'At least one of foodItems or drinkItems must be provided',
	});

export const OrderIds = z.object({
	ids: z.array(z.coerce.number().int().positive()).min(1, 'At least one order item ID is required'),
});

export const PrepareItems = z.object({
	foodItems: z.array(foodItemSchema.partial()).default([]),
	drinkItems: z.array(drinkItemSchema.partial()).default([]),
});

/**
 * Order-related types
 */

export type OrderDTO = z.infer<typeof OrderSchema>;

export type OrderSearchCriteria = z.infer<typeof OrderSearchSchema>;

export type OrderCreateDTO = z.infer<typeof OrderCreateSchema>;

export type OrderSortOptions = (typeof OrderSortOptions)[keyof typeof OrderSortOptions];

export type OrderFullSingleDTO = z.infer<typeof OrderFullSingleSchema>;

export type fnbItemsDTO = z.infer<typeof foodAndDrinkSchema>;

export type OrderItemDTO = z.infer<typeof baseItemSchema>;

export type OrderWithItemsDTO = OrderItemDTO & {
	foodItem: OrderItemDTO;
	drinkItem: OrderItemDTO;
};

export type GuestItemsDTO = z.infer<typeof guestItemsBaseSchema>;

export type OrderUpdateProps = z.infer<typeof OrderUpdateProps>;

export type OrderItemsIds = z.infer<typeof OrderIds>;

export type PrepareItemsDTO = z.infer<typeof PrepareItems>;

export type OrderItemExt = z.infer<typeof orderItemSchema>;

export type OrderUpdateItems = z.infer<typeof OrderUpdateItemsSchema>;

export type OrderSearchListResult = {
	orders: Pick<
		OrderFullSingleDTO,
		| 'id'
		| 'status'
		| 'server'
		| 'tableNumber'
		| 'guestsCount'
		| 'orderTime'
		| 'updatedAt'
		| 'completionTime'
		| 'allergies'
		| 'comments'
		| 'totalAmount'
		| 'discount'
		| 'tip'
	>[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
};
