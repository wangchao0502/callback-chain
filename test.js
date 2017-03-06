const run = require('./index');

const funcA = (cb) => {
    console.log('funcA is called');
    cb && cb(value);
};

const funcB = (cb) => {
    setTimeout(() => {
        console.log('funcB is called');
        cb && cb();
    }, 100);    
};

const funcC = () => {
    console.log('funcC is called');
};

run(funcA, funcB, funcC);
