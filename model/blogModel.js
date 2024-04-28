const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{type:String, require},
    content: {type:String, require},
    path:{type:String, require},
    date:{type:String, require}
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
