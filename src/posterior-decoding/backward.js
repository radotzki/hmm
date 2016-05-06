'use strict';

const _ = require('lodash');

function calc(obs, states, transProb, emitProb, logfn) {
    const numRows = states.length;
    const numCols = obs.length;
    const mat = Matrix({ rows: numRows, columns: numCols });
    const result = {};

    for (let obsIndex = numCols - 2; obsIndex >= 0; obsIndex--) {
        for (let stateIndex = 0; stateIndex < numRows; stateIndex++) {
            const state = states[stateIndex];

            // build an array of all als, when al = b[i+1,l] + log(t(sj->sl) + log(e(sl->Xi+1))
            const als = states.map(sl => mat[states.indexOf(sl)][obsIndex + 1] + logfn(transProb[state][sl]) + logfn(emitProb[sl][obs[obsIndex + 1]]));
            const maxAl = _.max(als);
            const bls = als.map(al => al - maxAl);
            const sigma = bls.reduce((sum, bl) => sum + Math.exp(bl), 0);

            mat[stateIndex][obsIndex] = logfn(sigma) + maxAl;
        }
    }

    states.forEach(state => {
        const stateIndex = states.indexOf(state);
        result[state] = mat[stateIndex];
    });

    return result;
}

function Matrix(opts) {
    if (!(this instanceof Matrix)) return new Matrix(opts);

    const numRows = opts.rows;
    const numCols = opts.columns;

    for (var i = 0; i < numRows; i++) {
        this[i] = [];

        for (var j = 0; j < numCols; j++) {
            this[i][j] = 0;
        }
    }
}

module.exports = calc;
