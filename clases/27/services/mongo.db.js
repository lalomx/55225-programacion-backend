const mongoose = require('mongoose')
const config = require('../config/config')



class Mongo {
    connect() {
        return mongoose.connect(config.MONGO_URL) 
    }

    disconnect() {
        return mongoose.disconnect()
    }
}

module.exports = new Mongo()