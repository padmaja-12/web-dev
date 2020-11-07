const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Events = new Schema({
    description: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
});
module.exports = mongoose.model('Events', Events);