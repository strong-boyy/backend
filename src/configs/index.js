require('dotenv').config();

const config = {
    app: {
        port: process.env.APP_PORT,
    }
}

module.exports = config;