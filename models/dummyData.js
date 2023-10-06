const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        
    },
    countryiso3code: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Data', dataSchema, 'datas');