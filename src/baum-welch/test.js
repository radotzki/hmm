'use strict';

const assert = require('assert');
const baumWelch = require('./baumWelch');

test1();

function test1() {
    const observations = 'AAATTTTATTACGTTTAGTAGAAGAGAAAGGTAAACATGATGG';
    const initTransitions = {
        I: { I: 0.5, A: 0.5, G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
        A: { I: 0.0, A: 0.0, G1: 1.0, G2: 0.0, G3: 0.0, T: 0.0 },
        G1: { I: 0.0, A: 0.0, G1: 0.0, G2: 1.0, G3: 0.0, T: 0.0 },
        G2: { I: 0.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 1.0, T: 0.0 },
        G3: { I: 0.0, A: 0.0, G1: 0.5, G2: 0.0, G3: 0.0, T: 0.5 },
        T: { I: 1.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
    };
    const initEmissions = {
        I: { A: 0.25, T: 0.25, C: 0.25, G: 0.25 },
        A: { A: 1.0, T: 0.0, C: 0.0, G: 0.0 },
        G1: { A: 0.25, T: 0.25, C: 0.25, G: 0.25 },
        G2: { A: 0.25, T: 0.25, C: 0.25, G: 0.25 },
        G3: { A: 0.25, T: 0.25, C: 0.25, G: 0.25 },
        T: { A: 0.0, T: 1.0, C: 0.0, G: 0.0 },
    };
    const startTransProb = {
        I: 1,
        A: 0,
        G1: 0,
        G2: 0,
        G3: 0,
        T: 0,
    };
    const threshold = 0.001;

    // const expected = {
    //     transProb: {
    //         I: { I: 0.5, A: 0.5, G1: 0, G2: 0, G3: 0, T: 0 },
    //         A: { I: 0, A: 0, G1: 1, G2: 0, G3: 0, T: 0 },
    //         G1: { I: 0, A: 0, G1: 0, G2: 1, G3: 0, T: 0 },
    //         G2: { I: 0, A: 0, G1: 0, G2: 0, G3: 1, T: 0 },
    //         G3: { I: 0, A: 0, G1: 0.43055555555555564, G2: 0, G3: 0, T: 0.5694444444444444 },
    //         T: { I: 1, A: 0, G1: 0, G2: 0, G3: 0, T: 0 },
    //     },
    //     emisProb: {
    //         I: { A: 0.3942307692307693, T: 0.29807692307692313, C: 0.009615384615384618, G: 0.29807692307692313 },
    //         A: { A: 1, T: 0, C: 0, G: 0 },
    //         G1: { A: 0.36904761904761907, T: 0.25, C: 0.09126984126984129, G: 0.2896825396825397 },
    //         G2: { A: 0.36904761904761907, T: 0.25, C: 0.09126984126984129, G: 0.2896825396825397 },
    //         G3: { A: 0.36904761904761907, T: 0.25, C: 0.09126984126984129, G: 0.2896825396825397 },
    //         T: { A: 0, T: 1, C: 0, G: 0 }
    //     },
    //     lastProb: -53.447472039773395,
    // };

    const result = baumWelch(observations, initTransitions, initEmissions, startTransProb, threshold);

    // assert.deepEqual(result, expected);
}
