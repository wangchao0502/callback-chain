const CC = require('./index');

const taskA = (value, next) => {
    console.log('TaskA is called', value);
    next();
};
const taskB = (next) => {
    setTimeout(() => {
        console.log('TaskB is called');
        next(200);
    }, 100);
};
const taskC = (value, next) => {
    console.log('TaskC is called', value);
    next('hahaha');
};

const neuronA   = new CC.Neuron(taskA);
const neuronB   = new CC.Neuron(taskB);
const neuronC   = new CC.Neuron(taskC);
const neuronNet = new CC.NeuronNet(neuronA, neuronB, neuronC);
// const neuronNet = new CC.NeuronNet(neuronA, neuronB, neuronC, neuronA);

neuronNet.in(100).out((...args) => console.log(args)).run();