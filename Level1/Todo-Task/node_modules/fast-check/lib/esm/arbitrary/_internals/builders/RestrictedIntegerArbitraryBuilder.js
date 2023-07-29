import { convertFromNext, convertToNext } from '../../../check/arbitrary/definition/Converters.js';
import { integer } from '../../integer.js';
import { WithShrinkFromOtherArbitrary } from '../WithShrinkFromOtherArbitrary.js';
export function restrictedIntegerArbitraryBuilder(min, maxGenerated, max) {
    const generatorArbitrary = convertToNext(integer({ min, max: maxGenerated }));
    if (maxGenerated === max) {
        return convertFromNext(generatorArbitrary);
    }
    const shrinkerArbitrary = convertToNext(integer({ min, max }));
    return convertFromNext(new WithShrinkFromOtherArbitrary(generatorArbitrary, shrinkerArbitrary));
}
