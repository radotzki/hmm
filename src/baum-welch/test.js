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

    const expected = {
        transProb: {
            I: { I: 0.7991604236771859, A: 0.20083957632281424, G1: 0, G2: 0, G3: 0, T: 0 },
            A: { I: 0, A: 0, G1: 1, G2: 0, G3: 0, T: 0 },
            G1: { I: 0, A: 0, G1: 0, G2: 1, G3: 0, T: 0 },
            G2: { I: 0, A: 0, G1: 0, G2: 0, G3: 1, T: 0 },
            G3: { I: 0, A: 0, G1: 0.00017410192522445187, G2: 0, G3: 0, T: 0.9998258980747755 },
            T: { I: 1, A: 0, G1: 0, G2: 0, G3: 0, T: 0 }
        },
        emisProb: {
            I: { A: 0.48557082538894436, T: 0.2286802227185041, C: 1.1225730907152437e-8, G: 0.28574894066682066 },
            A: { A: 1, T: 0, C: 0, G: 0 },
            G1: { A: 0.2319921727582478, T: 0.3269680876744538, C: 0.15402858370846173, G: 0.2870111558588368 },
            G2: { A: 0.2319921727582478, T: 0.3269680876744538, C: 0.15402858370846173, G: 0.2870111558588368 },
            G3: { A: 0.2319921727582478, T: 0.3269680876744538, C: 0.15402858370846173, G: 0.2870111558588368 },
            T: { A: 0, T: 1, C: 0, G: 0 }
        },
        lastProb: -49.402878890254605,
    };

    const result = baumWelch(observations, initTransitions, initEmissions, startTransProb, threshold);

    assert.deepEqual(result, expected);
}
