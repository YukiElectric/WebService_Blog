const mongoose = require('../../common/database')();

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    email_name : {
        type : String,
        required : true
    },
    email_picture : {
        type : String,
        required : true
    },
    admin : {
        type : Boolean,
        default : false
    }
}, {timestamps : true});

const UserModel = mongoose.model("Users", UserSchema, "users");

module.exports = UserModel;