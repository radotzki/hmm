'use strict';

const assert = require('assert');
const forward = require('./forward');
const backward = require('./backward');
const matrixMultiply = require('./matrixMultiply');
const posteriorDecoding = require('./posteriorDecoding');

testForward();
testBackward();
testMatrixMultiply();
testPosteriorDecoding();

function testForward() {
    const states = ['A', 'B'];
    const observations = '001';
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
        A: [-0.045757490560675115, -0.790484985457369, -1.9894269060373457],
        B: [Number.NEGATIVE_INFINITY, -1.1426675035687315, -0.7916701850362321],
    };

    const result = forward(observations, states, transition_probability, emission_probability, start_probability, Math.log10);

    assert.deepEqual(result, expected);
}

function testBackward() {
    const states = ['A', 'B'];
    const observations = '001';
    const transition_probability = {
        'A': { 'A': 0.2, 'B': 0.8 },
        'B': { 'A': 0.8, 'B': 0.2 },
    };
    const emission_probability = {
        'A': { '0': 0.9, '1': 0.1 },
        'B': { '0': 0.1, '1': 0.9 },
    };

    const expected = {
        A: [-0.6439344964209568, -0.05955402844673724, 0],
        B: [-0.14762423722994938, -0.5134741440870467, 0],
    };

    const result = backward(observations, states, transition_probability, emission_probability, Math.log10);

    assert.deepEqual(result, expected);
}

function testMatrixMultiply() {
    const forwardMatrix = {
        1: [Math.log(1), Math.log(2)],
    };

    const backwardMatrix = {
        1: [Math.log(2), Math.log(2)],
    };

    const expected = {
        1: [2, 4],
    };

    const result = matrixMultiply(forwardMatrix, backwardMatrix);

    assert.deepEqual(result, expected);
}

function testPosteriorDecoding() {
    const mapMatrix = {
        A: [2, 4, 6, 180],
        B: [9, 12, 15, 18],
        C: [600, 7, 80, 9],
    };

    const expected = [
        { state: 'C', postProb: 600 },
        { state: 'B', postProb: 12 },
        { state: 'C', postProb: 80 },
        { state: 'A', postProb: 180 },
    ];

    const result = posteriorDecoding(mapMatrix);

    assert.deepEqual(result, expected);
}

