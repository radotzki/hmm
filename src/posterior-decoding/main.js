'use strict';

const _ = require('lodash');

const forward = require('./forward');
const backward = require('./backward');
const matrixMultiply = require('./matrixMultiply');
const posteriorDecoding = require('./posteriorDecoding');

const logFunction = Math.log;
const states = ['B', 'A', '1', '2', '3', 'T']
const observations = 'CCATCGCACT';
const transition_probability = {
    'B': { 'B': 0.95, 'A': 0.05 },
    'A': { '1': 1 },
    '1': { '2': 1 },
    '2': { '3': 1 },
    '3': { '1': 0.8, 'T': 0.2 },
    'T': { 'B': 1 },
}
const emission_probability = {
    'B': { 'A': 0.3, 'G': 0.2, 'C': 0.2, 'T': 0.3 },
    'A': { 'A': 1, 'G': 0, 'C': 0, 'T': 0 },
    '1': { 'A': 0, 'G': 0.4, 'C': 0.4, 'T': 0.2 },
    '2': { 'A': 0, 'G': 0.4, 'C': 0.4, 'T': 0.2 },
    '3': { 'A': 0, 'G': 0.4, 'C': 0.4, 'T': 0.2 },
    'T': { 'A': 0, 'G': 0, 'C': 0, 'T': 1 },
}
const start_probability = {
    'B': 1,
    'A': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    'T': 0,
};

const forwardMatrix = forward(observations, states, transition_probability, emission_probability, start_probability, logFunction);
const backwardMatrix = backward(observations, states, transition_probability, emission_probability, logFunction);
const mapMatrix = matrixMultiply(forwardMatrix, backwardMatrix);
const posteriorDecodingArray = posteriorDecoding(mapMatrix);

// P(X|HMM) = ∑j F[n,j]
const dataLogLikelihood = _.reduce(forwardMatrix, (sum, state) => sum + _.last(state), 0);
console.log('***** Data Log Likelihood *****');
console.log(dataLogLikelihood);

console.log('\n***** Forward Matrix *****');
printMatrix(forwardMatrix);

console.log('\n***** Backward Matrix *****');
printMatrix(backwardMatrix);

console.log('\n***** MAP Matrix *****');
printMatrix(mapMatrix);

console.log('\n***** Posterior Decoding Array *****');
console.log(posteriorDecodingArray);

function printMatrix(mat) {
    states.forEach(state => {
        console.log(state + ': ' + mat[state]);
    });
}