"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithShrinkFromOtherArbitrary = void 0;
const NextArbitrary_1 = require("../../check/arbitrary/definition/NextArbitrary");
const NextValue_1 = require("../../check/arbitrary/definition/NextValue");
function isSafeContext(context) {
    return context !== undefined;
}
function toGeneratorNextValue(value) {
    if (value.hasToBeCloned) {
        return new NextValue_1.NextValue(value.value_, { generatorContext: value.context }, () => value.value);
    }
    return new NextValue_1.NextValue(value.value_, { generatorContext: value.context });
}
function toShrinkerNextValue(value) {
    if (value.hasToBeCloned) {
        return new NextValue_1.NextValue(value.value_, { shrinkerContext: value.context }, () => value.value);
    }
    return new NextValue_1.NextValue(value.value_, { shrinkerContext: value.context });
}
class WithShrinkFromOtherArbitrary extends NextArbitrary_1.NextArbitrary {
    constructor(generatorArbitrary, shrinkerArbitrary) {
        super();
        this.generatorArbitrary = generatorArbitrary;
        this.shrinkerArbitrary = shrinkerArbitrary;
    }
    generate(mrng, biasFactor) {
        return toGeneratorNextValue(this.generatorArbitrary.generate(mrng, biasFactor));
    }
    canShrinkWithoutContext(value) {
        return this.shrinkerArbitrary.canShrinkWithoutContext(value);
    }
    shrink(value, context) {
        if (!isSafeContext(context)) {
            return this.shrinkerArbitrary.shrink(value, undefined).map(toShrinkerNextValue);
        }
        if ('generatorContext' in context) {
            return this.generatorArbitrary.shrink(value, context.generatorContext).map(toGeneratorNextValue);
        }
        return this.shrinkerArbitrary.shrink(value, context.shrinkerContext).map(toShrinkerNextValue);
    }
}
exports.WithShrinkFromOtherArbitrary = WithShrinkFromOtherArbitrary;
