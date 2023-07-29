import { convertFromNext, convertToNext } from '../check/arbitrary/definition/Converters.js';
import { tuple } from './tuple.js';
import { uniqueArray } from './uniqueArray.js';
import { keyValuePairsToObjectMapper, keyValuePairsToObjectUnmapper } from './_internals/mappers/KeyValuePairsToObject.js';
function dictionaryKeyExtractor(entry) {
    return entry[0];
}
export function dictionary(keyArb, valueArb, constraints = {}) {
    return convertFromNext(convertToNext(uniqueArray(tuple(keyArb, valueArb), {
        minLength: constraints.minKeys,
        maxLength: constraints.maxKeys,
        size: constraints.size,
        selector: dictionaryKeyExtractor,
    })).map(keyValuePairsToObjectMapper, keyValuePairsToObjectUnmapper));
}
