import { z } from 'zod';
/**
 * Order-related enums
 */
export declare const Allergies: {
    readonly GLUTEN: "GLUTEN";
    readonly DAIRY: "DAIRY";
    readonly EGG: "EGG";
    readonly PEANUT: "PEANUT";
    readonly TREENUT: "TREENUT";
    readonly FISH: "FISH";
    readonly SHELLFISH: "SHELLFISH";
    readonly SOY: "SOY";
    readonly SESAME: "SESAME";
    readonly CELERY: "CELERY";
    readonly MUSTARD: "MUSTARD";
    readonly LUPIN: "LUPIN";
    readonly SULPHITES: "SULPHITES";
    readonly MOLLUSCS: "MOLLUSCS";
};
export type Allergies = (typeof Allergies)[keyof typeof Allergies];
export declare const PaymentStatus: {
    readonly NONE: "NONE";
    readonly PAID: "PAID";
    readonly REFUNDED: "REFUNDED";
    readonly CANCELED: "CANCELLED";
    readonly PENDING: "PENDING";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const OrderSortOptions: {
    readonly ID: "id";
    readonly TABLE_NUMBER: "tableNumber";
    readonly GUESTS_NUMBER: "guestsCount";
    readonly ORDER_TIME: "orderTime";
    readonly UPDATED_AT: "updatedAt";
    readonly STATUS: "status";
    readonly TOTAL_AMOUNT: "totalAmount";
};
/**
 * Order-related schemas
 */
declare const baseItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    price: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    itemId: z.ZodNumber;
    finalPrice: z.ZodDefault<z.ZodNumber>;
    specialRequest: z.ZodNullable<z.ZodString>;
    allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>;
    printed: z.ZodDefault<z.ZodBoolean>;
    fired: z.ZodDefault<z.ZodBoolean>;
    guestNumber: z.ZodNumber;
    paymentStatus: z.ZodDefault<z.ZodEnum<{
        readonly NONE: "NONE";
        readonly PAID: "PAID";
        readonly REFUNDED: "REFUNDED";
        readonly CANCELED: "CANCELLED";
        readonly PENDING: "PENDING";
    }>>;
}, z.core.$strip>;
export declare const orderItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    price: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    itemId: z.ZodNumber;
    finalPrice: z.ZodDefault<z.ZodNumber>;
    specialRequest: z.ZodNullable<z.ZodString>;
    allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>;
    printed: z.ZodDefault<z.ZodBoolean>;
    fired: z.ZodDefault<z.ZodBoolean>;
    guestNumber: z.ZodNumber;
    paymentStatus: z.ZodDefault<z.ZodEnum<{
        readonly NONE: "NONE";
        readonly PAID: "PAID";
        readonly REFUNDED: "REFUNDED";
        readonly CANCELED: "CANCELLED";
        readonly PENDING: "PENDING";
    }>>;
    foodItem: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
    drinkItem: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const guestItemsBaseSchema: z.ZodObject<{
    guestNumber: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        price: z.ZodNumber;
        discount: z.ZodDefault<z.ZodNumber>;
        itemId: z.ZodNumber;
        finalPrice: z.ZodDefault<z.ZodNumber>;
        specialRequest: z.ZodNullable<z.ZodString>;
        allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
            readonly GLUTEN: "GLUTEN";
            readonly DAIRY: "DAIRY";
            readonly EGG: "EGG";
            readonly PEANUT: "PEANUT";
            readonly TREENUT: "TREENUT";
            readonly FISH: "FISH";
            readonly SHELLFISH: "SHELLFISH";
            readonly SOY: "SOY";
            readonly SESAME: "SESAME";
            readonly CELERY: "CELERY";
            readonly MUSTARD: "MUSTARD";
            readonly LUPIN: "LUPIN";
            readonly SULPHITES: "SULPHITES";
            readonly MOLLUSCS: "MOLLUSCS";
        }>>>;
        printed: z.ZodDefault<z.ZodBoolean>;
        fired: z.ZodDefault<z.ZodBoolean>;
        paymentStatus: z.ZodDefault<z.ZodEnum<{
            readonly NONE: "NONE";
            readonly PAID: "PAID";
            readonly REFUNDED: "REFUNDED";
            readonly CANCELED: "CANCELLED";
            readonly PENDING: "PENDING";
        }>>;
        id: z.ZodOptional<z.ZodNumber>;
        guestNumber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const orderItemRawSchema: z.ZodObject<{
    id: z.ZodNumber;
    price: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    itemId: z.ZodNumber;
    finalPrice: z.ZodDefault<z.ZodNumber>;
    specialRequest: z.ZodNullable<z.ZodString>;
    allergies: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>;
    printed: z.ZodDefault<z.ZodBoolean>;
    fired: z.ZodDefault<z.ZodBoolean>;
    guestNumber: z.ZodNumber;
    paymentStatus: z.ZodDefault<z.ZodEnum<{
        readonly NONE: "NONE";
        readonly PAID: "PAID";
        readonly REFUNDED: "REFUNDED";
        readonly CANCELED: "CANCELLED";
        readonly PENDING: "PENDING";
    }>>;
    foodItem: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
    drinkItem: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const OrderSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    tableNumber: z.ZodCoercedNumber<unknown>;
    orderNumber: z.ZodCoercedNumber<unknown>;
    guestsCount: z.ZodCoercedNumber<unknown>;
    orderTime: z.ZodDate;
    updatedAt: z.ZodDate;
    allergies: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>;
    serverId: z.ZodCoercedNumber<unknown>;
    totalAmount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodDefault<z.ZodEnum<{
        readonly AWAITING: "AWAITING";
        readonly RECEIVED: "RECEIVED";
        readonly SERVED: "SERVED";
        readonly CANCELED: "CANCELED";
        readonly DISPUTED: "DISPUTED";
        readonly READY_TO_PAY: "READY_TO_PAY";
        readonly COMPLETED: "COMPLETED";
    }>>;
    comments: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    completionTime: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    discount: z.ZodDefault<z.ZodNumber>;
    tip: z.ZodDefault<z.ZodNumber>;
    shiftId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
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
export declare const OrderSearchSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    tableNumbers: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodCoercedNumber<unknown>>>>;
    guestsCount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    allergies: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>>;
    serverId: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number | undefined, string>>>;
    serverName: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        readonly AWAITING: "AWAITING";
        readonly RECEIVED: "RECEIVED";
        readonly SERVED: "SERVED";
        readonly CANCELED: "CANCELED";
        readonly DISPUTED: "DISPUTED";
        readonly READY_TO_PAY: "READY_TO_PAY";
        readonly COMPLETED: "COMPLETED";
    }>>>;
    minAmount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxAmount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        [x: string]: string;
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    dateFrom: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    dateTo: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const foodAndDrinkSchema: z.ZodObject<{
    foodItemId: z.ZodNumber;
    quantity: z.ZodNumber;
    price: z.ZodNumber;
    guestNumber: z.ZodNumber;
}, z.core.$strip>;
export declare const OrderCreateSchema: z.ZodObject<{
    allergies: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>;
    tableNumber: z.ZodCoercedNumber<unknown>;
    guestsCount: z.ZodCoercedNumber<unknown>;
    status: z.ZodDefault<z.ZodEnum<{
        readonly AWAITING: "AWAITING";
        readonly RECEIVED: "RECEIVED";
        readonly SERVED: "SERVED";
        readonly CANCELED: "CANCELED";
        readonly DISPUTED: "DISPUTED";
        readonly READY_TO_PAY: "READY_TO_PAY";
        readonly COMPLETED: "COMPLETED";
    }>>;
    totalAmount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    discount: z.ZodDefault<z.ZodNumber>;
    serverId: z.ZodCoercedNumber<unknown>;
    comments: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    completionTime: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    foodItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        guestNumber: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            price: z.ZodNumber;
            discount: z.ZodDefault<z.ZodNumber>;
            itemId: z.ZodNumber;
            finalPrice: z.ZodDefault<z.ZodNumber>;
            specialRequest: z.ZodNullable<z.ZodString>;
            allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
                readonly GLUTEN: "GLUTEN";
                readonly DAIRY: "DAIRY";
                readonly EGG: "EGG";
                readonly PEANUT: "PEANUT";
                readonly TREENUT: "TREENUT";
                readonly FISH: "FISH";
                readonly SHELLFISH: "SHELLFISH";
                readonly SOY: "SOY";
                readonly SESAME: "SESAME";
                readonly CELERY: "CELERY";
                readonly MUSTARD: "MUSTARD";
                readonly LUPIN: "LUPIN";
                readonly SULPHITES: "SULPHITES";
                readonly MOLLUSCS: "MOLLUSCS";
            }>>>;
            printed: z.ZodDefault<z.ZodBoolean>;
            fired: z.ZodDefault<z.ZodBoolean>;
            paymentStatus: z.ZodDefault<z.ZodEnum<{
                readonly NONE: "NONE";
                readonly PAID: "PAID";
                readonly REFUNDED: "REFUNDED";
                readonly CANCELED: "CANCELLED";
                readonly PENDING: "PENDING";
            }>>;
            id: z.ZodOptional<z.ZodNumber>;
            guestNumber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
    drinkItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        guestNumber: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            price: z.ZodNumber;
            discount: z.ZodDefault<z.ZodNumber>;
            itemId: z.ZodNumber;
            finalPrice: z.ZodDefault<z.ZodNumber>;
            specialRequest: z.ZodNullable<z.ZodString>;
            allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
                readonly GLUTEN: "GLUTEN";
                readonly DAIRY: "DAIRY";
                readonly EGG: "EGG";
                readonly PEANUT: "PEANUT";
                readonly TREENUT: "TREENUT";
                readonly FISH: "FISH";
                readonly SHELLFISH: "SHELLFISH";
                readonly SOY: "SOY";
                readonly SESAME: "SESAME";
                readonly CELERY: "CELERY";
                readonly MUSTARD: "MUSTARD";
                readonly LUPIN: "LUPIN";
                readonly SULPHITES: "SULPHITES";
                readonly MOLLUSCS: "MOLLUSCS";
            }>>>;
            printed: z.ZodDefault<z.ZodBoolean>;
            fired: z.ZodDefault<z.ZodBoolean>;
            paymentStatus: z.ZodDefault<z.ZodEnum<{
                readonly NONE: "NONE";
                readonly PAID: "PAID";
                readonly REFUNDED: "REFUNDED";
                readonly CANCELED: "CANCELLED";
                readonly PENDING: "PENDING";
            }>>;
            id: z.ZodOptional<z.ZodNumber>;
            guestNumber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const OrderFullSingleSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    updatedAt: z.ZodDate;
    allergies: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>;
    tableNumber: z.ZodCoercedNumber<unknown>;
    guestsCount: z.ZodCoercedNumber<unknown>;
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
    totalAmount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    discount: z.ZodDefault<z.ZodNumber>;
    serverId: z.ZodCoercedNumber<unknown>;
    comments: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    completionTime: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    tip: z.ZodDefault<z.ZodNumber>;
    shiftId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    server: z.ZodObject<{
        name: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>;
    foodItems: z.ZodArray<z.ZodObject<{
        guestNumber: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            price: z.ZodNumber;
            discount: z.ZodDefault<z.ZodNumber>;
            itemId: z.ZodNumber;
            finalPrice: z.ZodDefault<z.ZodNumber>;
            specialRequest: z.ZodNullable<z.ZodString>;
            allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
                readonly GLUTEN: "GLUTEN";
                readonly DAIRY: "DAIRY";
                readonly EGG: "EGG";
                readonly PEANUT: "PEANUT";
                readonly TREENUT: "TREENUT";
                readonly FISH: "FISH";
                readonly SHELLFISH: "SHELLFISH";
                readonly SOY: "SOY";
                readonly SESAME: "SESAME";
                readonly CELERY: "CELERY";
                readonly MUSTARD: "MUSTARD";
                readonly LUPIN: "LUPIN";
                readonly SULPHITES: "SULPHITES";
                readonly MOLLUSCS: "MOLLUSCS";
            }>>>;
            printed: z.ZodDefault<z.ZodBoolean>;
            fired: z.ZodDefault<z.ZodBoolean>;
            paymentStatus: z.ZodDefault<z.ZodEnum<{
                readonly NONE: "NONE";
                readonly PAID: "PAID";
                readonly REFUNDED: "REFUNDED";
                readonly CANCELED: "CANCELLED";
                readonly PENDING: "PENDING";
            }>>;
            id: z.ZodOptional<z.ZodNumber>;
            guestNumber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    drinkItems: z.ZodArray<z.ZodObject<{
        guestNumber: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            price: z.ZodNumber;
            discount: z.ZodDefault<z.ZodNumber>;
            itemId: z.ZodNumber;
            finalPrice: z.ZodDefault<z.ZodNumber>;
            specialRequest: z.ZodNullable<z.ZodString>;
            allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
                readonly GLUTEN: "GLUTEN";
                readonly DAIRY: "DAIRY";
                readonly EGG: "EGG";
                readonly PEANUT: "PEANUT";
                readonly TREENUT: "TREENUT";
                readonly FISH: "FISH";
                readonly SHELLFISH: "SHELLFISH";
                readonly SOY: "SOY";
                readonly SESAME: "SESAME";
                readonly CELERY: "CELERY";
                readonly MUSTARD: "MUSTARD";
                readonly LUPIN: "LUPIN";
                readonly SULPHITES: "SULPHITES";
                readonly MOLLUSCS: "MOLLUSCS";
            }>>>;
            printed: z.ZodDefault<z.ZodBoolean>;
            fired: z.ZodDefault<z.ZodBoolean>;
            paymentStatus: z.ZodDefault<z.ZodEnum<{
                readonly NONE: "NONE";
                readonly PAID: "PAID";
                readonly REFUNDED: "REFUNDED";
                readonly CANCELED: "CANCELLED";
                readonly PENDING: "PENDING";
            }>>;
            id: z.ZodOptional<z.ZodNumber>;
            guestNumber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const OrderUpdateProps: z.ZodObject<{
    tableNumber: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    guestsCount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    allergies: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>;
    totalAmount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly AWAITING: "AWAITING";
        readonly RECEIVED: "RECEIVED";
        readonly SERVED: "SERVED";
        readonly CANCELED: "CANCELED";
        readonly DISPUTED: "DISPUTED";
        readonly READY_TO_PAY: "READY_TO_PAY";
        readonly COMPLETED: "COMPLETED";
    }>>;
    comments: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    discount: z.ZodOptional<z.ZodNumber>;
    tip: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const OrderUpdateItemsSchema: z.ZodObject<{
    foodItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        guestNumber: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            price: z.ZodNumber;
            allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
                readonly GLUTEN: "GLUTEN";
                readonly DAIRY: "DAIRY";
                readonly EGG: "EGG";
                readonly PEANUT: "PEANUT";
                readonly TREENUT: "TREENUT";
                readonly FISH: "FISH";
                readonly SHELLFISH: "SHELLFISH";
                readonly SOY: "SOY";
                readonly SESAME: "SESAME";
                readonly CELERY: "CELERY";
                readonly MUSTARD: "MUSTARD";
                readonly LUPIN: "LUPIN";
                readonly SULPHITES: "SULPHITES";
                readonly MOLLUSCS: "MOLLUSCS";
            }>>>;
            discount: z.ZodDefault<z.ZodNumber>;
            itemId: z.ZodNumber;
            finalPrice: z.ZodDefault<z.ZodNumber>;
            specialRequest: z.ZodNullable<z.ZodString>;
            printed: z.ZodDefault<z.ZodBoolean>;
            fired: z.ZodDefault<z.ZodBoolean>;
            paymentStatus: z.ZodDefault<z.ZodEnum<{
                readonly NONE: "NONE";
                readonly PAID: "PAID";
                readonly REFUNDED: "REFUNDED";
                readonly CANCELED: "CANCELLED";
                readonly PENDING: "PENDING";
            }>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
    drinkItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        guestNumber: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            price: z.ZodNumber;
            allergies: z.ZodDefault<z.ZodArray<z.ZodEnum<{
                readonly GLUTEN: "GLUTEN";
                readonly DAIRY: "DAIRY";
                readonly EGG: "EGG";
                readonly PEANUT: "PEANUT";
                readonly TREENUT: "TREENUT";
                readonly FISH: "FISH";
                readonly SHELLFISH: "SHELLFISH";
                readonly SOY: "SOY";
                readonly SESAME: "SESAME";
                readonly CELERY: "CELERY";
                readonly MUSTARD: "MUSTARD";
                readonly LUPIN: "LUPIN";
                readonly SULPHITES: "SULPHITES";
                readonly MOLLUSCS: "MOLLUSCS";
            }>>>;
            discount: z.ZodDefault<z.ZodNumber>;
            itemId: z.ZodNumber;
            finalPrice: z.ZodDefault<z.ZodNumber>;
            specialRequest: z.ZodNullable<z.ZodString>;
            printed: z.ZodDefault<z.ZodBoolean>;
            fired: z.ZodDefault<z.ZodBoolean>;
            paymentStatus: z.ZodDefault<z.ZodEnum<{
                readonly NONE: "NONE";
                readonly PAID: "PAID";
                readonly REFUNDED: "REFUNDED";
                readonly CANCELED: "CANCELLED";
                readonly PENDING: "PENDING";
            }>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const OrderItemIdsSchema: z.ZodPipe<z.ZodUnion<readonly [z.ZodObject<{
    ids: z.ZodArray<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>, z.ZodObject<{
    orderItemsIds: z.ZodArray<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>]>, z.ZodTransform<{
    ids: number[];
}, {
    ids: number[];
} | {
    orderItemsIds: number[];
}>>;
export declare const OrderIds: z.ZodPipe<z.ZodUnion<readonly [z.ZodObject<{
    ids: z.ZodArray<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>, z.ZodObject<{
    orderItemsIds: z.ZodArray<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>]>, z.ZodTransform<{
    ids: number[];
}, {
    ids: number[];
} | {
    orderItemsIds: number[];
}>>;
export declare const PrepareItems: z.ZodObject<{
    foodItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        price: z.ZodOptional<z.ZodNumber>;
        discount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        itemId: z.ZodOptional<z.ZodNumber>;
        finalPrice: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        specialRequest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allergies: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<{
            readonly GLUTEN: "GLUTEN";
            readonly DAIRY: "DAIRY";
            readonly EGG: "EGG";
            readonly PEANUT: "PEANUT";
            readonly TREENUT: "TREENUT";
            readonly FISH: "FISH";
            readonly SHELLFISH: "SHELLFISH";
            readonly SOY: "SOY";
            readonly SESAME: "SESAME";
            readonly CELERY: "CELERY";
            readonly MUSTARD: "MUSTARD";
            readonly LUPIN: "LUPIN";
            readonly SULPHITES: "SULPHITES";
            readonly MOLLUSCS: "MOLLUSCS";
        }>>>>;
        printed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        fired: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        guestNumber: z.ZodOptional<z.ZodNumber>;
        paymentStatus: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            readonly NONE: "NONE";
            readonly PAID: "PAID";
            readonly REFUNDED: "REFUNDED";
            readonly CANCELED: "CANCELLED";
            readonly PENDING: "PENDING";
        }>>>;
        foodItem: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            id: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
    drinkItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        price: z.ZodOptional<z.ZodNumber>;
        discount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        itemId: z.ZodOptional<z.ZodNumber>;
        finalPrice: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        specialRequest: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allergies: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<{
            readonly GLUTEN: "GLUTEN";
            readonly DAIRY: "DAIRY";
            readonly EGG: "EGG";
            readonly PEANUT: "PEANUT";
            readonly TREENUT: "TREENUT";
            readonly FISH: "FISH";
            readonly SHELLFISH: "SHELLFISH";
            readonly SOY: "SOY";
            readonly SESAME: "SESAME";
            readonly CELERY: "CELERY";
            readonly MUSTARD: "MUSTARD";
            readonly LUPIN: "LUPIN";
            readonly SULPHITES: "SULPHITES";
            readonly MOLLUSCS: "MOLLUSCS";
        }>>>>;
        printed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        fired: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        guestNumber: z.ZodOptional<z.ZodNumber>;
        paymentStatus: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            readonly NONE: "NONE";
            readonly PAID: "PAID";
            readonly REFUNDED: "REFUNDED";
            readonly CANCELED: "CANCELLED";
            readonly PENDING: "PENDING";
        }>>>;
        drinkItem: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            id: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const OrderMeta: z.ZodObject<{
    statuses: z.ZodArray<z.ZodEnum<{
        readonly AWAITING: "AWAITING";
        readonly RECEIVED: "RECEIVED";
        readonly SERVED: "SERVED";
        readonly CANCELED: "CANCELED";
        readonly DISPUTED: "DISPUTED";
        readonly READY_TO_PAY: "READY_TO_PAY";
        readonly COMPLETED: "COMPLETED";
    }>>;
    allergies: z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>;
    maxGuests: z.ZodNumber;
    prices: z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
    }, z.core.$strip>;
    dates: z.ZodObject<{
        min: z.ZodString;
        max: z.ZodString;
    }, z.core.$strip>;
    tableNumbers: z.ZodArray<z.ZodCoercedNumber<unknown>>;
    filtered: z.ZodObject<{
        maxGuests: z.ZodNumber;
        prices: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, z.core.$strip>;
        dates: z.ZodObject<{
            min: z.ZodString;
            max: z.ZodString;
        }, z.core.$strip>;
        tableNumbers: z.ZodArray<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
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
export type OrderItemIdsDTO = z.infer<typeof OrderItemIdsSchema>;
export type OrderItemsIds = OrderItemIdsDTO;
export type PrepareItemsDTO = z.infer<typeof PrepareItems>;
export type OrderItemExt = z.infer<typeof orderItemSchema>;
export type OrderItemRawDTO = z.infer<typeof orderItemRawSchema>;
export type OrderUpdateItems = z.infer<typeof OrderUpdateItemsSchema>;
export type OrderMetaDTO = z.infer<typeof OrderMeta>;
export type OrderSearchListResult = {
    orders: Pick<OrderFullSingleDTO, 'id' | 'status' | 'server' | 'tableNumber' | 'guestsCount' | 'orderTime' | 'updatedAt' | 'completionTime' | 'allergies' | 'comments' | 'totalAmount' | 'discount' | 'tip'>[];
    priceRange: {
        min: number;
        max: number;
    };
    dateRange: {
        min: string;
        max: string;
    };
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
};
export {};
//# sourceMappingURL=orders.dto.d.ts.map