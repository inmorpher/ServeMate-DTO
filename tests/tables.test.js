"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../src/dto/enums");
const tables_dto_1 = require("../src/dto/tables.dto");
const test_setup_1 = require("../test-setup");
describe('Table DTOs', () => {
    describe('TableSchema', () => {
        it('should validate a valid table', () => {
            const validTable = {
                id: 1,
                tableNumber: 5,
                capacity: 4,
                additionalCapacity: 2,
                isOccupied: false,
                status: enums_1.TableCondition.AVAILABLE,
                guests: 0,
                originalCapacity: 4,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                tables_dto_1.TableSchema.parse(validTable);
            });
        });
        it('should reject invalid table numbers', () => {
            const invalidTable = {
                id: 1,
                tableNumber: -5, // Invalid negative number
                capacity: 4,
                additionalCapacity: 2,
                isOccupied: false,
                status: enums_1.TableCondition.AVAILABLE,
                guests: 0,
                originalCapacity: 4,
            };
            (0, test_setup_1.expectValidationError)(() => {
                tables_dto_1.TableSchema.parse(invalidTable);
            });
        });
    });
    describe('TableCreateSchema', () => {
        it('should validate valid table creation data', () => {
            const validCreate = {
                tableNumber: 10,
                capacity: 6,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                tables_dto_1.TableCreateSchema.parse(validCreate);
            });
        });
        it('should validate string inputs and convert them to numbers', () => {
            const stringInputs = {
                tableNumber: '15',
                capacity: '4',
            };
            const parsed = tables_dto_1.TableCreateSchema.parse(stringInputs);
            expect(parsed.tableNumber).toBe(15);
            expect(parsed.capacity).toBe(4);
        });
        it('should reject invalid capacity values', () => {
            const invalidCapacity = {
                tableNumber: 10,
                capacity: -2,
            };
            (0, test_setup_1.expectValidationError)(() => {
                tables_dto_1.TableCreateSchema.parse(invalidCapacity);
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
                status: enums_1.TableCondition.AVAILABLE,
                sortBy: tables_dto_1.TableSortOptionsEnum.CAPACITY,
                sortOrder: 'asc',
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                tables_dto_1.TableSearchCriteriaSchema.parse(validSearch);
            });
        });
        it('should apply default values', () => {
            const minimal = {};
            const parsed = tables_dto_1.TableSearchCriteriaSchema.parse(minimal);
            expect(parsed.page).toBe(1);
            expect(parsed.pageSize).toBe(10);
            expect(parsed.sortBy).toBe(tables_dto_1.TableSortOptionsEnum.ID);
            expect(parsed.sortOrder).toBe('asc');
        });
        it('should reject invalid sort options', () => {
            const invalidSort = {
                sortBy: 'invalid_sort',
            };
            (0, test_setup_1.expectValidationError)(() => {
                tables_dto_1.TableSearchCriteriaSchema.parse(invalidSort);
            });
        });
    });
    describe('TableUpdatesSchema', () => {
        it('should validate partial updates', () => {
            const validUpdate = {
                tableNumber: 20,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                tables_dto_1.TableUpdatesSchema.parse(validUpdate);
            });
        });
        it('should validate complete updates', () => {
            const completeUpdate = {
                tableNumber: 20,
                capacity: 8,
            };
            (0, test_setup_1.expectNoValidationError)(() => {
                tables_dto_1.TableUpdatesSchema.parse(completeUpdate);
            });
        });
        it('should reject invalid updates', () => {
            const invalidUpdate = {
                tableNumber: 0, // Invalid table number
                capacity: 'invalid', // Invalid capacity type
            };
            (0, test_setup_1.expectValidationError)(() => {
                tables_dto_1.TableUpdatesSchema.parse(invalidUpdate);
            });
        });
        it('should validate partial table updates', () => {
            const updates = {
                tableNumber: '15',
                capacity: '6',
            };
            const parsed = tables_dto_1.TableUpdatesSchema.parse(updates);
            expect(parsed.tableNumber).toBe(15);
            expect(parsed.capacity).toBe(6);
        });
        it('should validate updates with string inputs', () => {
            const updates = {
                tableNumber: '20',
            };
            const parsed = tables_dto_1.TableUpdatesSchema.parse(updates);
            expect(parsed.tableNumber).toBe(20);
        });
        it('should reject invalid table numbers', () => {
            const invalidUpdates = {
                tableNumber: '0',
                capacity: '4',
            };
            (0, test_setup_1.expectValidationError)(() => {
                tables_dto_1.TableUpdatesSchema.parse(invalidUpdates);
            });
        });
        it('should reject invalid capacity values', () => {
            const invalidUpdates = {
                capacity: '-1',
            };
            (0, test_setup_1.expectValidationError)(() => {
                tables_dto_1.TableUpdatesSchema.parse(invalidUpdates);
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
            const parsed = tables_dto_1.TableAssignmentSchema.parse(assignment);
            expect(parsed.serverId).toBe(123);
            expect(parsed.assignedTables).toEqual([1, 2, 3]);
        });
        it('should handle string inputs for serverId and tables', () => {
            const assignment = {
                serverId: '123',
                assignedTables: ['1', '2', '3'],
            };
            const parsed = tables_dto_1.TableAssignmentSchema.parse(assignment);
            expect(parsed.serverId).toBe(123);
            expect(parsed.isPrimary).toBe(true); // default value
            expect(parsed.assignedTables).toEqual([1, 2, 3]);
        });
    });
});
