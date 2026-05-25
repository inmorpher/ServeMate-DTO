"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../src/dto/enums");
const items_dto_1 = require("../src/dto/items.dto");
const test_setup_1 = require("../test-setup");
describe('Item DTOs', () => {
    describe('BaseItem Schema', () => {
        it('should handle string input for ingredients', () => {
            const stringIngredients = {
                id: 1,
                name: 'Test Item',
                description: 'Test description',
                price: 10.0,
                ingredients: 'Tomato, Cheese, Basil',
            };
            const parsed = items_dto_1.baseItemSchema.parse(stringIngredients);
            expect(parsed.ingredients).toEqual(['Tomato', 'Cheese', 'Basil']);
        });
        it('should properly format ingredient names', () => {
            const mixedCaseIngredients = {
                id: 1,
                name: 'Test Item',
                description: 'Test description',
                price: 10.0,
                ingredients: 'TOMATO, cheese, BasIL',
            };
            const parsed = items_dto_1.baseItemSchema.parse(mixedCaseIngredients);
            expect(parsed.ingredients).toEqual(['Tomato', 'Cheese', 'Basil']);
        });
        it('should handle non-string ingredients input', () => {
            const itemWithArrayIngredients = {
                id: 1,
                name: 'Test Item',
                description: 'Test description',
                price: 10.0,
                ingredients: ['Tomato', 'Cheese', 'Basil'],
            };
            const parsed = items_dto_1.baseItemSchema.parse(itemWithArrayIngredients);
            expect(parsed.ingredients).toEqual(['Tomato', 'Cheese', 'Basil']);
        });
    });
    describe('DrinkItem Schema', () => {
        it('should validate a valid drink item', () => {
            const validDrink = {
                id: 1,
                name: 'Red Wine',
                description: 'Fine red wine',
                price: 25.99,
                isAvailable: true,
                category: enums_1.DrinkCategory.WINE,
                volume: 175,
                alcoholPercentage: 13.5,
                isCarbonated: false,
                tempriture: enums_1.DrinkTemp.ROOM,
                ingredients: ['Wine'],
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                items_dto_1.drinkItemSchema.parse(validDrink);
            });
        });
        it('should handle string inputs for enums', () => {
            const stringEnums = {
                id: 1,
                name: 'Sprite',
                description: 'Carbonated drink',
                price: 2.99,
                isAvailable: true,
                category: 'SODA',
                volume: 330,
                alcoholPercentage: 0,
                isCarbonated: true,
                tempriture: 'COLD',
                ingredients: ['Carbonated water', 'Sugar'],
            };
            const parsed = items_dto_1.drinkItemSchema.parse(stringEnums);
            expect(parsed.category).toBe(enums_1.DrinkCategory.SODA);
            expect(parsed.tempriture).toBe(enums_1.DrinkTemp.COLD);
        });
        it('should reject negative volume', () => {
            const invalidVolume = {
                id: 1,
                name: 'Invalid Drink',
                description: 'Test',
                price: 5.99,
                isAvailable: true,
                category: enums_1.DrinkCategory.BEER,
                volume: -100,
                alcoholPercentage: 0,
                isCarbonated: false,
                tempriture: enums_1.DrinkTemp.COLD,
                ingredients: ['Test'],
            };
            (0, test_setup_1.expectValidationError)(() => {
                items_dto_1.drinkItemSchema.parse(invalidVolume);
            });
        });
    });
    describe('FoodItem Schema', () => {
        it('should validate a valid food item', () => {
            const validFood = {
                id: 1,
                name: 'Veggie Burger',
                description: 'Plant-based burger',
                price: 12.99,
                isAvailable: true,
                category: enums_1.FoodCategory.OTHER,
                type: enums_1.FoodType.OTHER,
                isVegan: true,
                isGlutenFree: false,
                isVegetarian: true,
                allergies: [enums_1.Allergy.PEANUT, enums_1.Allergy.SOY],
                preparationTime: 15,
                spicyLevel: enums_1.SpiceLevel.MEDIUM,
                calories: 450,
                ingredients: ['Veggie patty', 'Lettuce', 'Tomato'],
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                items_dto_1.foodItemSchema.parse(validFood);
            });
        });
        it('should handle string input for allergies', () => {
            const stringAllergies = {
                id: 1,
                name: 'Seafood Pasta',
                description: 'Fresh seafood pasta',
                price: 18.99,
                isAvailable: true,
                category: enums_1.FoodCategory.SEAFOOD,
                type: enums_1.FoodType.MAIN_COURSE,
                isVegan: false,
                isGlutenFree: false,
                isVegetarian: false,
                allergies: 'SHELLFISH,GLUTEN',
                preparationTime: 20,
                spicyLevel: enums_1.SpiceLevel.MILD,
                calories: 600,
                ingredients: ['Pasta', 'Seafood', 'Sauce'],
            };
            const parsed = items_dto_1.foodItemSchema.parse(stringAllergies);
            expect(parsed.allergies).toContain(enums_1.Allergy.SHELLFISH);
            expect(parsed.allergies).toContain(enums_1.Allergy.GLUTEN);
        });
        it('should use default values correctly', () => {
            const minimalFood = {
                id: 1,
                name: 'Simple Dish',
                description: 'Basic dish',
                price: 10.0,
                isAvailable: true,
                category: enums_1.FoodCategory.SOUP,
                type: enums_1.FoodType.APPETIZER,
                ingredients: ['Ingredients'],
            };
            const parsed = items_dto_1.foodItemSchema.parse(minimalFood);
            expect(parsed.isVegan).toBe(false);
            expect(parsed.isGlutenFree).toBe(false);
            expect(parsed.isVegetarian).toBe(false);
            expect(parsed.allergies).toEqual([]);
            expect(parsed.preparationTime).toBe(0);
            expect(parsed.spicyLevel).toBe(enums_1.SpiceLevel.NOT_SPICY);
        });
    });
    describe('Create and Update Schemas', () => {
        it('should validate drink item creation without id', () => {
            const newDrink = {
                name: 'New Cocktail',
                description: 'Fresh cocktail',
                price: 9.99,
                isAvailable: true,
                category: enums_1.DrinkCategory.ALCOHOLIC,
                volume: 200,
                alcoholPercentage: 8,
                isCarbonated: false,
                tempriture: enums_1.DrinkTemp.COLD,
                ingredients: ['Alcohol', 'Mixer'],
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                items_dto_1.createDrinkItemSchema.parse(newDrink);
            });
        });
        it('should validate partial drink updates', () => {
            const update = {
                price: 11.99,
                isAvailable: false,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                items_dto_1.updateDrinkItemSchema.parse(update);
            });
        });
        it('should validate food item creation without id', () => {
            const newFood = {
                name: 'New Salad',
                description: 'Fresh salad',
                price: 8.99,
                isAvailable: true,
                category: enums_1.FoodCategory.SALAD,
                type: enums_1.FoodType.APPETIZER,
                isVegan: true,
                allergies: [enums_1.Allergy.DAIRY],
                ingredients: ['Lettuce', 'Tomatoes', 'Dressing'],
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                items_dto_1.createFoodItemSchema.parse(newFood);
            });
        });
        it('should validate partial food updates', () => {
            const update = {
                price: 9.99,
                spicyLevel: enums_1.SpiceLevel.HOT,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                items_dto_1.updateFoodItemSchema.parse(update);
            });
        });
    });
});
