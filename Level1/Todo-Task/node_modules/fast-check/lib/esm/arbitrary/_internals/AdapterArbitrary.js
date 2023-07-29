import { NextArbitrary } from '../../check/arbitrary/definition/NextArbitrary.js';
import { NextValue } from '../../check/arbitrary/definition/NextValue.js';
import { Stream } from '../../stream/Stream.js';
const AdaptedValue = Symbol('adapted-value');
function toAdapterNextValue(rawValue, adapter) {
    const adapted = adapter(rawValue.value_);
    if (!adapted.adapted) {
        return rawValue;
    }
    return new NextValue(adapted.value, AdaptedValue);
}
class AdapterArbitrary extends NextArbitrary {
    constructor(sourceArb, adapter) {
        super();
        this.sourceArb = sourceArb;
        this.adapter = adapter;
        this.adaptNextValue = (rawValue) => toAdapterNextValue(rawValue, adapter);
    }
    generate(mrng, biasFactor) {
        const rawValue = this.sourceArb.generate(mrng, biasFactor);
        return this.adaptNextValue(rawValue);
    }
    canShrinkWithoutContext(value) {
        return this.sourceArb.canShrinkWithoutContext(value) && !this.adapter(value).adapted;
    }
    shrink(value, context) {
        if (context === AdaptedValue) {
            if (!this.sourceArb.canShrinkWithoutContext(value)) {
                return Stream.nil();
            }
            return this.sourceArb.shrink(value, undefined).map(this.adaptNextValue);
        }
        return this.sourceArb.shrink(value, context).map(this.adaptNextValue);
    }
}
export function adapter(sourceArb, adapter) {
    return new AdapterArbitrary(sourceArb, adapter);
}
