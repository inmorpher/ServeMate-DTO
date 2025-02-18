import { TableCondition } from '../src/dto/enums';
import {
	TableAssignmentSchema,
	TableCreateSchema,
	TableSchema,
	TableSearchCriteriaSchema,
	TableSortOptionsEnum,
	TableUpdatesSchema,
} from '../src/dto/tables.dto';
import { expectNoValidationError, expectValidationError } from '../test-setup';

describe('Table DTOs', () => {
	describe('TableSchema', () => {
		it('should validate a valid table', () => {
			const validTable = {
				id: 1,
				tableNumber: 5,
				capacity: 4,
				additionalCapacity: 2,
				isOccupied: false,
				status: TableCondition.AVAILABLE,
				guests: 0,
				originalCapacity: 4,
			};

			expectNoValidationError(() => {
				TableSchema.parse(validTable);
			});
		});

		it('should reject invalid table numbers', () => {
			const invalidTable = {
				id: 1,
				tableNumber: -5, // Invalid negative number
				capacity: 4,
				additionalCapacity: 2,
				isOccupied: false,
				status: TableCondition.AVAILABLE,
				guests: 0,
				originalCapacity: 4,
			};

			expectValidationError(() => {
				TableSchema.parse(invalidTable);
			});
		});
	});

	describe('TableCreateSchema', () => {
		it('should validate valid table creation data', () => {
			const validCreate = {
				tableNumber: 10,
				capacity: 6,
			};

			expectNoValidationError(() => {
				TableCreateSchema.parse(validCreate);
			});
		});

		it('should validate string inputs and convert them to numbers', () => {
			const stringInputs = {
				tableNumber: '15',
				capacity: '4',
			};

			const parsed = TableCreateSchema.parse(stringInputs);
			expect(parsed.tableNumber).toBe(15);
			expect(parsed.capacity).toBe(4);
		});

		it('should reject invalid capacity values', () => {
			const invalidCapacity = {
				tableNumber: 10,
				capacity: -2,
			};

			expectValidationError(() => {
				TableCreateSchema.parse(invalidCapacity);
			});
		});
	});

	describe('TableSearchCriteriaSchema', () => {
		it('should validate valid search criteria', () => {
			const validSearch = {
				tableNumber: 5,
				minCapacity: 2,
				maxCapacity: 8,
				isOccupied: 'false',
				status: TableCondition.AVAILABLE,
				sortBy: TableSortOptionsEnum.CAPACITY,
				sortOrder: 'asc',
			};

			expectNoValidationError(() => {
				TableSearchCriteriaSchema.parse(validSearch);
			});
		});

		it('should apply default values', () => {
			const minimal = {};
			const parsed = TableSearchCriteriaSchema.parse(minimal);

			expect(parsed.page).toBe(1);
			expect(parsed.pageSize).toBe(10);
			expect(parsed.sortBy).toBe(TableSortOptionsEnum.ID);
			expect(parsed.sortOrder).toBe('asc');
		});

		it('should reject invalid sort options', () => {
			const invalidSort = {
				sortBy: 'invalid_sort',
			};

			expectValidationError(() => {
				TableSearchCriteriaSchema.parse(invalidSort);
			});
		});
	});

	describe('TableUpdatesSchema', () => {
		it('should validate partial updates', () => {
			const validUpdate = {
				tableNumber: 20,
			};

			expectNoValidationError(() => {
				TableUpdatesSchema.parse(validUpdate);
			});
		});

		it('should validate complete updates', () => {
			const completeUpdate = {
				tableNumber: 20,
				capacity: 8,
			};

			expectNoValidationError(() => {
				TableUpdatesSchema.parse(completeUpdate);
			});
		});

		it('should reject invalid updates', () => {
			const invalidUpdate = {
				tableNumber: 0, // Invalid table number
				capacity: 'invalid', // Invalid capacity type
			};

			expectValidationError(() => {
				TableUpdatesSchema.parse(invalidUpdate);
			});
		});

		it('should validate partial table updates', () => {
			const updates = {
				tableNumber: '15',
				capacity: '6',
			};

			const parsed = TableUpdatesSchema.parse(updates);
			expect(parsed.tableNumber).toBe(15);
			expect(parsed.capacity).toBe(6);
		});

		it('should validate updates with string inputs', () => {
			const updates = {
				tableNumber: '20',
			};

			const parsed = TableUpdatesSchema.parse(updates);
			expect(parsed.tableNumber).toBe(20);
		});

		it('should reject invalid table numbers', () => {
			const invalidUpdates = {
				tableNumber: '0',
				capacity: '4',
			};

			expectValidationError(() => {
				TableUpdatesSchema.parse(invalidUpdates);
			});
		});

		it('should reject invalid capacity values', () => {
			const invalidUpdates = {
				capacity: '-1',
			};

			expectValidationError(() => {
				TableUpdatesSchema.parse(invalidUpdates);
			});
		});
	});

	describe('TableAssignmentSchema', () => {
		it('should validate table assignment with primary flag', () => {
			const assignment = {
				serverId: '123',
				isPrimary: true,
				assignedTables: ['1', '2', '3'],
			};

			const parsed = TableAssignmentSchema.parse(assignment);
			expect(parsed.serverId).toBe(123);
			expect(parsed.assignedTables).toEqual([1, 2, 3]);
		});

		it('should handle string inputs for serverId and tables', () => {
			const assignment = {
				serverId: '123',
				assignedTables: ['1', '2', '3'],
			};

			const parsed = TableAssignmentSchema.parse(assignment);
			expect(parsed.serverId).toBe(123);
			expect(parsed.isPrimary).toBe(true); // default value
			expect(parsed.assignedTables).toEqual([1, 2, 3]);
		});
	});
});
