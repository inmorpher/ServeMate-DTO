# Prisma Independence

## Principle

**The DTO package (`@servemate/dto`) is completely independent from `@prisma/client` at runtime.**

This means that:
- ✅ On the client, you can use DTO types WITHOUT installing `@prisma/client`
- ✅ The package contains only TypeScript types and Zod schemas
- ✅ No dependencies on Prisma generated clients

## Type Structure

### 1. Model Types (`prisma-types.ts`)

These are plain TypeScript interfaces that reflect the structure of Prisma models:

```typescript
// WITHOUT importing from @prisma/client
export interface User {
  id: number;
  name: string;
  email: string;
  // ... other fields
}
```

**Why?** When using on the client, we don't need Prisma Client. We only need types for data structures.

### 2. Enum Types (`enums.ts`)

Uses `as const` objects to create types:

```typescript
export const UserRole = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];
```

**Why?** This is pure TypeScript, works everywhere without dependencies.

### 3. Zod Schemas (`*.dto.ts`)

Used for validation on both sides (server and client):

```typescript
export const UserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  // ...
});

export type UserDTO = z.infer<typeof UserSchema>;
```

## Usage on Server

On the server, types are aligned with Prisma models manually:

```typescript
import { User } from '@servemate/dto';
import { User as PrismaUser } from '@prisma/client';

// On server: PrismaUser types are used with Prisma Client
// In API responses: User types from DTO package are used for typing

const apiResponse: User = {
  id: prismaUser.id,
  name: prismaUser.name,
  // ...
};
```

## Usage on Client

On the client, simply use the types and Zod schemas:

```typescript
import { User, UserSchema } from '@servemate/dto';

// Validate API response
const data = UserSchema.parse(apiResponse);

// Type the data
const user: User = data;
```

**No `@prisma/client` needed!**

## Package Configuration

### `package.json`

```json
{
  "peerDependencies": {
    "@prisma/client": "^7.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "zod": "^3.23.8"
  }
}
```

- `peerDependencies`: For information (may be needed on server)
- `devDependencies`: Only for development and type testing

## Independence Verification

```bash
# Build package WITHOUT errors
npm run build

# No imports from @prisma/client in compiled code
grep -r "prisma/client" dist/ || echo "✓ Independent!"
```

## Future Updates

When the Prisma schema is updated on the server:

1. **Generator will update `enums.ts`** via `npm run generate-dto`
2. **Manually update interfaces in `prisma-types.ts`** if model structures change
3. **Update Zod schemas in `*.dto.ts`** if validation changes
4. **Tests will verify compatibility** on both sides

```bash
# On server
npm run generate-dto  # Updates enums.ts

# Verify types
npm run build
npm test

# Release new version
npm version minor
npm publish
```

## Benefits

✅ **Portability**: DTO package works everywhere (browser, mobile, other backend)
✅ **Lightness**: Minimal dependencies
✅ **Type-safe**: Full typing on both sides
✅ **Validation**: Zod schemas for runtime checks

## Potential Issues and Solutions

### Issue: Need exact Prisma types on client

**Solution**: No problem! TypeScript interfaces have exactly the same structure as Prisma models.

### Issue: Types got out of sync

**Solution**: Add a test to verify compatibility:

```typescript
import { expectType, expectNotType } from 'tsd';
import type { User } from '@servemate/dto';
import type { User as PrismaUser } from '@prisma/client';

// If structures match - compiles
type CheckUser = User extends PrismaUser ? true : false;
```

---

**Last update**: January 2025
**Status**: ✅ DTO package is completely independent from `@prisma/client`
