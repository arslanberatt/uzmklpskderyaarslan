const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
    path2:{type:String, require}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
