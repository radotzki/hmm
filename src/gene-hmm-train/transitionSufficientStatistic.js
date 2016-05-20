'use strict';

module.exports = function (annotations) {
    const SII = ST(annotations, 'I', 'I');
    const SIA = ST(annotations, 'I', 'A');
    const SG3G1 = ST(annotations, 'G3', 'G1');
    const SG3T = ST(annotations, 'G3', 'T');

    return {
        I: { I: SII / (SII + SIA), A: SIA / (SII + SIA), G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
        A: { I: 0.0, A: 0.0, G1: 1.0, G2: 0.0, G3: 0.0, T: 0.0 },
        G1: { I: 0.0, A: 0.0, G1: 0.0, G2: 1.0, G3: 0.0, T: 0.0 },
        G2: { I: 0.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 1.0, T: 0.0 },
        G3: { I: 0.0, A: 0.0, G1: SG3G1 / (SG3G1 + SG3T), G2: 0.0, G3: 0.0, T: SG3T / (SG3G1 + SG3T) },
        T: { I: 1.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
    };
}

function ST(annotations, a, b) {
    // pseudocount
    // let count = 0;
    let count = 0.1;
    for (let j = 0; j < annotations.length - 1; j++) {
        if (annotations[j] === a && annotations[j + 1] === b) {
            count++;
        }
    }

    return count;
}
