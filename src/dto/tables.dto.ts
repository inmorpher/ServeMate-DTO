import { TableCondition } from '@prisma/client';
import { z } from 'zod';
import { OrderSchema } from './orders.dto';

/**
 * Defines the options for sorting tables in the system.
 *
 */
export const TableSortOptionsEnum = {
	ID: 'id',
	TABLE_NUMBER: 'tableNumber',
	CAPACITY: 'capacity',
	STATUS: 'status',
	SERVER_ID: 'serverId',
	ORDER_TIME: 'orderTime',
	IS_OCCUPIED: 'isOccupied',
} as const;

export type TableSortOptions = (typeof TableSortOptionsEnum)[keyof typeof TableSortOptionsEnum];

/**
 * Table-related schemas
 */
export const BaseTableSchema = z.object({
	id: z.number(),
	tableNumber: z.number(),
	capacity: z.number(),
	additionalCapacity: z.number(),
	isOccupied: z.boolean(),
	status: z.nativeEnum(TableCondition),
	guests: z.number(),
	originalCapacity: z.number(),
});

export const TableAssignmentSchema = z.object({
	serverId: z.coerce.number(),
	isPrimary: z.boolean().default(true),
	assignedTables: z.array(z.coerce.number()),
});

export const TableSchema = BaseTableSchema.extend({
	orders: z
		.array(
			OrderSchema.pick({
				id: true,
				orderTime: true,
				status: true,
			})
		)
		.optional(),
	assignment: z
		.array(
			TableAssignmentSchema.pick({
				serverId: true,
				isPrimary: true,
			})
		)
		.optional(),
});

export const TableSearchCriteriaSchema = z.object({
	id: z
		.string()
		.optional()
		.transform((id) => (id ? parseInt(id) : undefined)),
	tableNumber: z.coerce.number().int().positive().optional(),
	minCapacity: z.coerce.number().int().positive().optional(),
	maxCapacity: z.coerce.number().int().positive().optional(),
	isOccupied: z
		.enum(['true', 'false'])
		.optional()
		.transform((val) => {
			if (val === 'true') return true;
			if (val === 'false') return false;
			return undefined;
		}),
	status: z
		.string()
		.transform((status) => status?.toUpperCase())
		.pipe(z.nativeEnum(TableCondition))
		.optional(),
	serverId: z.coerce.number().int().positive().optional(),
	page: z.coerce.number().int().positive().optional().default(1),
	pageSize: z.coerce.number().int().positive().max(100).optional().default(10),
	sortBy: z
		.string()
		.optional()
		.default(TableSortOptionsEnum.ID)
		.refine(
			(val): val is TableSortOptions =>
				Object.values(TableSortOptionsEnum).includes(val as TableSortOptions),
			{
				message: `Invalid sort option. Must be one of: ${Object.values(TableSortOptionsEnum).join(
					', '
				)}`,
			}
		),
	sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const TableCreateSchema = z.object({
	tableNumber: z
		.union([
			z.number(),
			z
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
	capacity: z
		.union([
			z.number(),
			z
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

export const TableUpdatesSchema = z.object({
	tableNumber: z
		.union([
			z.number(),
			z.string().refine((val) => !isNaN(Number(val)), {
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

	capacity: z
		.union([
			z.number(),
			z.string().refine((val) => !isNaN(Number(val)), {
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

export const TableIdSchema = z.object({
	id: z
		.union([
			z.number(),
			z.string().refine((id) => !isNaN(Number(id)), {
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

// ...existing code...
