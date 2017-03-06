const run = (...tasks) => {
    const program = [() => {}];

    while (tasks.length) {
        const task = tasks.pop();
        const pos  = program.length - 1;

        program.push(() => task(program[pos]));
    }

    program[program.length - 1]();
};

module.exports = run;
