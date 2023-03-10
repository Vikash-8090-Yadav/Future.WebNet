"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
describe('Schema validation', () => {
    test('Type suggestions', () => {
        expect((0, schema_1.typeSuggestion)('Address')).toEqual('Bytes');
        expect((0, schema_1.typeSuggestion)('address')).toEqual('Bytes');
        expect((0, schema_1.typeSuggestion)('bytes')).toEqual('Bytes');
        expect((0, schema_1.typeSuggestion)('string')).toEqual('String');
        expect((0, schema_1.typeSuggestion)('bool')).toEqual('Boolean');
        expect((0, schema_1.typeSuggestion)('boolean')).toEqual('Boolean');
        expect((0, schema_1.typeSuggestion)('float')).toEqual('BigDecimal');
        expect((0, schema_1.typeSuggestion)('Float')).toEqual('BigDecimal');
        expect((0, schema_1.typeSuggestion)(`int`)).toBe('Int');
        expect((0, schema_1.typeSuggestion)(`uint`)).toBe('BigInt');
        expect((0, schema_1.typeSuggestion)(`uint32`)).toBe('BigInt');
        // Test i8..i32, int8..int32
        for (let i = 8; i <= 32; i += 8) {
            expect((0, schema_1.typeSuggestion)(`i${i}`)).toBe('Int');
            expect((0, schema_1.typeSuggestion)(`int${i}`)).toBe('Int');
        }
        // Test u8..u24, uint8..uint24
        for (let i = 8; i <= 24; i += 8) {
            expect((0, schema_1.typeSuggestion)(`u${i}`)).toBe('Int');
            expect((0, schema_1.typeSuggestion)(`uint${i}`)).toBe('Int');
        }
        // Test i40..i256, int40..int256, u40..u256, uint40..uint256
        for (let i = 40; i <= 256; i += 8) {
            expect((0, schema_1.typeSuggestion)(`i${i}`)).toBe('BigInt');
            expect((0, schema_1.typeSuggestion)(`int${i}`)).toBe('BigInt');
            expect((0, schema_1.typeSuggestion)(`u${i}`)).toBe('BigInt');
            expect((0, schema_1.typeSuggestion)(`uint${i}`)).toBe('BigInt');
        }
    });
});
