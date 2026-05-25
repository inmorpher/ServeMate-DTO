"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../src/dto/enums");
const orders_dto_1 = require("../src/dto/orders.dto");
const test_setup_1 = require("../test-setup");
describe('Order DTOs', () => {
    describe('OrderSchema', () => {
        it('should validate a valid order', () => {
            const validOrder = {
                id: '1',
                tableNumber: '5',
                orderNumber: '101',
                guestsCount: '4',
                serverId: '10',
                status: enums_1.OrderState.RECEIVED,
                orderTime: new Date(),
                updatedAt: new Date(),
                completionTime: null,
                totalAmount: 46,
                comments: 'No spicy food',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.OrderSchema.parse(validOrder);
            });
        });
        it('should validate order without optional fields', () => {
            const minimalOrder = {
                id: '1',
                tableNumber: '5',
                orderNumber: '102',
                guestsCount: '2',
                serverId: '10',
                status: enums_1.OrderState.RECEIVED,
                orderTime: new Date(),
                updatedAt: new Date(),
                totalAmount: 1,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.OrderSchema.parse(minimalOrder);
            });
        });
        it('should reject negative total amount', () => {
            const invalidAmount = {
                id: '1',
                tableNumber: '5',
                orderNumber: '103',
                guestsCount: '2',
                serverId: '10',
                status: enums_1.OrderState.RECEIVED,
                orderTime: new Date(),
                updatedAt: new Date(),
                totalAmount: -46,
            };
            (0, test_setup_1.expectValidationError)(() => {
                orders_dto_1.OrderSchema.parse(invalidAmount);
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
                allergies: [enums_1.Allergy.CELERY],
                discount: 0,
                finalPrice: 15.99,
                printed: false,
                fired: false,
                paymentStatus: enums_1.PaymentState.NONE,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.orderItemSchema.parse(validItem);
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
                allergies: [enums_1.Allergy.CELERY],
                discount: 0,
                finalPrice: -15.99,
                printed: false,
                fired: false,
                paymentStatus: enums_1.PaymentState.NONE,
            };
            (0, test_setup_1.expectValidationError)(() => {
                orders_dto_1.orderItemSchema.parse(invalidPrice);
            });
        });
    });
    describe('OrderSearchSchema', () => {
        it('should validate valid search criteria', () => {
            const validSearch = {
                tableNumber: '5',
                serverId: '10',
                status: enums_1.OrderState.COMPLETED,
                page: '1',
                pageSize: '20',
                sortBy: 'id',
                sortOrder: 'asc',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.OrderSearchSchema.parse(validSearch);
            });
        });
        it('should transform string values to appropriate types', () => {
            const stringValues = {
                tableNumbers: ['1', '2', '3'],
                serverId: '10',
            };
            const parsed = orders_dto_1.OrderSearchSchema.parse(stringValues);
            expect(Array.isArray(parsed.tableNumbers)).toBe(true);
            expect(parsed.serverId).toBeDefined();
        });
        it('should handle empty search criteria', () => {
            const emptyCriteria = {};
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.OrderSearchSchema.parse(emptyCriteria);
            });
        });
        it('should reject invalid page numbers', () => {
            const invalidPage = {
                page: '0',
                pageSize: '20',
            };
            (0, test_setup_1.expectValidationError)(() => {
                orders_dto_1.OrderSearchSchema.parse(invalidPage);
            });
        });
        it('should handle allergy array from string', () => {
            const search = {
                allergies: 'GLUTEN,DAIRY',
            };
            const parsed = orders_dto_1.OrderSearchSchema.parse(search);
            expect(parsed.allergies).toEqual(['GLUTEN', 'DAIRY']);
        });
        it('should handle allergy array from array', () => {
            const search = {
                allergies: ['GLUTEN', 'DAIRY'],
            };
            const parsed = orders_dto_1.OrderSearchSchema.parse(search);
            expect(parsed.allergies).toEqual(['GLUTEN', 'DAIRY']);
        });
    });
    describe('OrderUpdateProps', () => {
        it('should validate partial order updates', () => {
            const validUpdate = {
                status: enums_1.OrderState.COMPLETED,
                comments: 'Updated comment',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.OrderUpdateProps.parse(validUpdate);
            });
        });
        it('should reject empty update object', () => {
            const emptyUpdate = {};
            (0, test_setup_1.expectValidationError)(() => {
                orders_dto_1.OrderUpdateProps.parse(emptyUpdate);
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
            (0, test_setup_1.expectValidationError)(() => {
                orders_dto_1.OrderCreateSchema.parse(noItemsOrder);
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
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.OrderCreateSchema.parse(order);
            });
        });
    });
    describe('OrderUpdateItemsSchema', () => {
        it('should reject update with no items', () => {
            const noItemsUpdate = {
                foodItems: [],
                drinkItems: [],
            };
            (0, test_setup_1.expectValidationError)(() => {
                orders_dto_1.OrderUpdateItemsSchema.parse(noItemsUpdate);
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
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.OrderUpdateItemsSchema.parse(update);
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
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.PrepareItems.parse(prepItems);
            });
        });
        it('should handle empty arrays', () => {
            const emptyPrep = {
                foodItems: [],
                drinkItems: [],
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                orders_dto_1.PrepareItems.parse(emptyPrep);
            });
        });
    });
});
