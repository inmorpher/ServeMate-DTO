/**
 * ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ PRISMA ТИПОВ В DTO
 *
 * Этот файл содержит практические примеры того, как использовать
 * типы Prisma 7 в вашем сервисе при отправке данных на клиент
 */

/**
 * ==========================================
 * ПРИМЕР 1: В контроллере
 * ==========================================
 *
 * import { UserResponse, UserAuthResponse, ApiResponse } from '@servemate/dto';
 * import { Controller, Get, Post } from '@nestjs/common';
 * import { UserService } from './user.service';
 *
 * @Controller('users')
 * export class UserController {
 *   constructor(private userService: UserService) {}
 *
 *   // GET /users/:id - возвращаем UserResponse (без пароля)
 *   @Get(':id')
 *   async getUser(id: number): Promise<ApiResponse<UserResponse>> {
 *     const user = await this.userService.findById(id);
 *     return {
 *       success: true,
 *       data: {
 *         id: user.id,
 *         name: user.name,
 *         email: user.email,
 *         role: user.role,
 *         isActive: user.isActive,
 *         createdAt: user.createdAt,
 *         updatedAt: user.updatedAt,
 *         lastLogin: user.lastLogin,
 *       },
 *       timestamp: new Date().toISOString(),
 *     };
 *   }
 *
 *   // POST /auth/login - возвращаем UserAuthResponse + токен
 *   @Post('auth/login')
 *   async login(credentials): Promise<ApiResponse<UserAuthResponse & { token: string }>> {
 *     const user = await this.userService.authenticate(credentials);
 *     const token = this.tokenService.generate(user);
 *     return {
 *       success: true,
 *       data: {
 *         id: user.id,
 *         name: user.name,
 *         email: user.email,
 *         role: user.role,
 *         isActive: user.isActive,
 *         token,
 *       },
 *       timestamp: new Date().toISOString(),
 *     };
 *   }
 * }
 */

/**
 * ==========================================
 * ПРИМЕР 2: В сервисе для трансформации
 * ==========================================
 *
 * import { UserResponse, UserAuthResponse, CreateUserInput, UpdateUserInput } from '@servemate/dto';
 * import { User } from '@prisma/client';
 *
 * export class UserService {
 *   // Трансформация User из БД в UserResponse
 *   private toUserResponse(user: User): UserResponse {
 *     return {
 *       id: user.id,
 *       name: user.name,
 *       email: user.email,
 *       role: user.role,
 *       isActive: user.isActive,
 *       createdAt: user.createdAt,
 *       updatedAt: user.updatedAt,
 *       lastLogin: user.lastLogin,
 *     };
 *   }
 *
 *   // Или используем Pick/Omit напрямую
 *   private toUserAuthResponse(user: User): UserAuthResponse {
 *     const { id, name, email, role, isActive } = user;
 *     return { id, name, email, role, isActive };
 *   }
 *
 *   async createUser(input: CreateUserInput): Promise<UserResponse> {
 *     const user = await prisma.user.create({ data: input });
 *     return this.toUserResponse(user);
 *   }
 *
 *   async updateUser(id: number, input: UpdateUserInput): Promise<UserResponse> {
 *     const user = await prisma.user.update({
 *       where: { id },
 *       data: input,
 *     });
 *     return this.toUserResponse(user);
 *   }
 * }
 */

/**
 * ==========================================
 * ПРИМЕР 3: С Zod валидацией
 * ==========================================
 *
 * import { z } from 'zod';
 * import { CreateUserInput } from '@servemate/dto';
 *
 * // Создаём Zod schema от типа
 * const CreateUserSchema = z.object({
 *   name: z.string().min(1),
 *   email: z.string().email(),
 *   password: z.string().min(8),
 *   role: z.enum(['USER', 'SERVER', 'ADMIN']),
 * } as const satisfies Record<keyof CreateUserInput, any>);
 *
 * // Валидируем данные
 * export function validateCreateUser(data: unknown): CreateUserInput {
 *   return CreateUserSchema.parse(data);
 * }
 */

/**
 * ==========================================
 * ПРИМЕР 4: Для Order с includes
 * ==========================================
 *
 * import { OrderResponse } from '@servemate/dto';
 * import { Prisma } from '@prisma/client';
 *
 * // В сервисе
 * const orderInclude: Prisma.OrderInclude = {
 *   server: {
 *     select: { id: true, name: true }
 *   },
 *   table: {
 *     select: { id: true, number: true }
 *   },
 *   foodItems: {
 *     include: {
 *       foodItem: {
 *         select: { id: true, name: true, price: true }
 *       }
 *     }
 *   },
 *   drinkItems: {
 *     include: {
 *       drinkItem: {
 *         select: { id: true, name: true, price: true }
 *       }
 *     }
 *   }
 * };
 *
 * async getOrder(id: number): Promise<OrderResponse> {
 *   return prisma.order.findUnique({
 *     where: { id },
 *     include: orderInclude,
 *   });
 * }
 */

/**
 * ==========================================
 * ПРИМЕР 5: Пагинация с типами
 * ==========================================
 *
 * import { PaginatedResponse, UserResponse } from '@servemate/dto';
 *
 * async getUsers(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<UserResponse>> {
 *   const [users, total] = await Promise.all([
 *     prisma.user.findMany({
 *       skip: (page - 1) * pageSize,
 *       take: pageSize,
 *     }),
 *     prisma.user.count(),
 *   ]);
 *
 *   return {
 *     data: users.map(u => this.toUserResponse(u)),
 *     total,
 *     page,
 *     pageSize,
 *     totalPages: Math.ceil(total / pageSize),
 *   };
 * }
 */

/**
 * ==========================================
 * ПРИМЕР 6: На клиенте (React/Angular/Vue)
 * ==========================================
 *
 * // Импортируем типы
 * import type { UserResponse, ApiResponse, PaginatedResponse } from '@servemate/dto';
 *
 * // React пример
 * interface UserState {
 *   user: UserResponse | null;
 *   loading: boolean;
 *   error: string | null;
 * }
 *
 * // TypeScript автоматически знает какие поля есть в UserResponse
 * async function fetchUser(id: number): Promise<UserResponse> {
 *   const response = await fetch(`/api/users/${id}`);
 *   const data: ApiResponse<UserResponse> = await response.json();
 *   if (data.success && data.data) {
 *     return data.data; // TypeScript знает что это UserResponse
 *   }
 *   throw new Error(data.error);
 * }
 *
 * // Gettung пользователей с пагинацией
 * async function getUsers(page: number): Promise<PaginatedResponse<UserResponse>> {
 *   const response = await fetch(`/api/users?page=${page}`);
 *   const data: ApiResponse<PaginatedResponse<UserResponse>> = await response.json();
 *   if (data.success && data.data) {
 *     return data.data;
 *   }
 *   throw new Error(data.error);
 * }
 */

export {};
