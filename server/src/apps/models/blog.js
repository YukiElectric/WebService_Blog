const mongoose = require('../../common/database')();

const BlogSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : "Users",
        required : true
    },
    header : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }
}, {timestamps: true});

const BlogModel = mongoose.model("Blogs", BlogSchema, "blogs");

module.exports = BlogModel;