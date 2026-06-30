import { z } from 'zod';
export declare const ItemSortOptions: {
    readonly ID: "id";
    readonly NAME: "name";
    readonly PRICE: "price";
    readonly POPULARITY: "popularityScore";
    readonly INGREDIENTS: "ingredients";
    readonly IS_AVAILABLE: "isAvailable";
    readonly POPULARITY_SCORE: "popularityScore";
    readonly CREATED_AT: "createdAt";
    readonly UPDATED_AT: "updatedAt";
};
export declare const FoodItemSortOptions: {
    readonly TYPE: "type";
    readonly CATEGORY: "category";
    readonly ALLERGIES: "allergies";
    readonly PREPARATION_TIME: "preparationTime";
    readonly SPICY_LEVEL: "spicyLevel";
    readonly CALORIES: "calories";
    readonly IS_VEGAN: "isVegan";
    readonly IS_GLUTEN_FREE: "isGlutenFree";
    readonly ID: "id";
    readonly NAME: "name";
    readonly PRICE: "price";
    readonly POPULARITY: "popularityScore";
    readonly INGREDIENTS: "ingredients";
    readonly IS_AVAILABLE: "isAvailable";
    readonly POPULARITY_SCORE: "popularityScore";
    readonly CREATED_AT: "createdAt";
    readonly UPDATED_AT: "updatedAt";
};
export declare const DrinkItemSortOptions: {
    readonly CATEGORY: "category";
    readonly VOLUME: "volume";
    readonly ALCOHOL_PERCENTAGE: "alcoholPercentage";
    readonly IS_CARBONATED: "isCarbonated";
    readonly TEMPRITURE: "tempriture";
    readonly ID: "id";
    readonly NAME: "name";
    readonly PRICE: "price";
    readonly POPULARITY: "popularityScore";
    readonly INGREDIENTS: "ingredients";
    readonly IS_AVAILABLE: "isAvailable";
    readonly POPULARITY_SCORE: "popularityScore";
    readonly CREATED_AT: "createdAt";
    readonly UPDATED_AT: "updatedAt";
};
export declare const baseItemSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    name: z.ZodString;
    price: z.ZodNumber;
    description: z.ZodString;
    ingredients: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    isAvailable: z.ZodDefault<z.ZodBoolean>;
    popularityScore: z.ZodDefault<z.ZodNumber>;
    image: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const drinkItemSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    name: z.ZodString;
    price: z.ZodNumber;
    description: z.ZodString;
    ingredients: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    isAvailable: z.ZodDefault<z.ZodBoolean>;
    popularityScore: z.ZodDefault<z.ZodNumber>;
    image: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    category: z.ZodPreprocess<z.ZodEnum<{
        readonly BEER: "BEER";
        readonly WINE: "WINE";
        readonly SPIRITS: "SPIRITS";
        readonly COFFEE: "COFFEE";
        readonly TEA: "TEA";
        readonly OTHER: "OTHER";
        readonly SODA: "SODA";
        readonly ALCOHOLIC: "ALCOHOLIC";
        readonly NON_ALCOHOLIC: "NON_ALCOHOLIC";
    }>>;
    volume: z.ZodNumber;
    alcoholPercentage: z.ZodNullable<z.ZodNumber>;
    isCarbonated: z.ZodPreprocess<z.ZodBoolean>;
    tempriture: z.ZodPreprocess<z.ZodEnum<{
        readonly COLD: "COLD";
        readonly ROOM: "ROOM";
        readonly HOT: "HOT";
    }>>;
}, z.core.$strip>;
export type DrinkItemDTO = z.infer<typeof drinkItemSchema>;
export declare const foodItemSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
    name: z.ZodString;
    price: z.ZodNumber;
    description: z.ZodString;
    ingredients: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    isAvailable: z.ZodDefault<z.ZodBoolean>;
    popularityScore: z.ZodDefault<z.ZodNumber>;
    image: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    category: z.ZodPreprocess<z.ZodEnum<{
        readonly SALAD: "SALAD";
        readonly MEAT: "MEAT";
        readonly SOUP: "SOUP";
        readonly FISH: "FISH";
        readonly VEGGIES: "VEGGIES";
        readonly OTHER: "OTHER";
        readonly SEAFOOD: "SEAFOOD";
    }>>;
    type: z.ZodEnum<{
        readonly APPETIZER: "APPETIZER";
        readonly MAIN_COURSE: "MAIN_COURSE";
        readonly DESSERT: "DESSERT";
        readonly SIDES: "SIDES";
        readonly SAUCE: "SAUCE";
        readonly OTHER: "OTHER";
    }>;
    isVegan: z.ZodDefault<z.ZodBoolean>;
    isGlutenFree: z.ZodDefault<z.ZodBoolean>;
    isVegetarian: z.ZodDefault<z.ZodBoolean>;
    allergies: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>>;
    preparationTime: z.ZodDefault<z.ZodNumber>;
    spicyLevel: z.ZodDefault<z.ZodEnum<{
        readonly NOT_SPICY: "NOT_SPICY";
        readonly MILD: "MILD";
        readonly MEDIUM: "MEDIUM";
        readonly HOT: "HOT";
        readonly EXTRA_HOT: "EXTRA_HOT";
    }>>;
    calories: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export type FoodItemDTO = z.infer<typeof foodItemSchema>;
