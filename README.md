# @servemate/dto

Data Transfer Objects (DTOs) package for the ServeMate restaurant management service. This package provides strongly typed DTOs using Zod for runtime validation.

This package is part of the [ServeMate](https://github.com/inmorpher/ServeMate-service) restaurant management system.

## Installation

```bash
npm install @servemate/dto
```

## Features

- Type-safe DTOs for all service entities
- Runtime validation using Zod
- Comprehensive enum support
- Full TypeScript support
- Zero external dependencies (except Zod)
- Automatic type inference from schemas
- Built-in search criteria validation
- Pagination support for list operations

## Available DTOs

### User Management

- `UserDTO` - Complete user data structure
- `CreateUserDTO` - For user creation
- `UpdateUserDTO` - For partial user updates
- `UserSearchDTO` - For user search queries
- `UserCredentials` - For authentication
- `UserListResult` - For paginated user lists

### Order Management

- `OrderDTO` - Complete order structure
- `OrderCreateDTO` - For creating new orders
- `OrderUpdateDTO` - For updating orders
- `OrderSearchDTO` - For order queries
- `OrderItemDTO` - For individual order items
- `OrderFullSingleDTO` - Detailed order information
- `OrderWithItemsDTO` - Order with associated items
- `GuestItemsDTO` - Guest-specific order items
- `OrderSearchListResult` - Paginated order search results

### Payment Processing

- `PaymentDTO` - Complete payment data
- `PaymentSearchDTO` - For payment queries
- `RefundDTO` - For refund operations
- `PaymentListDTO` - For paginated payment lists
- `PaymentStatusDTO` - Payment status information
- `PartialPaymentDTO` - For partial payment updates

### Table Management

- `TablesDTO` - Complete table data
- `TableCreateDTO` - For creating tables
- `TableUpdateDTO` - For updating tables
- `TableSearchDTO` - For table queries
- `TableAssignmentDTO` - For server assignments
- `TableSeatingDTO` - For seating assignments
- `TableListItem` - Simplified table information
- `TablesList` - Paginated table list

### Menu Items

- `FoodItemDTO` - For food items
- `DrinkItemDTO` - For drink items
- `CreateFoodItemDTO` - For creating food items
- `CreateDrinkItemDTO` - For creating drink items
- `UpdateFoodItemDTO` - For updating food items
- `UpdateDrinkItemDTO` - For updating drink items
- `FoodItemsListDTO` - Paginated food items list
- `DrinkItemsListDTO` - Paginated drink items list
- `SearchFoodItemsDTO` - For food item searches
- `SearchDrinkItemsDTO` - For drink item searches

## Enums

### User Related

```typescript
import { UserRole } from '@servemate/dto';

// Available roles
UserRole.ADMIN;
UserRole.USER;
UserRole.HOST;
UserRole.MANAGER;
```

### Order Related

```typescript
import { OrderState } from '@servemate/dto';

// Order states
OrderState.AWAITING;
OrderState.RECEIVED;
OrderState.SERVED;
OrderState.CANCELED;
OrderState.DISPUTED;
OrderState.READY_TO_PAY;
OrderState.COMPLETED;
```

### Payment Related

```typescript
import { PaymentMethod, PaymentState } from '@servemate/dto';

// Payment methods
PaymentMethod.CASH;
PaymentMethod.CREDIT_CARD;
PaymentMethod.DEBIT_CARD;

// Payment states
PaymentState.NONE;
PaymentState.PAID;
PaymentState.REFUNDED;
PaymentState.CANCELLED;
PaymentState.PENDING;
```

### Menu Items Related

```typescript
import {
	FoodCategory,
	DrinkCategory,
	FoodType,
	SpiceLevel,
	DrinkTemp,
	Allergy,
} from '@servemate/dto';

// Available categories and types
FoodCategory.APPETIZER;
DrinkCategory.SOFT_DRINK;
FoodType.MAIN_COURSE;
SpiceLevel.NOT_SPICY;
DrinkTemp.COLD;
```

### Table Related

```typescript
import { TableCondition, SeatingType } from '@servemate/dto';

// Table conditions
TableCondition.AVAILABLE;
TableCondition.OCCUPIED;
TableCondition.RESERVED;

// Seating types
SeatingType.WALK_IN;
SeatingType.RESERVATION;
```

## Usage Examples

### Creating a User

```typescript
import { CreateUserSchema, UserRole } from '@servemate/dto';

const userData = {
	name: 'John Doe',
	email: 'john@example.com',
	role: UserRole.HOST,
	password: 'secure123',
};

// Validates the data and returns typed result
const validUser = CreateUserSchema.parse(userData);
```

### Processing an Order

```typescript
import { OrderSchema, OrderState } from '@servemate/dto';

const orderData = {
	tableNumber: 5,
	guestsCount: 4,
	items: [
		{
			foodItemId: 1,
			quantity: 2,
			price: 15.99,
			guestNumber: 1,
		},
	],
	status: OrderState.RECEIVED,
};

// Validates the order data
const validOrder = OrderSchema.parse(orderData);
```

### Handling Payments

```typescript
import { PaymentSchema, PaymentMethod, PaymentState } from '@servemate/dto';

const paymentData = {
	amount: 50.0,
	paymentType: PaymentMethod.CREDIT_CARD,
	orderId: 123,
	status: PaymentState.PAID,
	tax: 5.0,
	tip: 7.5,
};

// Validates payment data
const validPayment = PaymentSchema.parse(paymentData);
```

### Managing Tables

```typescript
import { TableCreateSchema, TableCondition } from '@servemate/dto';

const tableData = {
	tableNumber: 10,
	capacity: 4,
	status: TableCondition.AVAILABLE,
};

// Validates table data
const validTable = TableCreateSchema.parse(tableData);
```

### Search Criteria Usage

```typescript
import { TableSearchCriteriaSchema, TableSortOptionsEnum } from '@servemate/dto';

const searchCriteria = {
	minCapacity: 4,
	maxCapacity: 8,
	isOccupied: false,
	page: 1,
	pageSize: 10,
	sortBy: TableSortOptionsEnum.CAPACITY,
	sortOrder: 'asc',
};

// Validates search criteria
const validCriteria = TableSearchCriteriaSchema.parse(searchCriteria);
```

## Contributing

Please read our [contributing guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

ISC

## Support

For support, please raise an issue in our [issue tracker](https://github.com/inmorpher/ServeMate-DTO/issues).
