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

## Available DTOs

### User Management

- `UserDTO` - Complete user data structure
- `CreateUserDTO` - For user creation
- `UpdateUserDTO` - For partial user updates
- `UserSearchDTO` - For user search queries
- `UserCredentials` - For authentication

### Order Management

- `OrderDTO` - Complete order structure
- `OrderCreateDTO` - For creating new orders
- `OrderUpdateDTO` - For updating orders
- `OrderSearchDTO` - For order queries
- `OrderItemDTO` - For individual order items

### Payment Processing

- `PaymentDTO` - Complete payment data
- `PaymentSearchDTO` - For payment queries
- `RefundDTO` - For refund operations

### Table Management

- `TableDTO` - Complete table data
- `TableCreateDTO` - For creating tables
- `TableUpdateDTO` - For updating tables
- `TableSearchDTO` - For table queries
- `TableAssignmentDTO` - For server assignments

### Menu Items

- `FoodItemDTO` - For food items
- `DrinkItemDTO` - For drink items
- `CreateFoodItemDTO` - For creating food items
- `CreateDrinkItemDTO` - For creating drink items
- `UpdateFoodItemDTO` - For updating food items
- `UpdateDrinkItemDTO` - For updating drink items

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
  items: [...],
  status: OrderState.RECEIVED
};

// Validates the order data
const validOrder = OrderSchema.parse(orderData);
```

### Handling Payments

```typescript
import { PaymentSchema, PaymentMethod } from '@servemate/dto';

const paymentData = {
	amount: 50.0,
	paymentType: PaymentMethod.CREDIT_CARD,
	orderId: 123,
};

// Validates payment data
const validPayment = PaymentSchema.parse(paymentData);
```

## Contributing

Please read our [contributing guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

ISC

## Support

For support, please raise an issue in our [issue tracker](https://github.com/inmorpher/ServeMate-DTO/issues).