export declare const createDrinkItemSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    popularityScore: z.ZodDefault<z.ZodNumber>;
    ingredients: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    isAvailable: z.ZodDefault<z.ZodBoolean>;
    category: z.ZodPreprocess<z.ZodEnum<{
        readonly BEER: "BEER";
        readonly WINE: "WINE";
        readonly SPIRITS: "SPIRITS";
        readonly COFFEE: "COFFEE";
        readonly TEA: "TEA";
        readonly OTHER: "OTHER";
        readonly SODA: "SODA";
        readonly ALCOHOLIC: "ALCOHOLIC";
        readonly NON_ALCOHOLIC: "NON_ALCOHOLIC";
    }>>;
    volume: z.ZodNumber;
    alcoholPercentage: z.ZodNullable<z.ZodNumber>;
    isCarbonated: z.ZodPreprocess<z.ZodBoolean>;
    tempriture: z.ZodPreprocess<z.ZodEnum<{
        readonly COLD: "COLD";
        readonly ROOM: "ROOM";
        readonly HOT: "HOT";
    }>>;
    description: z.ZodString;
    image: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type CreateDrinkItemDTO = z.infer<typeof createDrinkItemSchema>;
export declare const createFoodItemSchema: z.ZodObject<{
    type: z.ZodEnum<{
        readonly APPETIZER: "APPETIZER";
        readonly MAIN_COURSE: "MAIN_COURSE";
        readonly DESSERT: "DESSERT";
        readonly SIDES: "SIDES";
        readonly SAUCE: "SAUCE";
        readonly OTHER: "OTHER";
    }>;
    name: z.ZodString;
    price: z.ZodNumber;
    popularityScore: z.ZodDefault<z.ZodNumber>;
    ingredients: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    isAvailable: z.ZodDefault<z.ZodBoolean>;
    category: z.ZodPreprocess<z.ZodEnum<{
        readonly SALAD: "SALAD";
        readonly MEAT: "MEAT";
        readonly SOUP: "SOUP";
        readonly FISH: "FISH";
        readonly VEGGIES: "VEGGIES";
        readonly OTHER: "OTHER";
        readonly SEAFOOD: "SEAFOOD";
    }>>;
    allergies: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>>;
    preparationTime: z.ZodDefault<z.ZodNumber>;
    spicyLevel: z.ZodDefault<z.ZodEnum<{
        readonly NOT_SPICY: "NOT_SPICY";
        readonly MILD: "MILD";
        readonly MEDIUM: "MEDIUM";
        readonly HOT: "HOT";
        readonly EXTRA_HOT: "EXTRA_HOT";
    }>>;
    calories: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    isVegan: z.ZodDefault<z.ZodBoolean>;
    isGlutenFree: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    image: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    isVegetarian: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateFoodItemDTO = z.infer<typeof createFoodItemSchema>;
export declare const updateDrinkItemSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    popularityScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    ingredients: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>>;
    isAvailable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    category: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly BEER: "BEER";
        readonly WINE: "WINE";
        readonly SPIRITS: "SPIRITS";
        readonly COFFEE: "COFFEE";
        readonly TEA: "TEA";
        readonly OTHER: "OTHER";
        readonly SODA: "SODA";
        readonly ALCOHOLIC: "ALCOHOLIC";
        readonly NON_ALCOHOLIC: "NON_ALCOHOLIC";
    }>>>;
    volume: z.ZodOptional<z.ZodNumber>;
    alcoholPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isCarbonated: z.ZodOptional<z.ZodPreprocess<z.ZodBoolean>>;
    tempriture: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly COLD: "COLD";
        readonly ROOM: "ROOM";
        readonly HOT: "HOT";
    }>>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
}, z.core.$strip>;
export type UpdateDrinkItemDTO = z.infer<typeof updateDrinkItemSchema>;
export declare const updateFoodItemSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        readonly APPETIZER: "APPETIZER";
        readonly MAIN_COURSE: "MAIN_COURSE";
        readonly DESSERT: "DESSERT";
        readonly SIDES: "SIDES";
        readonly SAUCE: "SAUCE";
        readonly OTHER: "OTHER";
    }>>;
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    popularityScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    ingredients: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>>;
    isAvailable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    category: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly SALAD: "SALAD";
        readonly MEAT: "MEAT";
        readonly SOUP: "SOUP";
        readonly FISH: "FISH";
        readonly VEGGIES: "VEGGIES";
        readonly OTHER: "OTHER";
        readonly SEAFOOD: "SEAFOOD";
    }>>>;
    allergies: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>>>;
    preparationTime: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    spicyLevel: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly NOT_SPICY: "NOT_SPICY";
        readonly MILD: "MILD";
        readonly MEDIUM: "MEDIUM";
        readonly HOT: "HOT";
        readonly EXTRA_HOT: "EXTRA_HOT";
    }>>>;
    calories: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodNumber>>>;
    isVegan: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isGlutenFree: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    isVegetarian: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateFoodItemDTO = z.infer<typeof updateFoodItemSchema>;
