'use strict';

module.exports = function (observations, annotations) {
    const SIA = SE(observations, annotations, 'I', 'A');
    const SIT = SE(observations, annotations, 'I', 'T');
    const SIC = SE(observations, annotations, 'I', 'C');
    const SIG = SE(observations, annotations, 'I', 'G');
    const SI = SIA + SIT + SIC + SIG;

    const SG1A = SE(observations, annotations, 'G1', 'A');
    const SG1T = SE(observations, annotations, 'G1', 'T');
    const SG1C = SE(observations, annotations, 'G1', 'C');
    const SG1G = SE(observations, annotations, 'G1', 'G');
    const SG1 = SG1A + SG1T + SG1C + SG1G;

    const SG2A = SE(observations, annotations, 'G2', 'A');
    const SG2T = SE(observations, annotations, 'G2', 'T');
    const SG2C = SE(observations, annotations, 'G2', 'C');
    const SG2G = SE(observations, annotations, 'G2', 'G');
    const SG2 = SG2A + SG2T + SG2C + SG2G;

    const SG3A = SE(observations, annotations, 'G3', 'A');
    const SG3T = SE(observations, annotations, 'G3', 'T');
    const SG3C = SE(observations, annotations, 'G3', 'C');
    const SG3G = SE(observations, annotations, 'G3', 'G');
    const SG3 = SG3A + SG3T + SG3C + SG3G;

    return {
        I: { A: SIA / SI, T: SIT / SI, C: SIC / SI, G: SIG / SI },
        A: { A: 1.0, T: 0.0, C: 0.0, G: 0.0 },
        G1: { A: (SG1A / SG1 + SG2A / SG2 + SG3A / SG3) / 3, T: (SG1T / SG1 + SG2T / SG2 + SG3T / SG3) / 3, C: (SG1C / SG1 + SG2C / SG2 + SG3C / SG3) / 3, G: (SG1G / SG1 + SG2G / SG2 + SG3G / SG3) / 3 },
        G2: { A: (SG1A / SG1 + SG2A / SG2 + SG3A / SG3) / 3, T: (SG1T / SG1 + SG2T / SG2 + SG3T / SG3) / 3, C: (SG1C / SG1 + SG2C / SG2 + SG3C / SG3) / 3, G: (SG1G / SG1 + SG2G / SG2 + SG3G / SG3) / 3 },
        G3: { A: (SG1A / SG1 + SG2A / SG2 + SG3A / SG3) / 3, T: (SG1T / SG1 + SG2T / SG2 + SG3T / SG3) / 3, C: (SG1C / SG1 + SG2C / SG2 + SG3C / SG3) / 3, G: (SG1G / SG1 + SG2G / SG2 + SG3G / SG3) / 3 },
        T: { A: 0.0, T: 1.0, C: 0.0, G: 0.0 },
    };
}

function SE(observations, annotations, a, b) {
    // pseudocount
    let count = 0.1;
    for (let j = 0; j < annotations.length; j++) {
        if (annotations[j] === a && observations[j] === b) {
            count++;
        }
    }

    return count;
}
