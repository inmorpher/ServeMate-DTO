"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../src/dto/enums");
const payment_dto_1 = require("../src/dto/payment.dto");
const test_setup_1 = require("../test-setup");
describe('Payment DTOs', () => {
    describe('PaymentSchema', () => {
        it('should validate a valid payment', () => {
            const validPayment = {
                id: 1,
                amount: 50.0,
                tax: 5.0,
                tip: 7.5,
                serviceCharge: 2.5,
                paymentType: enums_1.PaymentMethod.CREDIT_CARD,
                createdAt: new Date(),
                completedAt: new Date(),
                orderId: 1,
                status: enums_1.PaymentState.PAID,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                payment_dto_1.PaymentSchema.parse(validPayment);
            });
        });
        it('should handle string input for payment type', () => {
            const stringPaymentType = {
                id: 1,
                amount: 50.0,
                tax: 5.0,
                tip: 7.5,
                serviceCharge: 2.5,
                paymentType: 'CASH',
                createdAt: new Date(),
                completedAt: new Date(),
                orderId: 1,
                status: enums_1.PaymentState.CANCELLED,
            };
            const parsed = payment_dto_1.PaymentSchema.parse(stringPaymentType);
            expect(parsed.paymentType).toBe(enums_1.PaymentMethod.CASH);
        });
        it('should reject negative amounts', () => {
            const negativeAmount = {
                id: 1,
                amount: -50.0,
                tax: 5.0,
                tip: 7.5,
                serviceCharge: 2.5,
                paymentType: enums_1.PaymentMethod.CREDIT_CARD,
                createdAt: new Date(),
                completedAt: new Date(),
                orderId: 1,
                status: enums_1.PaymentState.PAID,
            };
            (0, test_setup_1.expectValidationError)(() => {
                payment_dto_1.PaymentSchema.parse(negativeAmount);
            });
        });
        it('should use default values for optional fields', () => {
            const minimalPayment = {
                id: 1,
                amount: 50.0,
                paymentType: enums_1.PaymentMethod.CREDIT_CARD,
                orderId: 1,
                status: enums_1.PaymentState.PENDING,
                createdAt: new Date(),
                completedAt: new Date(),
            };
            const parsed = payment_dto_1.PaymentSchema.parse(minimalPayment);
            expect(parsed.tax).toBe(0);
            expect(parsed.tip).toBe(0);
            expect(parsed.serviceCharge).toBe(0);
        });
        it('should validate payment dates', () => {
            const payment = {
                id: 1,
                amount: 50.0,
                paymentType: enums_1.PaymentMethod.CREDIT_CARD,
                createdAt: new Date(),
                completedAt: 'invalid-date', // Invalid date
                orderId: 1,
                status: enums_1.PaymentState.PAID,
            };
            (0, test_setup_1.expectValidationError)(() => {
                payment_dto_1.PaymentSchema.parse(payment);
            });
        });
        it('should validate payment status transitions', () => {
            const validStatusTransition = {
                id: 1,
                amount: 50.0,
                paymentType: enums_1.PaymentMethod.CREDIT_CARD,
                orderId: 1,
                status: enums_1.PaymentState.PENDING,
                createdAt: new Date(),
                completedAt: new Date(),
            };
            const parsed = payment_dto_1.PaymentSchema.parse(validStatusTransition);
            expect(parsed.status).toBe(enums_1.PaymentState.PENDING);
            const updatedPayment = Object.assign(Object.assign({}, parsed), { status: enums_1.PaymentState.PAID, completedAt: new Date() });
            (0, test_setup_1.expectNoValidationError)(() => {
                payment_dto_1.PaymentSchema.parse(updatedPayment);
            });
        });
        it('should validate sorting options', () => {
            expect(payment_dto_1.PaymentSortOptions.ID).toBe('id');
            expect(payment_dto_1.PaymentSortOptions.AMOUNT).toBe('amount');
            expect(payment_dto_1.PaymentSortOptions.PAYMENT_TYPE).toBe('paymentType');
            expect(payment_dto_1.PaymentSortOptions.CREATED_AT).toBe('createdAt');
            expect(payment_dto_1.PaymentSortOptions.COMPLETED_AT).toBe('completedAt');
            expect(payment_dto_1.PaymentSortOptions.ORDER_ID).toBe('orderId');
        });
    });
    describe('PaymentSearchSchema', () => {
        it('should validate search criteria with default values', () => {
            const searchCriteria = {
                amount: 100,
                paymentType: enums_1.PaymentMethod.CREDIT_CARD,
            };
            const parsed = payment_dto_1.PaymentSearchSchema.parse(searchCriteria);
            expect(parsed.page).toBe(1);
            expect(parsed.pageSize).toBe(10);
            expect(parsed.sortBy).toBe(payment_dto_1.PaymentSortOptions.ID);
            expect(parsed.sortOrder).toBe('asc');
        });
        it('should validate complete search criteria', () => {
            const searchCriteria = {
                amount: 100,
                paymentType: enums_1.PaymentMethod.CREDIT_CARD,
                page: 2,
                pageSize: 20,
                sortBy: payment_dto_1.PaymentSortOptions.AMOUNT,
                sortOrder: 'desc',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                payment_dto_1.PaymentSearchSchema.parse(searchCriteria);
            });
        });
        it('should reject invalid pageSize', () => {
            const invalidCriteria = {
                pageSize: 101, // max is 100
            };
            (0, test_setup_1.expectValidationError)(() => {
                payment_dto_1.PaymentSearchSchema.parse(invalidCriteria);
            });
        });
    });
});
