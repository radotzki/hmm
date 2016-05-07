'use strict';

const _ = require('lodash');

module.exports = function (forwardMatrix, backwardMatrix) {
    const mat = {};

    _.forEach(forwardMatrix, (v, rowIndex) => {
        mat[rowIndex] = arrayMultiply(forwardMatrix[rowIndex], backwardMatrix[rowIndex]);
    });

    return mat;
};

function arrayMultiply(a1, a2) {
    return a1.map((value, index) => Math.exp(value) * Math.exp(a2[index]));
}
