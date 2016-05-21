'use strict';

module.exports = function (observations, transProb, emisProb, F, B) {
    const SII = ST(observations, transProb, emisProb, F, B, 'I', 'I');
    const SIA = ST(observations, transProb, emisProb, F, B, 'I', 'A');
    const SG3G1 = ST(observations, transProb, emisProb, F, B, 'G3', 'G1');
    const SG3T = ST(observations, transProb, emisProb, F, B, 'G3', 'T');

    return {
        I: { I: SII / (SII + SIA), A: SIA / (SII + SIA), G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
        A: { I: 0.0, A: 0.0, G1: 1.0, G2: 0.0, G3: 0.0, T: 0.0 },
        G1: { I: 0.0, A: 0.0, G1: 0.0, G2: 1.0, G3: 0.0, T: 0.0 },
        G2: { I: 0.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 1.0, T: 0.0 },
        G3: { I: 0.0, A: 0.0, G1: SG3G1 / (SG3G1 + SG3T), G2: 0.0, G3: 0.0, T: SG3T / (SG3G1 + SG3T) },
        T: { I: 1.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
    };
}

function ST(X, T, E, F, B, j, l) {
    let sum = 0;

    for (let i = 0; i < X.length - 1; i++) {
        sum += Math.exp(F[j][i]) * E[l][X[i + 1]] * Math.exp(B[l][i + 1]);
    }

    return T[j][l] * sum;
}
