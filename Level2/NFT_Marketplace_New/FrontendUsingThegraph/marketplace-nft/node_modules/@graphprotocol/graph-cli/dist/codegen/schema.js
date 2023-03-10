"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __importDefault(require("immutable"));
const typesCodegen = __importStar(require("./types"));
const tsCodegen = __importStar(require("./typescript"));
class IdField {
    constructor(idField) {
        const typeName = idField.getIn(['type', 'type', 'name', 'value']);
        this.kind = typeName === 'Bytes' ? IdField.BYTES : IdField.STRING;
    }
    typeName() {
        return this.kind === IdField.BYTES ? 'Bytes' : 'string';
    }
    gqlTypeName() {
        return this.kind === IdField.BYTES ? 'Bytes' : 'String';
    }
    tsNamedType() {
        return tsCodegen.namedType(this.typeName());
    }
    tsValueFrom() {
        return this.kind === IdField.BYTES ? 'Value.fromBytes(id)' : 'Value.fromString(id)';
    }
    tsValueKind() {
        return this.kind === IdField.BYTES ? 'ValueKind.BYTES' : 'ValueKind.STRING';
    }
    tsValueToString() {
        return this.kind == IdField.BYTES ? 'id.toBytes().toHexString()' : 'id.toString()';
    }
    tsToString() {
        return this.kind == IdField.BYTES ? 'id.toHexString()' : 'id';
    }
    static fromFields(fields) {
        const idField = fields.find(field => field.getIn(['name', 'value']) === 'id');
        return new IdField(idField);
    }
    static fromTypeDef(def) {
        return IdField.fromFields(def.get('fields'));
    }
}
IdField.BYTES = Symbol('Bytes');
IdField.STRING = Symbol('String');
class SchemaCodeGenerator {
    constructor(schema) {
        this.schema = schema;
        this.schema = schema;
    }
    generateModuleImports() {
        return [
            tsCodegen.moduleImports([
                // Base classes
                'TypedMap',
                'Entity',
                'Value',
                'ValueKind',
                // APIs
                'store',
                // Basic Scalar types
                'Bytes',
                'BigInt',
                'BigDecimal',
            ], '@graphprotocol/graph-ts'),
        ];
    }
    generateTypes() {
        return this.schema.ast
            .get('definitions')
            .filter((def) => this._isEntityTypeDefinition(def))
            .map((def) => this._generateEntityType(def));
    }
    _isEntityTypeDefinition(def) {
        return (def.get('kind') === 'ObjectTypeDefinition' &&
            def
                .get('directives')
                .find((directive) => directive.getIn(['name', 'value']) === 'entity') !== undefined);
    }
    _isInterfaceDefinition(def) {
        return def.get('kind') === 'InterfaceTypeDefinition';
    }
    _generateEntityType(def) {
        const name = def.getIn(['name', 'value']);
        const klass = tsCodegen.klass(name, { export: true, extends: 'Entity' });
        const fields = def.get('fields');
        const idField = IdField.fromFields(fields);
        // Generate and add a constructor
        klass.addMethod(this._generateConstructor(name, fields));
        // Generate and add save() and getById() methods
        this._generateStoreMethods(name, idField).forEach(method => klass.addMethod(method));
        // Generate and add entity field getters and setters
        def
            .get('fields')
            .reduce((methods, field) => methods.concat(this._generateEntityFieldMethods(def, field)), immutable_1.default.List())
            .forEach((method) => klass.addMethod(method));
        return klass;
    }
    _generateConstructor(_entityName, fields) {
        const idField = IdField.fromFields(fields);
        return tsCodegen.method('constructor', [tsCodegen.param('id', idField.tsNamedType())], undefined, `
      super()
      this.set('id', ${idField.tsValueFrom()})
      `);
    }
    _generateStoreMethods(entityName, idField) {
        return immutable_1.default.List.of(tsCodegen.method('save', [], tsCodegen.namedType('void'), `
        let id = this.get('id')
        assert(id != null,
               'Cannot save ${entityName} entity without an ID')
        if (id) {
          assert(id.kind == ${idField.tsValueKind()},
                 \`Entities of type ${entityName} must have an ID of type ${idField.gqlTypeName()} but the id '\${id.displayData()}' is of type \${id.displayKind()}\`)
          store.set('${entityName}', ${idField.tsValueToString()}, this)
        }`), tsCodegen.staticMethod('load', [tsCodegen.param('id', tsCodegen.namedType(idField.typeName()))], tsCodegen.nullableType(tsCodegen.namedType(entityName)), `
        return changetype<${entityName} | null>(store.get('${entityName}', ${idField.tsToString()}))
        `));
    }
    _generateEntityFieldMethods(entityDef, fieldDef) {
        return immutable_1.default.List([
            this._generateEntityFieldGetter(entityDef, fieldDef),
            this._generateEntityFieldSetter(entityDef, fieldDef),
        ]);
    }
    _generateEntityFieldGetter(_entityDef, fieldDef) {
        const name = fieldDef.getIn(['name', 'value']);
        const gqlType = fieldDef.get('type');
        const fieldValueType = this._valueTypeFromGraphQl(gqlType);
        const returnType = this._typeFromGraphQl(gqlType);
        const isNullable = returnType instanceof tsCodegen.NullableType;
        const getNonNullable = `return ${typesCodegen.valueToAsc('value!', fieldValueType)}`;
        const getNullable = `if (!value || value.kind == ValueKind.NULL) {
                          return null
                        } else {
                          return ${typesCodegen.valueToAsc('value', fieldValueType)}
                        }`;
        return tsCodegen.method(`get ${name}`, [], returnType, `
       let value = this.get('${name}')
       ${isNullable ? getNullable : getNonNullable}
      `);
    }
    _generateEntityFieldSetter(_entityDef, fieldDef) {
        const name = fieldDef.getIn(['name', 'value']);
        const gqlType = fieldDef.get('type');
        const fieldValueType = this._valueTypeFromGraphQl(gqlType);
        const paramType = this._typeFromGraphQl(gqlType);
        const isNullable = paramType instanceof tsCodegen.NullableType;
        const paramTypeString = isNullable ? paramType.inner.toString() : paramType.toString();
        const isArray = paramType instanceof tsCodegen.ArrayType;
        if (isArray && paramType.inner instanceof tsCodegen.NullableType) {
            const baseType = this._baseType(gqlType);
            throw new Error(`
GraphQL schema can't have List's with Nullable members.
Error in '${name}' field of type '[${baseType}]'.
Suggestion: add an '!' to the member type of the List, change from '[${baseType}]' to '[${baseType}!]'`);
        }
        const setNonNullable = `
      this.set('${name}', ${typesCodegen.valueFromAsc(`value`, fieldValueType)})
    `;
        const setNullable = `
      if (!value) {
        this.unset('${name}')
      } else {
        this.set('${name}', ${typesCodegen.valueFromAsc(`<${paramTypeString}>value`, fieldValueType)})
      }
    `;
        return tsCodegen.method(`set ${name}`, [tsCodegen.param('value', paramType)], undefined, isNullable ? setNullable : setNonNullable);
    }
    _resolveFieldType(gqlType) {
        const typeName = gqlType.getIn(['name', 'value']);
        // If this is a reference to another type, the field has the type of
        // the referred type's id field
        const typeDef = this.schema.ast
            .get('definitions')
            .find((def) => (this._isEntityTypeDefinition(def) || this._isInterfaceDefinition(def)) &&
            def.getIn(['name', 'value']) === typeName);
        if (typeDef) {
            return IdField.fromTypeDef(typeDef).typeName();
        }
        return typeName;
    }
    /** Return the type that values for this field must have. For scalar
     * types, that's the type from the subgraph schema. For references to
     * other entity types, this is the same as the type of the id of the
     * referred type, i.e., `string` or `Bytes`*/
    _valueTypeFromGraphQl(gqlType) {
        if (gqlType.get('kind') === 'NonNullType') {
            return this._valueTypeFromGraphQl(gqlType.get('type'));
        }
        if (gqlType.get('kind') === 'ListType') {
            return '[' + this._valueTypeFromGraphQl(gqlType.get('type')) + ']';
        }
        return this._resolveFieldType(gqlType);
    }
    /** Determine the base type of `gqlType` by removing any non-null
     * constraints and using the type of elements of lists */
    _baseType(gqlType) {
        if (gqlType.get('kind') === 'NonNullType') {
            return this._baseType(gqlType.get('type'));
        }
        if (gqlType.get('kind') === 'ListType') {
            return this._baseType(gqlType.get('type'));
        }
        return gqlType.getIn(['name', 'value']);
    }
    _typeFromGraphQl(gqlType, nullable = true) {
        if (gqlType.get('kind') === 'NonNullType') {
            return this._typeFromGraphQl(gqlType.get('type'), false);
        }
        if (gqlType.get('kind') === 'ListType') {
            const type = tsCodegen.arrayType(this._typeFromGraphQl(gqlType.get('type')));
            return nullable ? tsCodegen.nullableType(type) : type;
        }
        // NamedType
        const type = tsCodegen.namedType(typesCodegen.ascTypeForValue(this._resolveFieldType(gqlType)));
        // In AssemblyScript, primitives cannot be nullable.
        return nullable && !type.isPrimitive() ? tsCodegen.nullableType(type) : type;
    }
}
exports.default = SchemaCodeGenerator;
