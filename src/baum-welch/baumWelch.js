'use strict';

const _ = require('lodash');
const emissionSufficientStatistic = require('./emissionSufficientStatistic');
const transitionSufficientStatistic = require('./transitionSufficientStatistic');
const forward = require('../posterior-decoding/forward')
const backward = require('../posterior-decoding/backward')
const printHeader = require('../gene-hmm-train/print').printHeader;
const printStatus = require('../gene-hmm-train/print').printStatus;

module.exports = function (observations, initTransitions, initEmissions, startTransProb, threshold) {
    const states = _.keys(initTransitions);
    let transProb = Object.assign({}, initTransitions);
    let emisProb = Object.assign({}, initEmissions);
    let lastProb;
    let halt;

    printHeader(observations, 'log likelihood');

    while (!halt) {
        // calc forward & backward matrices
        const F = forward(observations, states, transProb, emisProb, startTransProb, Math.log);
        const B = backward(observations, states, transProb, emisProb, Math.log);
        const L = Math.log(_.reduce(F, (sum, state) => sum + Math.exp(_.last(state)), 0));

        // print result
        printStatus(transProb, emisProb, L);

        // compute sufficient statistics and update transitions matrix
        transProb = transitionSufficientStatistic(observations, transProb, emisProb, F, B);

        // compute sufficient statistics and update emissions matrix
        emisProb = emissionSufficientStatistic(observations, emisProb, F, B);

        // check halt condition
        halt = L - lastProb <= threshold;

        // update last probability
        lastProb = L;
    }

    return { transProb, emisProb, lastProb };
}
