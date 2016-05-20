'use strict';

const assert = require('assert');
const viterbi = require('./viterbi');

test1();
test2();

function test1() {
    // https://en.wikipedia.org/wiki/Viterbi_algorithm
    const states = ['Healthy', 'Fever']
    const observations = ['normal', 'cold', 'dizzy']
    const transition_probability = {
        'Healthy': { 'Healthy': 0.7, 'Fever': 0.3 },
        'Fever': { 'Healthy': 0.4, 'Fever': 0.6 }
    }
    const emission_probability = {
        'Healthy': { 'normal': 0.5, 'cold': 0.4, 'dizzy': 0.1 },
        'Fever': { 'normal': 0.1, 'cold': 0.3, 'dizzy': 0.6 }
    }
    const startTransProb = {
        'Healthy': 0.5,
        'Fever': 0.5,
    }

    const expected = {
        annotations: ['Healthy', 'Healthy', 'Fever'],
        probabilites: {
            Healthy: [-2, -3.8365012677171206, -7.673002535434241],
            Fever: [-4.321928094887362, -5.473931188332413, -6.310432456049534],
        },
        totalProb: -6.310432456049534,
    }

    const result = viterbi(observations, states, transition_probability, emission_probability, startTransProb, Math.log2);

    assert.deepEqual(result, expected);
}

function test2() {
    // http://homepages.ulb.ac.be/~dgonze/TEACHING/viterbi.pdf
    const states = ['H', 'L'];
    const observations = 'GGCACTGAA';
    const transition_probability = {
        'H': { 'H': 0.5, 'L': 0.5 },
        'L': { 'H': 0.4, 'L': 0.6 }
    };
    const emission_probability = {
        'H': { 'A': 0.2, 'C': 0.3, 'G': 0.3, 'T': 0.2 },
        'L': { 'A': 0.3, 'C': 0.2, 'G': 0.2, 'T': 0.3 },
    };
    const startTransProb = {
        'H': 0.5,
        'L': 0.5,
    };

    const expected = {
        annotations: ['H', 'H', 'H', 'L', 'L', 'L', 'L', 'L', 'L'],
        probabilites: {
            H: [-2.7369655941662066, -5.473931188332413, -8.210896782498619,
                -11.53282487738598, -14.006756065718392, -17.328684160605754,
                -19.539580943104372, -22.861509037991734, -25.65736832121151],
            L:
            [-3.321928094887362, -6.058893689053569, -8.795859283219775,
                -10.947862376664824, -14.006756065718392, -16.480687254050803,
                -19.539580943104372, -22.013512131436787, -24.487443319769202],
        },
        totalProb: -24.487443319769202,
    }

    const result = viterbi(observations, states, transition_probability, emission_probability, startTransProb, Math.log2);

    assert.deepEqual(result, expected);
}