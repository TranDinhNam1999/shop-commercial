'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECOND = 5000


const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connection:: ${numConnection}`);
}

// check over load
const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length
        const memory = process.memoryUsage().rss;
        const maxConnection = numCores * 5;

        console.log(`Active connection:: ${numConnection}`);
        console.log(`Memory of process:: ${memory / 1024 / 1024} MB`);

        if (numConnection > maxConnection) {
            console.log(`Connection over load`);
            console.log(`Number of connection:: ${numConnection}`);
            console.log(`Number of cores:: ${numCores}`);
            console.log(`Memory:: ${memory}`);
        }

    }, _SECOND)
}

module.exports = {
    countConnect,
    checkOverLoad
}