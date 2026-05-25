# @servemate/dto

[![NPM Version](https://img.shields.io/npm/v/@servemate/dto.svg)](https://www.npmjs.com/package/@servemate/dto)
[![License](https://img.shields.io/npm/l/@servemate/dto.svg)](https://github.com/inmorpher/ServeMate-DTO/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/language-typescript-blue.svg)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/validation-Zod%204.x-purple.svg)](https://zod.dev/)
[![pnpm](https://img.shields.io/badge/package%20manager-pnpm-orange.svg)](https://pnpm.io/)

**Data Transfer Objects (DTOs) package for the ServeMate restaurant management service.**

This package provides a comprehensive set of strongly-typed DTOs with runtime validation powered by Zod 4.x. It ensures data integrity and consistency across all microservices within the [ServeMate](https://github.com/inmorpher/ServeMate-service) ecosystem.

## Overview

`@servemate/dto` is a centralized repository for all data contracts used in the ServeMate platform. By defining clear and strict schemas, it helps prevent common data-related errors, simplifies API development, and enables seamless communication between different parts of the system.

## Key Features

-   **Type-Safe by Default**: Leverages TypeScript and Zod 4.x to provide compile-time and runtime type safety.
-   **Runtime Validation**: Ensures that all incoming and outgoing data conforms to the expected structure.
-   **Automatic Type Inference**: Automatically generate TypeScript types from Zod schemas, reducing code duplication.
-   **Comprehensive DTOs**: Covers all domains of the restaurant management system, including users, orders, payments, tables, and menu items.
-   **Search & Pagination**: Built-in support for complex search criteria and paginated responses.
-   **Zero Prisma Dependencies**: This package is completely independent from `@prisma/client` at runtime. Use it on any platform - web, mobile, or any backend service!
-   **Zero External Dependencies**: Only `zod@^4.x` as a peer dependency for validation. Nothing else required.
-   **pnpm Workspace Ready**: Part of a monorepo workspace structure managed with pnpm.

## Tech Stack

- **TypeScript 6.x**: Latest version for type safety
- **Zod 4.x**: Modern schema validation library
- **Jest 30.x**: Latest testing framework
- **pnpm**: Fast, disk space efficient package manager

## Important: Prisma Independence ✨

**This package contains NO runtime dependency on `@prisma/client`.** 

It provides pure TypeScript types and Zod validation schemas that work everywhere:
- ✅ In browser applications
- ✅ In mobile apps
- ✅ In other backend services
- ✅ Without installing Prisma

All types are defined as standalone TypeScript interfaces that mirror Prisma models, making them fully portable and reusable.

For more details, see [PRISMA_INDEPENDENCE.md](./PRISMA_INDEPENDENCE.md).

## Installation

Using pnpm (recommended):

```bash
pnpm add @servemate/dto zod
```

Using npm:

```bash
npm install @servemate/dto zod
```

Using yarn:

```bash
yarn add @servemate/dto zod
```

> **Requirements**: This package requires `zod@^4.x` as a peer dependency for runtime validation. It does NOT require `@prisma/client`.

## Available DTOs and Schemas

This package is organized into several domains, each with its own set of DTOs and validation schemas.

<details>
<summary><strong>User Management</strong></summary>

| Schema              | Description                               |
| ------------------- | ----------------------------------------- |
| `UserSchema`        | Complete user data structure.             |
| `CreateUserSchema`  | For creating a new user.                  |
| `UpdateUserSchema`  | For partial user updates.                 |
| `UserSearchSchema`  | For user search queries.                  |
| `UserCredentials`   | For authentication purposes.              |
| `UserListResult`    | For paginated lists of users.             |

</details>

<details>
<summary><strong>Order Management</strong></summary>

| Schema                | Description                               |
| --------------------- | ----------------------------------------- |
| `OrderSchema`         | Complete order structure.                 |
| `OrderCreateSchema`   | For creating a new order.                 |
| `OrderUpdateSchema`   | For updating an existing order.           |
| `OrderSearchSchema`   | For order search queries.                 |
| `OrderItemSchema`     | For individual items within an order.     |
| `OrderFullSingleDTO`  | Detailed information for a single order.  |
| `OrderWithItemsDTO`   | An order with its associated items.       |
| `GuestItemsDTO`       | Guest-specific order items.               |
| `OrderSearchListResult`| For paginated lists of orders.           |

</details>

<details>
<summary><strong>Payment Processing</strong></summary>

| Schema              | Description                               |
| ------------------- | ----------------------------------------- |
| `PaymentSchema`     | Complete payment data structure.          |
| `PaymentSearchSchema`| For payment search queries.              |
| `RefundSchema`      | For refund operations.                    |
| `PaymentListDTO`    | For paginated lists of payments.          |
| `PaymentStatusDTO`  | Represents the status of a payment.       |
| `PartialPaymentDTO` | For partial payment updates.              |

</details>

<details>
<summary><strong>Table Management</strong></summary>

| Schema                | Description                               |
| --------------------- | ----------------------------------------- |
| `TablesSchema`        | Complete table data structure.            |
| `TableCreateSchema`   | For creating a new table.                 |
| `TableUpdateSchema`   | For updating an existing table.           |
| `TableSearchSchema`   | For table search queries.                 |
| `TableAssignmentSchema`| For assigning servers to tables.         |
| `TableSeatingSchema`  | For seating assignments.                  |
| `TableListItem`       | Simplified table information for lists.   |
| `TablesList`          | For paginated lists of tables.            |

</details>

<details>
<summary><strong>Menu Items</strong></summary>

| Schema                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `FoodItemSchema`       | For food items.                           |
| `DrinkItemSchema`      | For drink items.                          |
| `CreateFoodItemSchema` | For creating a new food item.             |
| `CreateDrinkItemSchema`| For creating a new drink item.            |
| `UpdateFoodItemSchema` | For updating an existing food item.       |
| `UpdateDrinkItemSchema`| For updating an existing drink item.      |
| `FoodItemsListDTO`     | For paginated lists of food items.        |
| `DrinkItemsListDTO`    | For paginated lists of drink items.       |
| `SearchFoodItemsSchema`| For food item search queries.             |
| `SearchDrinkItemsSchema`| For drink item search queries.           |

</details>

## Enums

The package includes a rich set of enums to ensure consistency for categorical data.

```typescript
import {
    UserRole,
    OrderState,
    PaymentMethod,
    PaymentState,
    FoodCategory,
    DrinkCategory,
    TableCondition,
    SeatingType
} from '../../dto-package';

// Example usage:
const role = UserRole.MANAGER;
const orderState = OrderState.COMPLETED;
const paymentMethod = PaymentMethod.CREDIT_CARD;
```

## Usage Examples

### 1. Data Validation

Use the Zod schemas to validate data at runtime. This is especially useful for validating incoming API requests.

**Safe validation (recommended):**

```typescript
import { CreateUserSchema } from '../../dto-package';

const newUserData = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'USER',
    password: 'password123'
};

const result = CreateUserSchema.safeParse(newUserData);

if (result.success) {
    console.log('User data is valid:', result.data);
    // Proceed with user creation...
} else {
    console.error('Validation errors:', result.error.errors);
}
```

**Direct parsing (throws on error):**

```typescript
try {
    const validatedUser = CreateUserSchema.parse(newUserData);
    console.log('User data is valid:', validatedUser);
} catch (error) {
    console.error('Validation failed:', error);
}
```

### 2. Type Inference

Automatically infer TypeScript types from the Zod schemas to keep your code DRY and consistent.

```typescript
import { z } from 'zod';
import { OrderSchema, OrderItemSchema } from '../../dto-package';

// Infer the TypeScript type from the schema
type Order = z.infer<typeof OrderSchema>;
type OrderItem = z.infer<typeof OrderItemSchema>;

function processOrder(order: Order) {
    console.log(`Processing order for table ${order.tableNumber}`);
    order.foodItems?.forEach((item) => {
        console.log(`- ${item.items.length} items for guest ${item.guestNumber}`);
    });
}
```

### 3. Search and Pagination

The search schemas provide a standardized way to handle complex queries with pagination.

```typescript
import { OrderSearchSchema } from '../../dto-package';

const searchCriteria = {
    status: 'RECEIVED',
    page: 1,
    pageSize: 20,
    sortBy: 'orderTime',
    sortOrder: 'desc',
};

const result = OrderSearchSchema.safeParse(searchCriteria);

if (result.success) {
    // Use result.data to fetch data from your service
    // e.g., fetch('/api/orders', { body: JSON.stringify(result.data) });
    console.log('Search criteria validated:', result.data);
} else {
    console.error('Invalid search criteria:', result.error);
}
```

### 4. Partial Updates with Validation

Update schemas ensure at least one field is provided:

```typescript
import { UpdateUserSchema } from '../../dto-package';

// This will fail - no fields provided
const emptyUpdate = {};
UpdateUserSchema.safeParse(emptyUpdate).success; // false

// This will succeed - at least one field provided
const validUpdate = { name: 'New Name' };
UpdateUserSchema.safeParse(validUpdate).success; // true
```

## Development

### Project Scripts

```bash
# Build TypeScript
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Clean build artifacts
pnpm clean
```

### Development Setup

This package is part of a monorepo managed with pnpm. To set up development:

```bash
# From project root
pnpm install

# Build only dto-package
pnpm -F @servemate/dto build

# Test only dto-package  
pnpm -F @servemate/dto test
```

## Migration Guide

### From Zod 3 to Zod 4

If you're upgrading from Zod 3, note these breaking changes:

1. **Schema Construction**: `.partial()` behavior changed. Update schemas using explicit `.optional()` fields.
2. **Validation**: Use `.safeParse()` for safer error handling instead of relying on `.parse()` for expected validations.
3. **Error Handling**: Error objects may have slightly different structures. Always use `result.error.errors` for detailed validation errors.

### From npm to pnpm

The project now uses pnpm exclusively. If you were using npm:

```bash
# Remove old lock file
rm package-lock.json

# Install with pnpm
pnpm install
```

## Recent Updates

### Version 2.0.0+

- ✅ Updated to Zod 4.x with improved validation
- ✅ Migrated to pnpm workspace
- ✅ Updated to TypeScript 6.x
- ✅ Updated to Jest 30.x with improved test performance
- ✅ All schemas adapted for Zod 4 compatibility
- ✅ Enhanced error messages for better debugging

## Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests as needed
5. Run `pnpm test` to verify
6. Submit a pull request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:

1. Check existing [issues](https://github.com/inmorpher/ServeMate-DTO/issues)
2. Review the [PRISMA_INDEPENDENCE.md](./PRISMA_INDEPENDENCE.md) for common questions
3. Open a new issue with detailed information about your problem

## Related Documents

- [PRISMA_INDEPENDENCE.md](./PRISMA_INDEPENDENCE.md) - Detailed information about Prisma independence
- [PRISMA_DTO_USAGE.md](./PRISMA_DTO_USAGE.md) - Integration patterns with Prisma
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - Comprehensive usage guide