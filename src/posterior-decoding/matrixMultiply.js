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
    return a1.map((value, index) => {
        if (value === Number.NEGATIVE_INFINITY || a2[index] === Number.NEGATIVE_INFINITY) {
            return Number.NEGATIVE_INFINITY;
        } else {
            return value * a2[index];
        }
    });
}