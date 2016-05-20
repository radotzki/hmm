'use strict';

const _ = require('lodash');
const viterbi = require('../viterbi/viterbi');
const printHeader = require('../gene-hmm-train/print').printHeader;
const printStatus = require('../gene-hmm-train/print').printStatus;

module.exports = function (observations, initTransitions, initEmissions, startProbability, transitionSufficientStatistic, emissionSufficientStatistic, threshold) {
    const states = _.keys(initTransitions);
    let transProb = Object.assign({}, initTransitions);
    let emisProb = Object.assign({}, initEmissions);
    let lastProb;
    let halt;

    printHeader(observations, 'Viterbi log prob');

    while (!halt) {
        // calc viterbi
        const viterbiResult = viterbi(observations, states, transProb, emisProb, startProbability, Math.log);

        // print result
        printStatus(transProb, emisProb, viterbiResult.totalProb);

        // compute sufficient statistics and update transitions matrix
        transProb = transitionSufficientStatistic(viterbiResult.annotations);

        // compute sufficient statistics and update emissions matrix
        emisProb = emissionSufficientStatistic(observations, viterbiResult.annotations);

        // check halt condition
        halt = viterbiResult.totalProb - lastProb <= threshold;

        // update last probability
        lastProb = viterbiResult.totalProb;
    }

    return { transProb, emisProb, lastProb };
}
