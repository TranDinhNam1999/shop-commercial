'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')
const { db: { host, port, name} } = require('../config/config.mongodb')
const connectionString = `mongodb://${host}:${port}/${name}`
class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true})
        }

        mongoose.connect(connectionString, {
            maxPoolSize: 50
        }).then( _ => 
        {
            console.log(`Mongodb Success`, countConnect)
        })
        .catch( err => console.log(`Error Connect!!!`))
    }

    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb