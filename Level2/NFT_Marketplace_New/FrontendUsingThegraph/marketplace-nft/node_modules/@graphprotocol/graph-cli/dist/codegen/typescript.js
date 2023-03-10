"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticMethod = exports.StaticMethod = exports.param = exports.Param = exports.nullableType = exports.NullableType = exports.namedType = exports.NamedType = exports.moduleImports = exports.ModuleImports = exports.method = exports.Method = exports.klassMember = exports.klass = exports.GENERATED_FILE_NOTE = exports.ClassMember = exports.Class = exports.arrayType = exports.ArrayType = void 0;
class Param {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.name = name;
        this.type = type;
    }
    toString() {
        return `${this.name}: ${this.type.toString()}`;
    }
}
exports.Param = Param;
class Method {
    constructor(name, params, returnType, body) {
        this.name = name;
        this.params = params;
        this.returnType = returnType;
        this.body = body;
        this.name = name;
        this.params = params || [];
        this.returnType = returnType;
        this.body = body || '';
    }
    toString() {
        return `
  ${this.name}(${this.params.map(param => param.toString()).join(', ')})${this.returnType ? `: ${this.returnType.toString()}` : ''} {${this.body}
  }
`;
    }
}
exports.Method = Method;
class StaticMethod {
    constructor(name, params, returnType, body) {
        this.name = name;
        this.params = params;
        this.returnType = returnType;
        this.body = body;
        this.name = name;
        this.params = params || [];
        this.returnType = returnType || 'void';
        this.body = body || '';
    }
    toString() {
        return `
  static ${this.name}(${this.params.map(param => param.toString()).join(', ')})${this.returnType ? `: ${this.returnType.toString()}` : ''} {${this.body}
  }
`;
    }
}
exports.StaticMethod = StaticMethod;
class Class {
    constructor(name, options) {
        this.name = name;
        this.name = name;
        this.extends = options.extends;
        this.methods = [];
        this.members = [];
        this.export = options.export || false;
    }
    addMember(member) {
        this.members.push(member);
    }
    addMethod(method) {
        this.methods.push(method);
    }
    toString() {
        return `
${this.export ? 'export' : ''} class ${this.name}${this.extends ? ` extends ${this.extends}` : ''} {
${this.members.map(member => member.toString()).join('\n')}
${this.methods.map(method => method.toString()).join('')}
}
`;
    }
}
exports.Class = Class;
class ClassMember {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.name = name;
        this.type = type;
    }
    toString() {
        return `  ${this.name}: ${this.type.toString()}`;
    }
}
exports.ClassMember = ClassMember;
class NamedType {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    toString() {
        return this.name;
    }
    capitalize() {
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        return this;
    }
    isPrimitive() {
        const primitives = [
            'boolean',
            'u8',
            'i8',
            'u16',
            'i16',
            'u32',
            'i32',
            'u64',
            'i64',
            'f32',
            'f64',
            'usize',
            'isize',
        ];
        return primitives.includes(this.name);
    }
}
exports.NamedType = NamedType;
class ArrayType {
    constructor(inner) {
        this.inner = inner;
        this.inner = inner;
        this.name = `Array<${inner.toString()}>`;
    }
    toString() {
        return this.name;
    }
}
exports.ArrayType = ArrayType;
class NullableType {
    constructor(inner) {
        this.inner = inner;
        this.inner = inner;
    }
    toString() {
        return `${this.inner.toString()} | null`;
    }
}
exports.NullableType = NullableType;
class ModuleImports {
    constructor(nameOrNames, module) {
        this.nameOrNames = nameOrNames;
        this.module = module;
        this.nameOrNames = nameOrNames;
        this.module = module;
    }
    toString() {
        return `import { ${typeof this.nameOrNames === 'string' ? this.nameOrNames : this.nameOrNames.join(',')} } from "${this.module}"`;
    }
}
exports.ModuleImports = ModuleImports;
const namedType = (name) => new NamedType(name);
exports.namedType = namedType;
const arrayType = (name) => new ArrayType(name);
exports.arrayType = arrayType;
const param = (name, type) => new Param(name, type);
exports.param = param;
const method = (name, params, returnType, body) => new Method(name, params, returnType, body);
exports.method = method;
const staticMethod = (name, params, returnType, body) => new StaticMethod(name, params, returnType, body);
exports.staticMethod = staticMethod;
const klass = (name, options) => new Class(name, options);
exports.klass = klass;
const klassMember = (name, type) => new ClassMember(name, type);
exports.klassMember = klassMember;
const nullableType = (type) => new NullableType(type);
exports.nullableType = nullableType;
const moduleImports = (nameOrNames, module) => new ModuleImports(nameOrNames, module);
exports.moduleImports = moduleImports;
const GENERATED_FILE_NOTE = `
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
`;
exports.GENERATED_FILE_NOTE = GENERATED_FILE_NOTE;
