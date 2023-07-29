"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapter = void 0;
const NextArbitrary_1 = require("../../check/arbitrary/definition/NextArbitrary");
const NextValue_1 = require("../../check/arbitrary/definition/NextValue");
const Stream_1 = require("../../stream/Stream");
const AdaptedValue = Symbol('adapted-value');
function toAdapterNextValue(rawValue, adapter) {
    const adapted = adapter(rawValue.value_);
    if (!adapted.adapted) {
        return rawValue;
    }
    return new NextValue_1.NextValue(adapted.value, AdaptedValue);
}
class AdapterArbitrary extends NextArbitrary_1.NextArbitrary {
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
                return Stream_1.Stream.nil();
            }
            return this.sourceArb.shrink(value, undefined).map(this.adaptNextValue);
        }
        return this.sourceArb.shrink(value, context).map(this.adaptNextValue);
    }
}
function adapter(sourceArb, adapter) {
    return new AdapterArbitrary(sourceArb, adapter);
}
exports.adapter = adapter;
