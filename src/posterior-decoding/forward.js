'use strict';

function calc(obs, states, transProb, emitProb, logfn) {
    const numRows = states.length;
    const numCols = obs.length;
    const mat = Matrix({ rows: numRows, columns: numCols });

    for (let r = 0; r < numRows; r++) {
        mat[r][0] = -1 + logfn(emitProb[states[r]][obs[0]]);
    }

    for (let seqIndex = 1; seqIndex < numCols; seqIndex++) {
        for (let stateIndex = 0; stateIndex < numRows; stateIndex++) {
            const curState = states[stateIndex];

            let aMax = Number.MIN_SAFE_INTEGER;
            states.forEach(sl => {
                if (transProb[sl][curState]) {
                    const currentVal = mat[states.indexOf(sl)][seqIndex - 1] + logfn(transProb[sl][curState]);
                    if (currentVal > aMax) {
                        aMax = currentVal;
                    }
                }
            });

            let sigma = 0;
            states.forEach(sl => {
                if (transProb[sl][curState]) {
                    const al = mat[states.indexOf(sl)][seqIndex - 1] + logfn(transProb[sl][curState]);
                    const bl = al - aMax;
                    sigma += Math.exp(bl);
                }
            });

            mat[stateIndex][seqIndex] = logfn(sigma) + logfn(emitProb[curState][obs[seqIndex]]);
        }
    }

    console.log('mat', mat);
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
