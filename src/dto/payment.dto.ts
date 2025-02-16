import { z } from 'zod';
import { PaymentMethod, PaymentState } from './enums';

export const PaymentSortOptions = {
	ID: 'id',
	AMOUNT: 'amount',
	PAYMENT_TYPE: 'paymentType',
	CREATED_AT: 'createdAt',
	COMPLETED_AT: 'completedAt',
	ORDER_ID: 'orderId',
} as const;

export const PaymentSchema = z.object({
	id: z.coerce.number().int().positive(),
	amount: z.coerce.number().positive(),
	tax: z.number().default(0),
	tip: z.number().default(0),
	serviceCharge: z.number().default(0),
	paymentType: z.preprocess(
		(type) => (typeof type === 'string' ? type.toUpperCase() : type),
		z.nativeEnum(PaymentMethod)
	),
	createdAt: z.date().nullable(),
	completedAt: z.date().nullable(),
	orderId: z.coerce.number().int().positive(),
	status: z.preprocess(
		(val) => (typeof val === 'string' ? val.toUpperCase() : val),
		z.nativeEnum(PaymentState)
	),
});

export const PartialPaymentSchema = PaymentSchema.partial();

export const PaymentSearchSchema = PartialPaymentSchema.extend({
	page: z.coerce.number().int().positive().optional().default(1),
	pageSize: z.coerce.number().int().positive().max(100).optional().default(10),
	sortBy: z
		.enum(Object.values(PaymentSortOptions) as [string, ...string[]])
		.default(PaymentSortOptions.ID),
	sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const RefundSchema = z.object({
	reason: z.string().min(3).max(255),
	createdAt: z
		.date()
		.optional()
		.default(() => new Date()),
});

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
