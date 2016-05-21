# HMM

#### How to run
- Install node
- Clone this repository
- Viterbi: run `npm run start:viterbi`
- Posterior Decoding: run `npm run start:posterior-decoding`
- Viterbi Training: run `sh src/gene-hmm-train/viterbi-training-example.sh`
- Baum Welch: run `sh src/gene-hmm-train/baum-welch-example.sh`

#### This is a small project that:
- Computes the most likely annotations of a sequence given an HMM (Viterbi algorithm).
- Computes the posterior-decoding (using the Forward and Backward algorithms).
- Inferring parameters for an HMM (using Viterbi training or Baum-Welch).


That project handled as an homework assignment for the course: "Algorithms in Computational Biology".