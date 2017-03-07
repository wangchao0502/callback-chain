const EventEmitter = require('events');
const crypto = require('crypto');

const noop = () => {};
const rdname  = () => crypto.createHash('md5').update('' + Date.now() + Math.random()).digest('hex');

/**
 * 神经递质
 */
// class Neurotransmitter {
//     constructor() {
//         this.info = {};
//     }
// }

/**
 * 神经元
 * task 为神经元处理的工作
 */
class Neuron {
    constructor(task = noop) {
        this.name = rdname();
        this.task = task;
        this.next = noop;
    }

    work(...args) {
        this.task(...args, this.next);
    }
}

class NeuronNet extends EventEmitter {
    constructor(...neurons) {
        super();
        this.end = noop;
        this.net = neurons;
        this.input = null;
        this.taskLength = neurons.length;
        this.listener = {};

        neurons.forEach((neuron, index) => {
            if (!this.listener[neuron.name]) {
                this.listener[neuron.name] = true;
                this.on(neuron.name, (...args) => {

                    if (index === this.taskLength - 1) {
                        // last task
                        neuron.next = (...x) => {
                            this.emit('end', ...x);
                        }
                    } else {
                        neuron.next = (...x) => {
                            this.emit(neurons[index + 1].name, ...x);
                        }
                    }
                    neuron.work(...args);
                });
            }
        });
        this.on('end', (...args) => this.end(...args));
    }

    in(...info) {
        this.input = info;
        return this;
    }

    run() {
        this.emit(this.net[0].name, ...this.input);
        return this;
    }

    out(callback) {
        this.end = callback;
        return this;
    }
}

module.exports = {
    Neuron,
    NeuronNet
};
