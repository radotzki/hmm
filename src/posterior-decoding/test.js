'use strict';

const assert = require('assert');
const forward = require('./forward');

test1();

function test1() {
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

    const expected = {
        annotations: ['Healthy', 'Healthy', 'Fever'],
        probabilites: {
            Healthy: [-2, -3.8365012677171206, -7.673002535434241],
            Fever: [-4.321928094887362, -5.473931188332413, -6.310432456049534],
        },
        totalProb: -6.310432456049534,
    }

    const result = forward(observations, states, transition_probability, emission_probability, Math.log);

    // assert.deepEqual(result, expected);
}
