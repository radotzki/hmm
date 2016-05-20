'use strict';

const viterbiTraining = require('../viterbi-training/viterbiTraining');
const emissionSufficientStatistic = require('./emissionSufficientStatistic');
const transitionSufficientStatistic = require('./transitionSufficientStatistic');

const observations = process.argv[2];
const algorithm = process.argv[3];
const TIG = Number(process.argv[4]);
const TGI = Number(process.argv[5]);
const EIA = Number(process.argv[6]);
const EIT = Number(process.argv[7]);
const EIC = Number(process.argv[8]);
const EGA = Number(process.argv[9]);
const EGT = Number(process.argv[10]);
const EGC = Number(process.argv[11]);

const initTransitions = {
    I: { I: 1 - TIG, A: TIG, G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
    A: { I: 0.0, A: 0.0, G1: 1.0, G2: 0.0, G3: 0.0, T: 0.0 },
    G1: { I: 0.0, A: 0.0, G1: 0.0, G2: 1.0, G3: 0.0, T: 0.0 },
    G2: { I: 0.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 1.0, T: 0.0 },
    G3: { I: 0.0, A: 0.0, G1: 1 - TGI, G2: 0.0, G3: 0.0, T: TGI },
    T: { I: 1.0, A: 0.0, G1: 0.0, G2: 0.0, G3: 0.0, T: 0.0 },
};
const initEmissions = {
    I: { A: EIA, T: EIT, C: EIC, G: 1 - (EIA + EIT + EIC) },
    A: { A: 1.0, T: 0.0, C: 0.0, G: 0.0 },
    G1: { A: EGA, T: EGT, C: EGC, G: 1 - (EGA + EGT + EGC) },
    G2: { A: EGA, T: EGT, C: EGC, G: 1 - (EGA + EGT + EGC) },
    G3: { A: EGA, T: EGT, C: EGC, G: 1 - (EGA + EGT + EGC) },
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

if (algorithm === 'V') {
    viterbiTraining(observations, initTransitions, initEmissions, startTransProb, transitionSufficientStatistic, emissionSufficientStatistic, threshold);
} else {

}
