'use strict';

const viterbi = require('./viterbi');

const states = ['B', 'A', '1', '2', '3', 'T']
const observations = 'CCATCGCACTCCGATGTGGCCGGTGCTCACGTTGCCT';
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
const startTransProb = {
        'B': 1,
        'A': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        'T': 0,
    }

const result = viterbi(observations, states, transition_probability, emission_probability, startTransProb, Math.log);

console.log('Total Probability\n', result.totalProb);
console.log('annotations\n', result.annotations);
console.log('probabilites\n', result.probabilites);
