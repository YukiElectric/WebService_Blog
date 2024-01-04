const UserModel = require('../models/user');
const token = require('../../libs/token');

exports.login = async (req, res) => {
    const {email} = req.body;
    const account = await UserModel.find({email});
    if(account.length == 0) {
        res.status(400).json({
            status : "Failed",
            message : "Account does not exist"
        })
    }else {
        const accessToken = token(account[0]._id, account[0].admin);
        res.status(200).json({
            status : "Success",
            data : {
                token : accessToken,
                id : account[0]._id,
                isAdmin : account[0].admin
            }
        })
    }
}

exports.register = async (req, res) => {
    const {email, email_name, email_picture} = req.body;
    const account = await UserModel.find({email});
    if(account.length != 0) {
        res.status(409).json({
            status : "Failed",
            message : "Account already exists"
        })
    }else {
        const newUser = {email, email_name, email_picture};
        await UserModel(newUser).save();
        const userAfterInsert = await UserModel.findOne({email});
        const accessToken = token(userAfterInsert._id, false);
        res.status(200).json({
            status : "Success",
            data : {
                token : accessToken,
                id : userAfterInsert._id,
                isAdmin : false
            }
        })
    }
}