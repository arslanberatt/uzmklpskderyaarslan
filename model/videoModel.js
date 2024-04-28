const mongoose = require('mongoose');
const Schema = mongoose.Schema

const videoSchema = new Schema({
    title:{type:String, require},
    ifreamUrl:{type:String, require}
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
