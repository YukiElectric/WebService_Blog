const CommentModel = require('../models/comment');
const pagination = require('../../libs/pagination');

exports.index = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const comments = CommentModel.find({}).populate({path : "user_id"}).sort({_id : -1}).limit(limit).skip(skip);
    res.status(200).json({
        status : "Success",
        filter : {
            page,
            limit
        },
        data : {
            docs : comments
        },
        pages : await pagination(CommentModel, page, limit, {})
    })
}

exports.show = async (req, res) => {
    const query = {};
    query.blog_id = req.params.id;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const comment = await CommentModel.find(query).populate({path : "user_id"}).sort({_id : -1}).limit(limit).skip(skip);
    res.status(200).json({
        status : "Success",
        filter : {
            page,
            limit
        },
        data : {
            docs : comment
        },
        pages : await pagination(CommentModel, page, limit, query)
    })
}

exports.create = async (req, res) => {
    const blog_id = req.params.id;
    const {content} = req.body;
    const user_id = req.user.id;
    const newComment = {blog_id, user_id, content};
    await CommentModel(newComment).save();
    res.status(200).json({
        status: "Success",
        message : "Create comment successfully"
    })
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const {content} = req.body;
    await CommentModel.findByIdAndUpdate(id, {content});
    res.status(200).json({
        status : "Success",
        message : "Update comment successfully"
    })
}

exports.delete = async (req, res) => {
    const blog_id = req.params.id;
    await CommentModel.findByIdAndDelete(blog_id);
    res.status(200).json({
        status : "Success",
        message : "Delete comment successfully"
    })
}