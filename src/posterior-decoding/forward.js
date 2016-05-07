'use strict';

const _ = require('lodash');

function calc(obs, states, transProb, emitProb, startProb, logfn) {
    const numRows = states.length;
    const numCols = obs.length;
    const mat = Matrix({ rows: numRows, columns: numCols });
    const result = {};

    for (let r = 0; r < numRows; r++) {
        const state = states[r];
        const prob = startProb[state] * emitProb[state][obs[0]];
        mat[r][0] = logfn(prob);
    }

    for (let obsIndex = 1; obsIndex < numCols; obsIndex++) {
        for (let stateIndex = 0; stateIndex < numRows; stateIndex++) {
            const state = states[stateIndex];

            // build an array of all als, when al = f[i-1,l] + log(t(sl->sj))
            const als = states.map(sl => mat[states.indexOf(sl)][obsIndex - 1] + logfn(transProb[sl][state] || 0));
            const maxAl = _.max(als);
            const bls = als.map(al => al - maxAl);
            const sigma = bls.reduce((sum, bl) => sum + Math.exp(bl), 0);
            const prob = logfn(sigma) + maxAl + logfn(emitProb[state][obs[obsIndex]] || 0);

            mat[stateIndex][obsIndex] = isNaN(prob) ? Number.NEGATIVE_INFINITY : prob;
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
