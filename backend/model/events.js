const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Events = new Schema({
    guestNo: {
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
    completed : {
        type : Boolean
    }
});
module.exports = mongoose.model('Events', Events);