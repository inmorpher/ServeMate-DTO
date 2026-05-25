"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCriteriaSchema = exports.listPropsSchema = exports.arrayQueryParamSchema = exports.parseQueryArray = void 0;
const zod_1 = require("zod");
const sortOrders = {
    ASC: 'asc',
    DESC: 'desc',
};
const parseQueryArray = (query) => {
    if (!query)
        return [];
    return Array.isArray(query) ? query : query.split(',').filter(Boolean);
};
exports.parseQueryArray = parseQueryArray;
exports.arrayQueryParamSchema = zod_1.z.string().transform(exports.parseQueryArray).or(zod_1.z.array(zod_1.z.string()));
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
exports.listPropsSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().min(1).max(100).default(10),
    totalPages: zod_1.z.number(),
    totalCount: zod_1.z.number().int().positive(),
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
exports.searchCriteriaSchema = exports.listPropsSchema
    .pick({
    page: true,
    pageSize: true,
})
    .extend({
    sortOrder: zod_1.z.nativeEnum(sortOrders).optional().default(sortOrders.ASC),
});
