'use strict';

function printStatus(transProb, emisProb, totalProb) {
    console.log(`|  ${transProb['I']['A'].toFixed(2)}  ${transProb['G3']['T'].toFixed(2)}  ${emisProb['I']['A'].toFixed(2)}  ${emisProb['I']['T'].toFixed(2)}  ${emisProb['I']['C'].toFixed(2)}  ${emisProb['G1']['A'].toFixed(2)}  ${emisProb['G1']['T'].toFixed(2)}  ${emisProb['G1']['C'].toFixed(2)}    ${totalProb.toFixed(4)}  |`);
}

function printHeader(obs, scoreString) {
    console.log(`|  ${obs}`);
    console.log(`|  -----------------------------------------------------------`);
    console.log(`|  I->G  G->I  I->A  I->T  I->C  G->A  G->T  G->C    score (${scoreString})`);
}

exports.printHeader = printHeader;
exports.printStatus = printStatus;
