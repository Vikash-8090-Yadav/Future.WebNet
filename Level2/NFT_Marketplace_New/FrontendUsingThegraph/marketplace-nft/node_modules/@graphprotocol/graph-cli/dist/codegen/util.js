"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unrollTuple = exports.isTupleMatrixType = exports.isTupleArrayType = exports.containsTupleType = exports.isTupleType = exports.disambiguateNames = void 0;
function disambiguateNames({ values, getName, setName, }) {
    const collisionCounter = new Map();
    return values.map((value, index) => {
        const name = getName(value, index);
        const counter = collisionCounter.get(name);
        if (counter === undefined) {
            collisionCounter.set(name, 1);
            return setName(value, name);
        }
        collisionCounter.set(name, counter + 1);
        return setName(value, `${name}${counter}`);
    });
}
exports.disambiguateNames = disambiguateNames;
function isTupleType(t) {
    return t === 'tuple';
}
exports.isTupleType = isTupleType;
function containsTupleType(t) {
    return isTupleType(t) || isTupleArrayType(t) || isTupleMatrixType(t);
}
exports.containsTupleType = containsTupleType;
function isTupleArrayType(t) {
    return t.match(/^tuple\[([0-9]+)?\]$/);
}
exports.isTupleArrayType = isTupleArrayType;
function isTupleMatrixType(t) {
    return t.match(/^tuple\[([0-9]+)?\]\[([0-9]+)?\]$/);
}
exports.isTupleMatrixType = isTupleMatrixType;
const unrollTuple = ({ path, value, }) => value.components.reduce((acc, component, index) => {
    const name = component.name || `value${index}`;
    return acc.concat(component.type === 'tuple'
        ? (0, exports.unrollTuple)({ path: [...path, name], index, value: component })
        : [{ path: [...path, name], type: component.type }]);
}, []);
exports.unrollTuple = unrollTuple;