export declare const searchFoodItemsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    ingredients: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>>;
    isAvailable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    popularityScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    image: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    category: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly SALAD: "SALAD";
        readonly MEAT: "MEAT";
        readonly SOUP: "SOUP";
        readonly FISH: "FISH";
        readonly VEGGIES: "VEGGIES";
        readonly OTHER: "OTHER";
        readonly SEAFOOD: "SEAFOOD";
    }>>>;
    type: z.ZodOptional<z.ZodEnum<{
        readonly APPETIZER: "APPETIZER";
        readonly MAIN_COURSE: "MAIN_COURSE";
        readonly DESSERT: "DESSERT";
        readonly SIDES: "SIDES";
        readonly SAUCE: "SAUCE";
        readonly OTHER: "OTHER";
    }>>;
    isVegan: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isGlutenFree: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isVegetarian: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    allergies: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodEnum<{
        readonly GLUTEN: "GLUTEN";
        readonly DAIRY: "DAIRY";
        readonly EGG: "EGG";
        readonly PEANUT: "PEANUT";
        readonly TREENUT: "TREENUT";
        readonly FISH: "FISH";
        readonly SHELLFISH: "SHELLFISH";
        readonly SOY: "SOY";
        readonly SESAME: "SESAME";
        readonly CELERY: "CELERY";
        readonly MUSTARD: "MUSTARD";
        readonly LUPIN: "LUPIN";
        readonly SULPHITES: "SULPHITES";
        readonly MOLLUSCS: "MOLLUSCS";
    }>>>>>;
    preparationTime: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    spicyLevel: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly NOT_SPICY: "NOT_SPICY";
        readonly MILD: "MILD";
        readonly MEDIUM: "MEDIUM";
        readonly HOT: "HOT";
        readonly EXTRA_HOT: "EXTRA_HOT";
    }>>>;
    calories: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodNumber>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        readonly TYPE: "type";
        readonly CATEGORY: "category";
        readonly ALLERGIES: "allergies";
        readonly PREPARATION_TIME: "preparationTime";
        readonly SPICY_LEVEL: "spicyLevel";
        readonly CALORIES: "calories";
        readonly IS_VEGAN: "isVegan";
        readonly IS_GLUTEN_FREE: "isGlutenFree";
        readonly ID: "id";
        readonly NAME: "name";
        readonly PRICE: "price";
        readonly POPULARITY: "popularityScore";
        readonly INGREDIENTS: "ingredients";
        readonly IS_AVAILABLE: "isAvailable";
        readonly POPULARITY_SCORE: "popularityScore";
        readonly CREATED_AT: "createdAt";
        readonly UPDATED_AT: "updatedAt";
    }>>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        readonly ASC: "asc";
        readonly DESC: "desc";
    }>>>;
}, z.core.$strip>;
export type SearchFoodItemsDTO = z.infer<typeof searchFoodItemsSchema>;
export declare const searchDrinkItemsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    ingredients: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>>;
    isAvailable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    popularityScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    image: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    category: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly BEER: "BEER";
        readonly WINE: "WINE";
        readonly SPIRITS: "SPIRITS";
        readonly COFFEE: "COFFEE";
        readonly TEA: "TEA";
        readonly OTHER: "OTHER";
        readonly SODA: "SODA";
        readonly ALCOHOLIC: "ALCOHOLIC";
        readonly NON_ALCOHOLIC: "NON_ALCOHOLIC";
    }>>>;
    volume: z.ZodOptional<z.ZodNumber>;
    alcoholPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isCarbonated: z.ZodOptional<z.ZodPreprocess<z.ZodBoolean>>;
    tempriture: z.ZodOptional<z.ZodPreprocess<z.ZodEnum<{
        readonly COLD: "COLD";
        readonly ROOM: "ROOM";
        readonly HOT: "HOT";
    }>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        readonly CATEGORY: "category";
        readonly VOLUME: "volume";
        readonly ALCOHOL_PERCENTAGE: "alcoholPercentage";
        readonly IS_CARBONATED: "isCarbonated";
        readonly TEMPRITURE: "tempriture";
        readonly ID: "id";
        readonly NAME: "name";
        readonly PRICE: "price";
        readonly POPULARITY: "popularityScore";
        readonly INGREDIENTS: "ingredients";
        readonly IS_AVAILABLE: "isAvailable";
        readonly POPULARITY_SCORE: "popularityScore";
        readonly CREATED_AT: "createdAt";
        readonly UPDATED_AT: "updatedAt";
    }>>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        readonly ASC: "asc";
        readonly DESC: "desc";
    }>>>;
}, z.core.$strip>;
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
export declare const foodItemsListSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    totalPages: z.ZodNumber;
    totalCount: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodCoercedNumber<unknown>;
        name: z.ZodString;
        price: z.ZodNumber;
        description: z.ZodString;
        ingredients: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>;
        isAvailable: z.ZodDefault<z.ZodBoolean>;
        popularityScore: z.ZodDefault<z.ZodNumber>;
        image: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        category: z.ZodPreprocess<z.ZodEnum<{
            readonly SALAD: "SALAD";
            readonly MEAT: "MEAT";
            readonly SOUP: "SOUP";
            readonly FISH: "FISH";
            readonly VEGGIES: "VEGGIES";
            readonly OTHER: "OTHER";
            readonly SEAFOOD: "SEAFOOD";
        }>>;
        type: z.ZodEnum<{
            readonly APPETIZER: "APPETIZER";
            readonly MAIN_COURSE: "MAIN_COURSE";
            readonly DESSERT: "DESSERT";
            readonly SIDES: "SIDES";
            readonly SAUCE: "SAUCE";
            readonly OTHER: "OTHER";
        }>;
        isVegan: z.ZodDefault<z.ZodBoolean>;
        isGlutenFree: z.ZodDefault<z.ZodBoolean>;
        isVegetarian: z.ZodDefault<z.ZodBoolean>;
        allergies: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodEnum<{
            readonly GLUTEN: "GLUTEN";
            readonly DAIRY: "DAIRY";
            readonly EGG: "EGG";
            readonly PEANUT: "PEANUT";
            readonly TREENUT: "TREENUT";
            readonly FISH: "FISH";
            readonly SHELLFISH: "SHELLFISH";
            readonly SOY: "SOY";
            readonly SESAME: "SESAME";
            readonly CELERY: "CELERY";
            readonly MUSTARD: "MUSTARD";
            readonly LUPIN: "LUPIN";
            readonly SULPHITES: "SULPHITES";
            readonly MOLLUSCS: "MOLLUSCS";
        }>>>>;
        preparationTime: z.ZodDefault<z.ZodNumber>;
        spicyLevel: z.ZodDefault<z.ZodEnum<{
            readonly NOT_SPICY: "NOT_SPICY";
            readonly MILD: "MILD";
            readonly MEDIUM: "MEDIUM";
            readonly HOT: "HOT";
            readonly EXTRA_HOT: "EXTRA_HOT";
        }>>;
        calories: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
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
export declare const drinkItemsListSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    totalPages: z.ZodNumber;
    totalCount: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodCoercedNumber<unknown>;
        name: z.ZodString;
        price: z.ZodNumber;
        description: z.ZodString;
        ingredients: z.ZodPreprocess<z.ZodDefault<z.ZodArray<z.ZodString>>>;
        isAvailable: z.ZodDefault<z.ZodBoolean>;
        popularityScore: z.ZodDefault<z.ZodNumber>;
        image: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        category: z.ZodPreprocess<z.ZodEnum<{
            readonly BEER: "BEER";
            readonly WINE: "WINE";
            readonly SPIRITS: "SPIRITS";
            readonly COFFEE: "COFFEE";
            readonly TEA: "TEA";
            readonly OTHER: "OTHER";
            readonly SODA: "SODA";
            readonly ALCOHOLIC: "ALCOHOLIC";
            readonly NON_ALCOHOLIC: "NON_ALCOHOLIC";
        }>>;
        volume: z.ZodNumber;
        alcoholPercentage: z.ZodNullable<z.ZodNumber>;
        isCarbonated: z.ZodPreprocess<z.ZodBoolean>;
        tempriture: z.ZodPreprocess<z.ZodEnum<{
            readonly COLD: "COLD";
            readonly ROOM: "ROOM";
            readonly HOT: "HOT";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Type representing the list of drink items.
 *
 * This type is inferred from the `drinkItemsListSchema` using Zod.
 *
 * @type {DrinkItemsListDTO}
 */
export type DrinkItemsListDTO = z.infer<typeof drinkItemsListSchema>;
//# sourceMappingURL=items.dto.d.ts.map