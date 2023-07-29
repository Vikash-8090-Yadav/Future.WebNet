"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictedIntegerArbitraryBuilder = void 0;
const Converters_1 = require("../../../check/arbitrary/definition/Converters");
const integer_1 = require("../../integer");
const WithShrinkFromOtherArbitrary_1 = require("../WithShrinkFromOtherArbitrary");
function restrictedIntegerArbitraryBuilder(min, maxGenerated, max) {
    const generatorArbitrary = (0, Converters_1.convertToNext)((0, integer_1.integer)({ min, max: maxGenerated }));
    if (maxGenerated === max) {
        return (0, Converters_1.convertFromNext)(generatorArbitrary);
    }
    const shrinkerArbitrary = (0, Converters_1.convertToNext)((0, integer_1.integer)({ min, max }));
    return (0, Converters_1.convertFromNext)(new WithShrinkFromOtherArbitrary_1.WithShrinkFromOtherArbitrary(generatorArbitrary, shrinkerArbitrary));
}
exports.restrictedIntegerArbitraryBuilder = restrictedIntegerArbitraryBuilder;
