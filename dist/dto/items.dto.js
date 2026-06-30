"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drinkItemsListSchema = exports.foodItemsListSchema = exports.searchDrinkItemsSchema = exports.searchFoodItemsSchema = exports.updateFoodItemSchema = exports.updateDrinkItemSchema = exports.createFoodItemSchema = exports.createDrinkItemSchema = exports.foodItemSchema = exports.drinkItemSchema = exports.baseItemSchema = exports.DrinkItemSortOptions = exports.FoodItemSortOptions = exports.ItemSortOptions = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
const global_1 = require("./global");
exports.ItemSortOptions = {
    ID: 'id',
    NAME: 'name',
    PRICE: 'price',
    POPULARITY: 'popularityScore',
    INGREDIENTS: 'ingredients',
    IS_AVAILABLE: 'isAvailable',
    POPULARITY_SCORE: 'popularityScore',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
};
exports.FoodItemSortOptions = {
    ...exports.ItemSortOptions,
    TYPE: 'type',
    CATEGORY: 'category',
    ALLERGIES: 'allergies',
    PREPARATION_TIME: 'preparationTime',
    SPICY_LEVEL: 'spicyLevel',
    CALORIES: 'calories',
    IS_VEGAN: 'isVegan',
    IS_GLUTEN_FREE: 'isGlutenFree',
};
exports.DrinkItemSortOptions = {
    ...exports.ItemSortOptions,
    CATEGORY: 'category',
    VOLUME: 'volume',
    ALCOHOL_PERCENTAGE: 'alcoholPercentage',
    IS_CARBONATED: 'isCarbonated',
    TEMPRITURE: 'tempriture',
};
//type: FoodType,
exports.baseItemSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
    name: zod_1.z.string().min(3),
    price: zod_1.z.number().nonnegative(),
    description: zod_1.z.string().min(3),
    ingredients: zod_1.z.preprocess((val) => {
        if (typeof val === 'string') {
            return val
                .split(',')
                .map((item) => item.trim())
                .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLocaleLowerCase());
        }
        return val;
    }, zod_1.z.array(zod_1.z.string()).default([])),
    isAvailable: zod_1.z.boolean().default(true),
    popularityScore: zod_1.z.number().nonnegative().default(0),
    image: zod_1.z.string().nullable().default(null),
});
exports.drinkItemSchema = exports.baseItemSchema.extend({
    category: zod_1.z.preprocess((val) => (typeof val === 'string' ? val.toUpperCase() : val), zod_1.z.nativeEnum(enums_1.DrinkCategory)),
    volume: zod_1.z.number().nonnegative(),
    alcoholPercentage: zod_1.z.number().nonnegative().nullable(),
    isCarbonated: zod_1.z.preprocess((val) => {
        if (typeof val === 'string') {
            return val.toLowerCase() === 'true';
        }
        return val;
    }, zod_1.z.boolean()),
    tempriture: zod_1.z.preprocess((val) => (typeof val === 'string' ? val.toUpperCase() : val), zod_1.z.nativeEnum(enums_1.DrinkTemp)),
});
exports.foodItemSchema = exports.baseItemSchema.extend({
    category: zod_1.z.preprocess((val) => (typeof val === 'string' ? val.toUpperCase() : val), zod_1.z.nativeEnum(enums_1.FoodCategory)),
    type: zod_1.z.nativeEnum(enums_1.FoodType),
    isVegan: zod_1.z.boolean().default(false),
    isGlutenFree: zod_1.z.boolean().default(false),
    isVegetarian: zod_1.z.boolean().default(false),
    allergies: zod_1.z.preprocess((val) => {
        if (typeof val === 'string') {
            return val.split(',').map((item) => item.trim().toUpperCase());
        }
        return val;
    }, zod_1.z.array(zod_1.z.nativeEnum(enums_1.Allergy)).default([])),
    preparationTime: zod_1.z.number().nonnegative().default(0),
    spicyLevel: zod_1.z.nativeEnum(enums_1.SpiceLevel).default(enums_1.SpiceLevel.NOT_SPICY),
    calories: zod_1.z.number().nullable().default(0),
});
exports.createDrinkItemSchema = exports.drinkItemSchema.omit({
    id: true,
});
exports.createFoodItemSchema = exports.foodItemSchema.omit({
    id: true,
});
exports.updateDrinkItemSchema = exports.drinkItemSchema
    .omit({
    id: true,
})
    .partial();
exports.updateFoodItemSchema = exports.foodItemSchema.omit({ id: true }).partial();
exports.searchFoodItemsSchema = exports.foodItemSchema.partial().extend({
    ...global_1.searchCriteriaSchema.shape,
    sortBy: zod_1.z.nativeEnum(exports.FoodItemSortOptions).optional().default(exports.FoodItemSortOptions.ID),
});
exports.searchDrinkItemsSchema = exports.drinkItemSchema.partial().extend({
    ...global_1.searchCriteriaSchema.shape,
    sortBy: zod_1.z.nativeEnum(exports.DrinkItemSortOptions).optional().default(exports.DrinkItemSortOptions.ID),
});
/**
 * Schema for a list of food items.
 *
 * This schema extends the `listPropsSchema` to include an array of food items.
 * Each food item in the array must conform to the `foodItemSchema`.
 *
 * @constant
 * @type {ZodSchema}
 *
 * @example
 * const validData = {
 *   items: [
 *     { name: "Apple", calories: 95 },
 *     { name: "Banana", calories: 105 }
 *   ]
 * };
 *
 * foodItemsListSchema.parse(validData); // This will pass validation
 *
 * @see {@link listPropsSchema} for the base schema properties.
 * @see {@link foodItemSchema} for the individual food item schema.
 */
exports.foodItemsListSchema = global_1.listPropsSchema.extend({
    items: zod_1.z.array(exports.foodItemSchema),
});
/**
 * Schema for a list of drink items.
 *
 * This schema extends the `listPropsSchema` to include an array of drink items.
 * Each drink item in the array must conform to the `drinkItemSchema`.
 *
 * @constant
 * @type {ZodSchema}
 *
 * @example
 * const validData = {
 *   items: [
 *     { name: "Coca Cola", volume: 330 },
 *     { name: "Fanta", volume: 330 }
 *   ]
 * };
 *
 * drinkItemsListSchema.parse(validData); // This will pass validation
 *
 * @see {@link listPropsSchema} for the base schema properties.
 * @see {@link drinkItemSchema} for the individual drink item schema.
 */
exports.drinkItemsListSchema = global_1.listPropsSchema.extend({
    items: zod_1.z.array(exports.drinkItemSchema),
});
//# sourceMappingURL=items.dto.js.map