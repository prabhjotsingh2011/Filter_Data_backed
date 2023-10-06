const mongoose = require("mongoose");

async function DbConnect() {
    try {

        const DB_URL = 'mongodb+srv://prabhjot:prabhjot@cluster0.sbdknwx.mongodb.net/';

        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const db =  mongoose.connection

        console.log("database connected sucessfully");

    } catch (error) {
        console.log("error while connecting to database");
        console.log(error);
    }
}

module.exports = DbConnect;