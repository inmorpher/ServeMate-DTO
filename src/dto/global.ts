import { z } from 'zod';

const sortOrders = {
	ASC: 'asc',
	DESC: 'desc',
} as const;

export const parseQueryArray = (query: string | string[] | undefined) => {
	if (!query) return [];
	return Array.isArray(query) ? query : query.split(',').filter(Boolean);
};

export const arrayQueryParamSchema = z.string().transform(parseQueryArray).or(z.array(z.string()));

/**
 * Schema for list properties using Zod library.
 *
 * This schema validates the structure of pagination-related properties.
 *
 * @constant
 * @type {ZodObject}
 *
 * @property {ZodNumber} page - The current page number. Must be a positive integer. Defaults to 1.
 * @property {ZodNumber} pageSize - The number of items per page. Must be a positive integer between 1 and 100. Defaults to 10.
 * @property {ZodNumber} totalPages - The total number of pages. Must be a number.
 * @property {ZodNumber} totalCount - The total count of items. Must be a positive integer.
 */
export const listPropsSchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	pageSize: z.coerce.number().int().positive().min(1).max(100).default(10),
	totalPages: z.number(),
	totalCount: z.number().int().positive(),
});

/**
 * Schema for search criteria used in the application.
 *
 * This schema is based on `listPropsSchema` and includes the following properties:
 *
 * - `page`: Indicates the current page number.
 * - `pageSize`: Specifies the number of items per page.
 * - `sortOrder`: Defines the order in which items are sorted. It is an optional property and defaults to `sortOrders.ASC`.
 *
 * The `sortOrder` property uses a native enum `sortOrders` which should be defined elsewhere in the codebase.
 *
 * @constant
 * @type {ZodSchema}
 */
export const searchCriteriaSchema = listPropsSchema
	.pick({
		page: true,
		pageSize: true,
	})
	.extend({
		sortOrder: z.nativeEnum(sortOrders).optional().default(sortOrders.ASC),
	});

/**
 * Represents the possible sort orders.
 *
 * This type is derived from the keys of the `sortOrders` object.
 * It allows for type-safe usage of sort order values throughout the application.
 */
export type SortOrders = (typeof sortOrders)[keyof typeof sortOrders];

/**
 * Type definition for the properties of a list, inferred from the `listPropsSchema` schema.
 */
export type ListProps = z.infer<typeof listPropsSchema>;
