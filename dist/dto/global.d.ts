import { z } from 'zod';
declare const sortOrders: {
    readonly ASC: "asc";
    readonly DESC: "desc";
};
export declare const parseQueryArray: (query: string | string[] | undefined) => string[];
export declare const arrayQueryParamSchema: z.ZodUnion<[z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>, z.ZodArray<z.ZodString>]>;
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
export declare const listPropsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    totalPages: z.ZodNumber;
    totalCount: z.ZodNumber;
}, z.core.$strip>;
export type ListPropsSchema = z.infer<typeof listPropsSchema>;
export type ListReturnType<T> = {
    list: T[];
} & ListPropsSchema;
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
export declare const searchCriteriaSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        readonly ASC: "asc";
        readonly DESC: "desc";
    }>>>;
}, z.core.$strip>;
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
export {};
//# sourceMappingURL=global.d.ts.map