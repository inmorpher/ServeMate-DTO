import { z } from 'zod';
import { PaymentState } from './enums';
export declare const PaymentSortOptions: {
    readonly ID: "id";
    readonly AMOUNT: "amount";
    readonly PAYMENT_TYPE: "paymentType";
    readonly CREATED_AT: "createdAt";
    readonly COMPLETED_AT: "completedAt";
    readonly ORDER_ID: "orderId";
};
export declare const PaymentSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    amount: z.ZodCoercedNumber<unknown>;
    tax: z.ZodDefault<z.ZodNumber>;
    tip: z.ZodDefault<z.ZodNumber>;
    serviceCharge: z.ZodDefault<z.ZodNumber>;
    paymentType: z.ZodPreprocess<z.ZodEnum<{
        readonly CASH: "CASH";
        readonly CREDIT_CARD: "CREDIT_CARD";
        readonly DEBIT_CARD: "DEBIT_CARD";
    }>>;
    createdAt: z.ZodNullable<z.ZodDate>;
    completedAt: z.ZodNullable<z.ZodDate>;
    orderId: z.ZodCoercedNumber<unknown>;
    status: z.ZodPreprocess<z.ZodEnum<{
        readonly NONE: "NONE";
        readonly PAID: "PAID";
        readonly REFUNDED: "REFUNDED";
        readonly CANCELLED: "CANCELLED";
        readonly PENDING: "PENDING";
    }>>;
}, z.core.$strip>;
export declare const PartialPaymentSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    tax: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    tip: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    serviceCharge: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    paymentType: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly CASH: "CASH";
        readonly CREDIT_CARD: "CREDIT_CARD";
        readonly DEBIT_CARD: "DEBIT_CARD";
    }>>>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    orderId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly NONE: "NONE";
        readonly PAID: "PAID";
        readonly REFUNDED: "REFUNDED";
        readonly CANCELLED: "CANCELLED";
        readonly PENDING: "PENDING";
    }>>>;
}, z.core.$strip>;
export declare const PaymentSearchSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    tax: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    tip: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    serviceCharge: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    paymentType: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly CASH: "CASH";
        readonly CREDIT_CARD: "CREDIT_CARD";
        readonly DEBIT_CARD: "DEBIT_CARD";
    }>>>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    orderId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly NONE: "NONE";
        readonly PAID: "PAID";
        readonly REFUNDED: "REFUNDED";
        readonly CANCELLED: "CANCELLED";
        readonly PENDING: "PENDING";
    }>>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        [x: string]: string;
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const RefundSchema: z.ZodObject<{
    reason: z.ZodString;
    createdAt: z.ZodDefault<z.ZodOptional<z.ZodDate>>;
}, z.core.$strip>;
export type PaymentDTO = z.infer<typeof PaymentSchema>;
export type PaymentListDTO = {
    payments: PaymentDTO[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
};
export type PaymentStatusType = (typeof PaymentState)[keyof typeof PaymentState];
export type PaymentStatusDTO = PaymentState;
export type PaymentSearchCriteria = z.infer<typeof PaymentSearchSchema>;
export type RefundDTO = z.infer<typeof RefundSchema>;
//# sourceMappingURL=payment.dto.d.ts.map