const mongoose = require('../../common/database')();

const CommentSchema = new mongoose.Schema({
    blog_id : {
        type : mongoose.Types.ObjectId,
        ref : "Blogs",
        required : true
    },
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : "Users",
        required : true
    },
    content : {
        type : String,
        required : true
    }
}, {timestamps : true});

const CommentModel = mongoose.model('Comments', CommentSchema, "comments");

module.exports = CommentModel;