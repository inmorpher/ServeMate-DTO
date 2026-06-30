export declare const ReservationStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly CANCELLED: "CANCELLED";
    readonly COMPLETED: "COMPLETED";
    readonly NO_SHOW: "NO_SHOW";
};
export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus];
export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
    readonly HOST: "HOST";
    readonly MANAGER: "MANAGER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const OrderState: {
    readonly AWAITING: "AWAITING";
    readonly RECEIVED: "RECEIVED";
    readonly SERVED: "SERVED";
    readonly CANCELED: "CANCELED";
    readonly DISPUTED: "DISPUTED";
    readonly READY_TO_PAY: "READY_TO_PAY";
    readonly COMPLETED: "COMPLETED";
};
export type OrderState = (typeof OrderState)[keyof typeof OrderState];
export declare const SpiceLevel: {
    readonly NOT_SPICY: "NOT_SPICY";
    readonly MILD: "MILD";
    readonly MEDIUM: "MEDIUM";
    readonly HOT: "HOT";
    readonly EXTRA_HOT: "EXTRA_HOT";
};
export type SpiceLevel = (typeof SpiceLevel)[keyof typeof SpiceLevel];
export declare const PaymentState: {
    readonly NONE: "NONE";
    readonly PAID: "PAID";
    readonly REFUNDED: "REFUNDED";
    readonly CANCELLED: "CANCELLED";
    readonly PENDING: "PENDING";
};
export type PaymentState = (typeof PaymentState)[keyof typeof PaymentState];
export declare const DrinkTemp: {
    readonly COLD: "COLD";
    readonly ROOM: "ROOM";
    readonly HOT: "HOT";
};
export type DrinkTemp = (typeof DrinkTemp)[keyof typeof DrinkTemp];
export declare const TableCondition: {
    readonly AVAILABLE: "AVAILABLE";
    readonly OCCUPIED: "OCCUPIED";
    readonly RESERVED: "RESERVED";
    readonly ORDERING: "ORDERING";
    readonly SERVING: "SERVING";
    readonly PAYMENT: "PAYMENT";
};
export type TableCondition = (typeof TableCondition)[keyof typeof TableCondition];
export declare const OrderAction: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly ADD_ITEM: "ADD_ITEM";
    readonly REMOVE_ITEM: "REMOVE_ITEM";
    readonly CHANGE_STATUS: "CHANGE_STATUS";
};
export type OrderAction = (typeof OrderAction)[keyof typeof OrderAction];
export declare const PaymentMethod: {
    readonly CASH: "CASH";
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly DEBIT_CARD: "DEBIT_CARD";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const RefundState: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type RefundState = (typeof RefundState)[keyof typeof RefundState];
export declare const Allergy: {
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
};
export type Allergy = (typeof Allergy)[keyof typeof Allergy];
export declare const FoodType: {
    readonly APPETIZER: "APPETIZER";
    readonly MAIN_COURSE: "MAIN_COURSE";
    readonly DESSERT: "DESSERT";
    readonly SIDES: "SIDES";
    readonly SAUCE: "SAUCE";
    readonly OTHER: "OTHER";
};
export type FoodType = (typeof FoodType)[keyof typeof FoodType];
export declare const FoodCategory: {
    readonly SALAD: "SALAD";
    readonly MEAT: "MEAT";
    readonly SOUP: "SOUP";
    readonly FISH: "FISH";
    readonly VEGGIES: "VEGGIES";
    readonly OTHER: "OTHER";
    readonly SEAFOOD: "SEAFOOD";
};
export type FoodCategory = (typeof FoodCategory)[keyof typeof FoodCategory];
export declare const DrinkCategory: {
    readonly BEER: "BEER";
    readonly WINE: "WINE";
    readonly SPIRITS: "SPIRITS";
    readonly COFFEE: "COFFEE";
    readonly TEA: "TEA";
    readonly OTHER: "OTHER";
    readonly SODA: "SODA";
    readonly ALCOHOLIC: "ALCOHOLIC";
    readonly NON_ALCOHOLIC: "NON_ALCOHOLIC";
};
export type DrinkCategory = (typeof DrinkCategory)[keyof typeof DrinkCategory];
//# sourceMappingURL=enums.d.ts.map