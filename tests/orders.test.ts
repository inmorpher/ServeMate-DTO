import { Allergy, OrderState, PaymentState } from '../src/dto/enums';
import {
	OrderCreateSchema,
	orderItemSchema,
	OrderSchema,
	OrderSearchSchema,
	OrderUpdateItemsSchema,
	OrderUpdateProps,
	PrepareItems,
} from '../src/dto/orders.dto';
import { expectNoValidationError, expectValidationError } from '../test-setup';

describe('Order DTOs', () => {
	describe('OrderSchema', () => {
		it('should validate a valid order', () => {
			const validOrder = {
				id: '1',
				tableNumber: '5',
				orderNumber: '101',
				guestsCount: '4',
				serverId: '10',
				status: OrderState.RECEIVED,
				orderTime: new Date(),
				updatedAt: new Date(),
				completionTime: null,
				totalAmount: 46,
				comments: 'No spicy food',
			};

			expectNoValidationError(() => {
				OrderSchema.parse(validOrder);
			});
		});

		it('should validate order without optional fields', () => {
			const minimalOrder = {
				id: '1',
				tableNumber: '5',
				orderNumber: '102',
				guestsCount: '2',
				serverId: '10',
				status: OrderState.RECEIVED,
				orderTime: new Date(),
				updatedAt: new Date(),
				totalAmount: 1,
			};

			expectNoValidationError(() => {
				OrderSchema.parse(minimalOrder);
			});
		});

		it('should reject negative total amount', () => {
			const invalidAmount = {
				id: '1',
				tableNumber: '5',
				orderNumber: '103',
				guestsCount: '2',
				serverId: '10',
				status: OrderState.RECEIVED,
				orderTime: new Date(),
				updatedAt: new Date(),
				totalAmount: -46,
			};

			expectValidationError(() => {
				OrderSchema.parse(invalidAmount);
			});
		});
	});

	describe('OrderItemSchema', () => {
		it('should validate a valid order item', () => {
			const validItem = {
				id: 1,
				itemId: 100,
				quantity: 1,
				specialRequest: 'No onions',
				price: 15.99,
				guestNumber: 1,
				allergies: [Allergy.CELERY],
				discount: 0,
				finalPrice: 15.99,
				printed: false,
				fired: false,
				paymentStatus: PaymentState.NONE,
			};

			expectNoValidationError(() => {
				orderItemSchema.parse(validItem);
			});
		});

		it('should reject negative price', () => {
			const invalidPrice = {
				id: 1,
				itemId: 100,
				quantity: 1,
				price: -15.99,
				specialRequest: '',
				guestNumber: 1,
				allergies: [Allergy.NONE],
				discount: 0,
				finalPrice: -15.99,
				printed: false,
				fired: false,
				paymentStatus: PaymentState.NONE,
			};

			expectValidationError(() => {
				orderItemSchema.parse(invalidPrice);
			});
		});
	});

	describe('OrderSearchSchema', () => {
		it('should validate valid search criteria', () => {
			const validSearch = {
				tableNumber: '5',
				serverId: '10',
				status: OrderState.COMPLETED,
				page: '1',
				pageSize: '20',
				sortBy: 'id',
				sortOrder: 'asc',
			};

			expectNoValidationError(() => {
				OrderSearchSchema.parse(validSearch);
			});
		});

		it('should transform string values to appropriate types', () => {
			const stringValues = {
				tableNumber: '5',
				serverId: '10',
			};

			const parsed = OrderSearchSchema.parse(stringValues);
			expect(typeof parsed.tableNumber).toBe('number');
			expect(parsed.serverId).toBeDefined();
		});

		it('should handle empty search criteria', () => {
			const emptyCriteria = {};

			expectNoValidationError(() => {
				OrderSearchSchema.parse(emptyCriteria);
			});
		});

		it('should reject invalid page numbers', () => {
			const invalidPage = {
				page: '0',
				pageSize: '20',
			};

			expectValidationError(() => {
				OrderSearchSchema.parse(invalidPage);
			});
		});

		it('should handle allergy array from string', () => {
			const search = {
				allergies: 'GLUTEN,DAIRY',
			};
			const parsed = OrderSearchSchema.parse(search);
			expect(parsed.allergies).toEqual(['GLUTEN', 'DAIRY']);
		});

		it('should handle allergy array from array', () => {
			const search = {
				allergies: ['GLUTEN', 'DAIRY'],
			};
			const parsed = OrderSearchSchema.parse(search);
			expect(parsed.allergies).toEqual(['GLUTEN', 'DAIRY']);
		});
	});

	describe('OrderUpdateProps', () => {
		it('should validate partial order updates', () => {
			const validUpdate = {
				status: OrderState.COMPLETED,
				comments: 'Updated comment',
			};

			expectNoValidationError(() => {
				OrderUpdateProps.parse(validUpdate);
			});
		});

		it('should reject empty update object', () => {
			const emptyUpdate = {};

			expectValidationError(() => {
				OrderUpdateProps.parse(emptyUpdate);
			});
		});
	});

	describe('OrderCreateSchema', () => {
		it('should reject order with no items', () => {
			const noItemsOrder = {
				tableNumber: 1,
				guestsCount: 1,
				serverId: 1,
				foodItems: [],
				drinkItems: [],
			};
			expectValidationError(() => {
				OrderCreateSchema.parse(noItemsOrder);
			});
		});

		it('should pass with food items', () => {
			const order = {
				tableNumber: 1,
				guestsCount: 1,
				serverId: 1,
				foodItems: [
					{
						guestNumber: 1,
						items: [
							{
								price: 1,
								itemId: 1,
								specialRequest: null,
							},
						],
					},
				],
			};
			expectNoValidationError(() => {
				OrderCreateSchema.parse(order);
			});
		});
	});

	describe('OrderUpdateItemsSchema', () => {
		it('should reject update with no items', () => {
			const noItemsUpdate = {
				foodItems: [],
				drinkItems: [],
			};
			expectValidationError(() => {
				OrderUpdateItemsSchema.parse(noItemsUpdate);
			});
		});

		it('should pass with drink items', () => {
			const update = {
				drinkItems: [
					{
						guestNumber: 1,
						items: [
							{
								price: 1,
								itemId: 1,
								specialRequest: null,
							},
						],
					},
				],
			};
			expectNoValidationError(() => {
				OrderUpdateItemsSchema.parse(update);
			});
		});
	});

	describe('PrepareItems', () => {
		it('should validate food and drink items preparation', () => {
			const prepItems = {
				foodItems: [
					{
						id: 1,
						price: 10.99,
						foodItem: {
							name: 'Burger',
							id: 1,
						},
					},
				],
				drinkItems: [
					{
						id: 2,
						price: 5.99,
						drinkItem: {
							name: 'Cola',
							id: 2,
						},
					},
				],
			};

			expectNoValidationError(() => {
				PrepareItems.parse(prepItems);
			});
		});

		it('should handle empty arrays', () => {
			const emptyPrep = {
				foodItems: [],
				drinkItems: [],
			};

			expectNoValidationError(() => {
				PrepareItems.parse(emptyPrep);
			});
		});
	});
});
