'use strict';

module.exports = function Matrix (opts) {
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