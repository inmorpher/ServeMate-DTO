# @servemate/dto

[![NPM Version](https://img.shields.io/npm/v/@servemate/dto.svg)](https://www.npmjs.com/package/@servemate/dto)
[![License](https://img.shields.io/npm/l/@servemate/dto.svg)](https://github.com/inmorpher/ServeMate-DTO/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/language-typescript-blue.svg)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/validation-Zod-purple.svg)](https://zod.dev/)

**Data Transfer Objects (DTOs) package for the ServeMate restaurant management service.**

This package provides a comprehensive set of strongly-typed DTOs with runtime validation powered by Zod. It ensures data integrity and consistency across all microservices within the [ServeMate](https://github.com/inmorpher/ServeMate-service) ecosystem.

## Overview

`@servemate/dto` is a centralized repository for all data contracts used in the ServeMate platform. By defining clear and strict schemas, it helps prevent common data-related errors, simplifies API development, and enables seamless communication between different parts of the system.

## Key Features

-   **Type-Safe by Default**: Leverages TypeScript and Zod to provide compile-time and runtime type safety.
-   **Runtime Validation**: Ensures that all incoming and outgoing data conforms to the expected structure.
-   **Automatic Type Inference**: Automatically generate TypeScript types from Zod schemas, reducing code duplication.
-   **Comprehensive DTOs**: Covers all domains of the restaurant management system, including users, orders, payments, tables, and menu items.
-   **Search & Pagination**: Built-in support for complex search criteria and paginated responses.
-   **Zero Dependencies**: Other than `zod` as a peer dependency, this package is completely self-contained.

## Installation

```bash
npm install @servemate/dto
```

or with Yarn:

```bash
yarn add @servemate/dto
```

> **Note**: This package requires `zod` as a peer dependency. Please ensure it is installed in your project.
>
> ```bash
> npm install zod
> ```

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
} from '@servemate/dto';

// Example usage:
const role = UserRole.MANAGER;
const orderState = OrderState.COMPLETED;
const paymentMethod = PaymentMethod.CREDIT_CARD;
```

## Usage Examples

### 1. Data Validation

Use the Zod schemas to validate data at runtime. This is especially useful for validating incoming API requests.

```typescript
import { CreateUserSchema } from '@servemate/dto';

const newUserData = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'USER',
    password: 'password123'
};

try {
    const validatedUser = CreateUserSchema.parse(newUserData);
    console.log('User data is valid:', validatedUser);
    // Proceed with user creation...
} catch (error) {
    console.error('Validation failed:', error);
}
```

### 2. Type Inference

Automatically infer TypeScript types from the Zod schemas to keep your code DRY and consistent.

```typescript
import { z } from 'zod';
import { OrderSchema, OrderItemSchema } from '@servemate/dto';

// Infer the TypeScript type from the schema
type Order = z.infer<typeof OrderSchema>;
type OrderItem = z.infer<typeof OrderItemSchema>;

function processOrder(order: Order) {
    console.log(`Processing order for table ${order.tableNumber}`);
    order.items.forEach((item: OrderItem) => {
        console.log(`- ${item.quantity}x Item ID: ${item.foodItemId || item.drinkItemId}`);
    });
}
```

### 3. Search and Pagination

The search schemas provide a standardized way to handle complex queries with pagination.

```typescript
import { TableSearchCriteriaSchema, TableSortOptionsEnum } from '@servemate/dto';

const searchCriteria = {
    minCapacity: 2,
    maxCapacity: 6,
    status: 'AVAILABLE',
    page: 1,
    pageSize: 20,
    sortBy: TableSortOptionsEnum.CAPACITY,
    sortOrder: 'desc',
};

const validatedCriteria = TableSearchCriteriaSchema.parse(searchCriteria);

// Use validatedCriteria to fetch data from your service
// e.g., fetch('/api/tables', { body: JSON.stringify(validatedCriteria) });
```

## Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in our [issue tracker](https://github.com/inmorpher/ServeMate-DTO/issues).