'use strict';

function calc(obs, states, transProb, emitProb, logfn) {
    const numRows = states.length;
    const numCols = obs.length;
    const mat = Matrix({ rows: numRows, columns: numCols });
    const probabilites = {};
    let annotations;
    let totalProb;

    for (let r = 0; r < numRows; r++) {
        mat[r][0].value = -1 + logfn(emitProb[states[r]][obs[0]]);
    }

    for (let t = 1; t < numCols; t++) {
        states.forEach(y => {
            let maxVal = Number.MIN_SAFE_INTEGER;
            let maxIndex = { row: 0, col: t - 1 };;
            states.forEach(y0 => {
                if (transProb[y0][y]) {
                    const currentVal = mat[states.indexOf(y0)][t - 1].value + logfn(transProb[y0][y]);
                    if (currentVal > maxVal) {
                        maxVal = currentVal;
                        maxIndex = { row: states.indexOf(y0), col: t - 1 };
                    }
                }
            });

            mat[states.indexOf(y)][t].value = maxVal + logfn(emitProb[y][obs[t]]);
            mat[states.indexOf(y)][t].lastIndex = maxIndex;
        });
    }

    const tbResult = traceBack(mat, states, numRows, numCols);
    annotations = tbResult.annotations;
    totalProb = tbResult.totalProb;
    states.forEach(state => {
        probabilites[state] = mat[states.indexOf(state)].map(o => o.value);
    });

    return { annotations, probabilites, totalProb };
}

function traceBack(mat, states, numRows, numCols) {
    const maxLocation = matrixMaxValueLocation(mat, numRows, numCols);
    let row = maxLocation.row;
    let col = maxLocation.col;
    const annotations = [];
    const totalProb = mat[row][col].value;

    while (mat[row][col].lastIndex) {
        annotations.unshift(states[row]);
        row = mat[row][col].lastIndex.row;
        col = mat[row][col].lastIndex.col;
    }

    annotations.unshift(states[row]);

    return { annotations, totalProb };
}

function matrixMaxValueLocation(matrix, numRows, numCols) {
    let biggestValue = Number.MIN_SAFE_INTEGER;
    let biggestLoc = { row: 0, col: 0 };
    const col = numCols - 1;

    for (let row = 0; row < numRows; row++) {
        if (matrix[row][col].value > biggestValue) {
            biggestValue = matrix[row][col].value;
            biggestLoc = { row, col };
        }
    }

    return biggestLoc;
}

function Matrix(opts) {
    if (!(this instanceof Matrix)) return new Matrix(opts);

    const numRows = opts.rows;
    const numCols = opts.columns;

    for (var i = 0; i < numRows; i++) {
        this[i] = [];

        for (var j = 0; j < numCols; j++) {
            this[i][j] = { value: 0 };
        }
    }
}

module.exports = calc;
