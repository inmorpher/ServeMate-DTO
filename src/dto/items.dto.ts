import { z } from 'zod';
import { Allergy, DrinkCategory, DrinkTemp, FoodCategory, FoodType, SpiceLevel } from './enums';
import { listPropsSchema, searchCriteriaSchema } from './global';

export const ItemSortOptions = {
	ID: 'id',
	NAME: 'name',
	PRICE: 'price',
	POPULARITY: 'popularityScore',
	INGREDIENTS: 'ingredients',
	IS_AVAILABLE: 'isAvailable',
	POPULARITY_SCORE: 'popularityScore',
	CREATED_AT: 'createdAt',
	UPDATED_AT: 'updatedAt',
} as const;

export const FoodItemSortOptions = {
	...ItemSortOptions,
	TYPE: 'type',
	CATEGORY: 'category',
	ALLERGIES: 'allergies',
	PREPARATION_TIME: 'preparationTime',
	SPICY_LEVEL: 'spicyLevel',
	CALORIES: 'calories',
	IS_VEGAN: 'isVegan',
	IS_GLUTEN_FREE: 'isGlutenFree',
} as const;

export const DrinkItemSortOptions = {
	...ItemSortOptions,
	CATEGORY: 'category',
	VOLUME: 'volume',
	ALCOHOL_PERCENTAGE: 'alcoholPercentage',
	IS_CARBONATED: 'isCarbonated',
	TEMPRITURE: 'tempriture',
} as const;

//type: FoodType,
export const baseItemSchema = z.object({
	id: z.coerce.number().int().positive(),
	name: z.string().min(3),
	price: z.number().nonnegative(),
	description: z.string().min(3),
	ingredients: z.preprocess((val) => {
		if (typeof val === 'string') {
			return val
				.split(',')
				.map((item) => item.trim())
				.map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLocaleLowerCase());
		}
		return val;
	}, z.array(z.string()).default([])),
	isAvailable: z.boolean().default(true),
	popularityScore: z.number().nonnegative().default(0),
	image: z.string().nullable().default(null),
});

export const drinkItemSchema = baseItemSchema.extend({
	category: z.preprocess(
		(val) => (typeof val === 'string' ? val.toUpperCase() : val),
		z.nativeEnum(DrinkCategory)
	),
	volume: z.number().nonnegative(),
	alcoholPercentage: z.number().nonnegative().nullable(),
	isCarbonated: z.preprocess((val) => {
		if (typeof val === 'string') {
			return val.toLowerCase() === 'true';
		}
		return val;
	}, z.boolean()),

	tempriture: z.preprocess(
		(val) => (typeof val === 'string' ? val.toUpperCase() : val),
		z.nativeEnum(DrinkTemp)
	),
});

export type DrinkItemDTO = z.infer<typeof drinkItemSchema>;

export const foodItemSchema = baseItemSchema.extend({
	category: z.preprocess(
		(val) => (typeof val === 'string' ? val.toUpperCase() : val),
		z.nativeEnum(FoodCategory)
	),
	type: z.nativeEnum(FoodType),
	isVegan: z.boolean().default(false),
	isGlutenFree: z.boolean().default(false),
	isVegetarian: z.boolean().default(false),
	allergies: z.preprocess((val) => {
		if (typeof val === 'string') {
			return val.split(',').map((item) => item.trim().toUpperCase());
		}
		return val;
	}, z.array(z.nativeEnum(Allergy)).default([])),
	preparationTime: z.number().nonnegative().default(0),
	spicyLevel: z.nativeEnum(SpiceLevel).default(SpiceLevel.NOT_SPICY),
	calories: z.number().nullable().default(0),
});

export type FoodItemDTO = z.infer<typeof foodItemSchema>;

export const createDrinkItemSchema = drinkItemSchema.omit({
	id: true,
});

export type CreateDrinkItemDTO = z.infer<typeof createDrinkItemSchema>;

export const createFoodItemSchema = foodItemSchema.omit({
	id: true,
});

export type CreateFoodItemDTO = z.infer<typeof createFoodItemSchema>;

export const updateDrinkItemSchema = drinkItemSchema
	.omit({
		id: true,
	})
	.partial();

export type UpdateDrinkItemDTO = z.infer<typeof updateDrinkItemSchema>;

export const updateFoodItemSchema = foodItemSchema.omit({ id: true }).partial();

export type UpdateFoodItemDTO = z.infer<typeof updateFoodItemSchema>;

export const searchFoodItemsSchema = foodItemSchema.partial().extend({
	...searchCriteriaSchema.shape,
	sortBy: z.nativeEnum(FoodItemSortOptions).optional().default(FoodItemSortOptions.ID),
});

export type SearchFoodItemsDTO = z.infer<typeof searchFoodItemsSchema>;

export const searchDrinkItemsSchema = drinkItemSchema.partial().extend({
	...searchCriteriaSchema.shape,
	sortBy: z.nativeEnum(DrinkItemSortOptions).optional().default(DrinkItemSortOptions.ID),
});

export type SearchDrinkItemsDTO = z.infer<typeof searchDrinkItemsSchema>;

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
export const foodItemsListSchema = listPropsSchema.extend({
	items: z.array(foodItemSchema),
});

/**
 * Type representing the list of food items.
 *
 * This type is inferred from the `foodItemsListSchema` using Zod.
 *
 * @type {FoodItemsListDTO}
 */
/**
 * Represents the data transfer object (DTO) for a list of food items.
 *
 * @property {typeof foodItemsListSchema} foodItemsListSchema - The schema definition for the food items list.
 */
export type FoodItemsListDTO = z.infer<typeof foodItemsListSchema>;

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
export const drinkItemsListSchema = listPropsSchema.extend({
	items: z.array(drinkItemSchema),
});

/**
 * Type representing the list of drink items.
 *
 * This type is inferred from the `drinkItemsListSchema` using Zod.
 *
 * @type {DrinkItemsListDTO}
 */

export type DrinkItemsListDTO = z.infer<typeof drinkItemsListSchema>;
