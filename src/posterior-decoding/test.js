'use strict';

const assert = require('assert');
const forward = require('./forward');

testForward();
// test2();

function testForward() {
    const states = ['A', 'B'];
    const observations = '00';
    const transition_probability = {
        'A': { 'A': 0.2, 'B': 0.8 },
        'B': { 'A': 0.8, 'B': 0.2 },
    };
    const emission_probability = {
        'A': { '0': 0.9, '1': 0.1 },
        'B': { '0': 0.1, '1': 0.9 },
    };
    const start_probability = {
      'A': 1,
      'B': 0,
    };

    const expected = {
        A: [-0.045757490560675115, -0.790484985457369],
        B: [Number.NEGATIVE_INFINITY, -1.1426675035687315],
    };

    const result = forward(observations, states, transition_probability, emission_probability, start_probability, Math.log10);

    assert.deepEqual(result, expected);
}

function test2() {
    const states = ['A', 'B'];
    const observations = '11000010011111111000';
    const transition_probability = {
        'A': { 'A': 0.2, 'B': 0.8 },
        'B': { 'A': 0.8, 'B': 0.2 },
    };
    const emission_probability = {
        'A': { '0': 0.9, '1': 0.1 },
        'B': { '0': 0.1, '1': 0.9 },
    };

    const expected = {
    };

    const result = forward(observations, states, transition_probability, emission_probability, Math.log);

    // assert.deepEqual(result, expected);
}