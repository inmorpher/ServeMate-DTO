# Использование Prisma 7 типов в DTO пакете

## Структура

Теперь в `dto-package` есть новый файл `prisma-types.ts`, который экспортирует типы из Prisma для использования на клиенте и сервере.

## Основные типы

### Response типы (то что отправляется клиенту)

```typescript
import type { 
  UserResponse,
  UserAuthResponse,
  OrderResponse,
  TableResponse,
  ReservationResponse,
  FoodResponse,
  DrinkResponse,
  PaymentResponse,
  PaginatedResponse,
  ApiResponse
} from '@servemate/dto';
```

### Input типы (что приходит от клиента)

```typescript
import type {
  CreateUserInput,
  UpdateUserInput,
  CreateOrderInput,
  CreateReservationInput
} from '@servemate/dto';
```

## Практические примеры

### 1️⃣ Обновление контроллера

**Было:**
```typescript
// Возвращали весь user с паролем
async getUser(req, res) {
  const user = await this.userService.findById(id);
  return res.json(user); // ❌ Видно пароль!
}
```

**Стало:**
```typescript
import type { UserResponse, ApiResponse } from '@servemate/dto';

async getUser(req, res): Promise<void> {
  const user = await this.userService.findById(id);
  const response: ApiResponse<UserResponse> = {
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
    },
    timestamp: new Date().toISOString(),
  };
  return res.json(response);
}
```

### 2️⃣ Создание helper функции для трансформации

```typescript
import type { UserResponse } from '@servemate/dto';
import { User } from '@prisma/client';

// В UserService
private toUserResponse(user: User): UserResponse {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as UserResponse;
}

async getUser(id: number): Promise<UserResponse> {
  const user = await this.prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  return this.toUserResponse(user);
}
```

### 3️⃣ Использование в контроллере с трансформацией

```typescript
import { UserResponse, PaginatedResponse } from '@servemate/dto';

@Get('/all')
async getAllUsers(req: TypedRequest<UserParamSchema>) {
  const { page = 1, pageSize = 10 } = req.query;
  
  const result = await this.userService.getUsers(page, pageSize);
  
  const response: ApiResponse<PaginatedResponse<UserResponse>> = {
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
}
```

### 4️⃣ На клиенте (React/Vue/Angular)

```typescript
// В клиентском API файле
import type { UserResponse, ApiResponse } from '@servemate/dto';

export async function fetchUser(id: number): Promise<UserResponse> {
  const response = await fetch(`/api/users/${id}`);
  const data: ApiResponse<UserResponse> = await response.json();
  
  if (data.success && data.data) {
    // TypeScript знает все поля UserResponse
    console.log(data.data.email); // ✅ OK
    console.log(data.data.password); // ❌ Ошибка - нет такого поля
    return data.data;
  }
  
  throw new Error(data.error);
}

// В компоненте React
function UserProfile() {
  const [user, setUser] = useState<UserResponse | null>(null);
  
  useEffect(() => {
    fetchUser(1).then(setUser);
  }, []);
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <p>Role: {user?.role}</p>
      {/* user.password не доступен, что правильно! */}
    </div>
  );
}
```

### 5️⃣ Для заказов с связанными данными

```typescript
import { OrderResponse } from '@servemate/dto';
import { Prisma } from '@prisma/client';

export class OrderService {
  private readonly orderInclude: Prisma.OrderInclude = {
    server: {
      select: { id: true, name: true }
    },
    table: {
      select: { id: true, number: true }
    },
    foodItems: {
      include: {
        foodItem: {
          select: { id: true, name: true, price: true }
        }
      }
    },
    drinkItems: {
      include: {
        drinkItem: {
          select: { id: true, name: true, price: true }
        }
      }
    }
  };

  async getOrder(id: number): Promise<OrderResponse> {
    return this.prisma.order.findUnique({
      where: { id },
      include: this.orderInclude,
    });
  }
}
```

### 6️⃣ Пагинированные результаты

```typescript
import { PaginatedResponse, UserResponse } from '@servemate/dto';

async getUsers(page: number, pageSize: number): Promise<PaginatedResponse<UserResponse>> {
  const [users, total] = await Promise.all([
    this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    this.prisma.user.count(),
  ]);

  return {
    data: users.map(u => this.toUserResponse(u)),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
```

## Преимущества этого подхода

✅ **Type-safety** - TypeScript проверит типы на клиенте и сервере  
✅ **No secrets leakage** - Чувствительные данные не попадают в ответ  
✅ **Auto-sync** - Типы всегда синхронизированы с БД благодаря Prisma  
✅ **Code reuse** - Один файл типов используется везде  
✅ **Single source of truth** - Prisma schema - это единственный источник правды  

## Миграция существующего кода

Для каждого контроллера:

1. Найти метод который возвращает User/Order/etc
2. Заменить возврат полного объекта на Response тип
3. Использовать helper функцию для трансформации
4. На клиенте типизировать ответ как `ApiResponse<ResponseType>`

## Дальнейшие шаги

Постепенно можно:
- Убрать ручное создание Zod schemas для некоторых типов
- Использовать автоматическую генерацию Zod типов из Prisma
- Добавить более сложные response типы для вложенных отношений
