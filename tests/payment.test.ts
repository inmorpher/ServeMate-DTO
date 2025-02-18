import { PaymentMethod, PaymentState } from '../src/dto/enums';
import { PaymentSchema, PaymentSearchSchema, PaymentSortOptions } from '../src/dto/payment.dto';
import { expectNoValidationError, expectValidationError } from '../test-setup';

describe('Payment DTOs', () => {
	describe('PaymentSchema', () => {
		it('should validate a valid payment', () => {
			const validPayment = {
				id: 1,
				amount: 50.0,
				tax: 5.0,
				tip: 7.5,
				serviceCharge: 2.5,
				paymentType: PaymentMethod.CREDIT_CARD,
				createdAt: new Date(),
				completedAt: new Date(),
				orderId: 1,
				status: PaymentState.PAID,
			};

			expectNoValidationError(() => {
				PaymentSchema.parse(validPayment);
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
				status: PaymentState.CANCELLED,
			};

			const parsed = PaymentSchema.parse(stringPaymentType);
			expect(parsed.paymentType).toBe(PaymentMethod.CASH);
		});

		it('should reject negative amounts', () => {
			const negativeAmount = {
				id: 1,
				amount: -50.0,
				tax: 5.0,
				tip: 7.5,
				serviceCharge: 2.5,
				paymentType: PaymentMethod.CREDIT_CARD,
				createdAt: new Date(),
				completedAt: new Date(),
				orderId: 1,
				status: PaymentState.PAID,
			};

			expectValidationError(() => {
				PaymentSchema.parse(negativeAmount);
			});
		});

		it('should use default values for optional fields', () => {
			const minimalPayment = {
				id: 1,
				amount: 50.0,
				paymentType: PaymentMethod.CREDIT_CARD,
				orderId: 1,
				status: PaymentState.PENDING,
				createdAt: new Date(),
				completedAt: new Date(),
			};

			const parsed = PaymentSchema.parse(minimalPayment);
			expect(parsed.tax).toBe(0);
			expect(parsed.tip).toBe(0);
			expect(parsed.serviceCharge).toBe(0);
		});

		it('should validate payment dates', () => {
			const payment = {
				id: 1,
				amount: 50.0,
				paymentType: PaymentMethod.CREDIT_CARD,
				createdAt: new Date(),
				completedAt: 'invalid-date', // Invalid date
				orderId: 1,
				status: PaymentState.PAID,
			};

			expectValidationError(() => {
				PaymentSchema.parse(payment);
			});
		});

		it('should validate payment status transitions', () => {
			const validStatusTransition = {
				id: 1,
				amount: 50.0,
				paymentType: PaymentMethod.CREDIT_CARD,
				orderId: 1,
				status: PaymentState.PENDING,
				createdAt: new Date(),
				completedAt: new Date(),
			};

			const parsed = PaymentSchema.parse(validStatusTransition);
			expect(parsed.status).toBe(PaymentState.PENDING);

			const updatedPayment = {
				...parsed,
				status: PaymentState.PAID,
				completedAt: new Date(),
			};

			expectNoValidationError(() => {
				PaymentSchema.parse(updatedPayment);
			});
		});

		it('should validate sorting options', () => {
			expect(PaymentSortOptions.ID).toBe('id');
			expect(PaymentSortOptions.AMOUNT).toBe('amount');
			expect(PaymentSortOptions.PAYMENT_TYPE).toBe('paymentType');
			expect(PaymentSortOptions.CREATED_AT).toBe('createdAt');
			expect(PaymentSortOptions.COMPLETED_AT).toBe('completedAt');
			expect(PaymentSortOptions.ORDER_ID).toBe('orderId');
		});
	});

	describe('PaymentSearchSchema', () => {
		it('should validate search criteria with default values', () => {
			const searchCriteria = {
				amount: 100,
				paymentType: PaymentMethod.CREDIT_CARD,
			};

			const parsed = PaymentSearchSchema.parse(searchCriteria);
			expect(parsed.page).toBe(1);
			expect(parsed.pageSize).toBe(10);
			expect(parsed.sortBy).toBe(PaymentSortOptions.ID);
			expect(parsed.sortOrder).toBe('asc');
		});

		it('should validate complete search criteria', () => {
			const searchCriteria = {
				amount: 100,
				paymentType: PaymentMethod.CREDIT_CARD,
				page: 2,
				pageSize: 20,
				sortBy: PaymentSortOptions.AMOUNT,
				sortOrder: 'desc',
			};

			expectNoValidationError(() => {
				PaymentSearchSchema.parse(searchCriteria);
			});
		});

		it('should reject invalid pageSize', () => {
			const invalidCriteria = {
				pageSize: 101, // max is 100
			};

			expectValidationError(() => {
				PaymentSearchSchema.parse(invalidCriteria);
			});
		});
	});
});
