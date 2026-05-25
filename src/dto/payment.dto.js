"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundSchema = exports.PaymentSearchSchema = exports.PartialPaymentSchema = exports.PaymentSchema = exports.PaymentSortOptions = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
exports.PaymentSortOptions = {
    ID: 'id',
    AMOUNT: 'amount',
    PAYMENT_TYPE: 'paymentType',
    CREATED_AT: 'createdAt',
    COMPLETED_AT: 'completedAt',
    ORDER_ID: 'orderId',
};
exports.PaymentSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
    amount: zod_1.z.coerce.number().positive(),
    tax: zod_1.z.number().default(0),
    tip: zod_1.z.number().default(0),
    serviceCharge: zod_1.z.number().default(0),
    paymentType: zod_1.z.preprocess((type) => (typeof type === 'string' ? type.toUpperCase() : type), zod_1.z.nativeEnum(enums_1.PaymentMethod)),
    createdAt: zod_1.z.date().nullable(),
    completedAt: zod_1.z.date().nullable(),
    orderId: zod_1.z.coerce.number().int().positive(),
    status: zod_1.z.preprocess((val) => (typeof val === 'string' ? val.toUpperCase() : val), zod_1.z.nativeEnum(enums_1.PaymentState)),
});
exports.PartialPaymentSchema = exports.PaymentSchema.partial();
exports.PaymentSearchSchema = exports.PartialPaymentSchema.extend({
    page: zod_1.z.coerce.number().int().positive().optional().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: zod_1.z
        .enum(Object.values(exports.PaymentSortOptions))
        .default(exports.PaymentSortOptions.ID),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('asc'),
});
exports.RefundSchema = zod_1.z.object({
    reason: zod_1.z.string().min(3).max(255),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
});
