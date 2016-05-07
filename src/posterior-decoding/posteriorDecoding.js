'use strict';

const _ = require('lodash');

module.exports = function (mapMatrix) {
    const obsLength = _.sample(mapMatrix).length;
    const result = [];

    for (let obs = 0; obs < obsLength; obs++) {
        let maxProp = Number.NEGATIVE_INFINITY;
        let maxState;

        _.forEach(mapMatrix, (probArr, state) => {
            if (probArr[obs] > maxProp) {
                maxProp = probArr[obs];
                maxState = state;
            }
        });

        result.push({ state: maxState, postProb: maxProp });
    }

    return result;
}
