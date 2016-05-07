'use strict';

const _ = require('lodash');
const Matrix = require('./matrix');

module.exports = function (obs, states, transProb, emitProb, logfn) {
    const numRows = states.length;
    const numCols = obs.length;
    const mat = Matrix({ rows: numRows, columns: numCols });
    const result = {};

    for (let r = 0; r < numRows; r++) {
        mat[r][obs.length - 1] = logfn(1);
    }

    for (let obsIndex = numCols - 2; obsIndex >= 0; obsIndex--) {
        for (let stateIndex = 0; stateIndex < numRows; stateIndex++) {
            const state = states[stateIndex];

            // build an array of all als, when al = b[i+1,l] + log(t(sj->sl) + log(e(sl->Xi+1))
            const als = states.map(sl => mat[states.indexOf(sl)][obsIndex + 1] + logfn(transProb[state][sl] || 0) + logfn(emitProb[sl][obs[obsIndex + 1]] || 0));
            const maxAl = _.max(als);
            const bls = als.map(al =>
                al === Number.NEGATIVE_INFINITY && maxAl === Number.NEGATIVE_INFINITY ? 0 : al - maxAl);
            const sigma = bls.reduce((sum, bl) => sum + Math.exp(bl), 0);
            const prob = logfn(sigma) + maxAl;

            mat[stateIndex][obsIndex] = prob;
        }
    }

    states.forEach(state => {
        const stateIndex = states.indexOf(state);
        result[state] = mat[stateIndex];
    });

    return result;
};
