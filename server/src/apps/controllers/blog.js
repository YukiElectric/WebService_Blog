const BlogModel = require('../models/blog');
const CommentModel = require('../models/comment');
const pagination = require('../../libs/pagination');
const cheerio = require('cheerio');

exports.index = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const blogs = await BlogModel.find({}).sort({ _id: -1 }).skip(skip).limit(limit).populate({ path: "user_id" });
    blogs.map((item) => {
        const $ = cheerio.load(item.content);
        const text = $('p').first().text();
        item.content = text.substring(0, 200);
        return item;
    })
    res.status(200).json({
        status: "Success",
        filter: {
            page,
            limit
        },
        data: {
            docs: blogs
        },
        pages: await pagination(BlogModel, page, limit, {})
    })
}

exports.show = async (req, res) => {
    const id = req.params.id;
    const blog = await BlogModel.findById(id);
    const comments = await CommentModel.find({blog_id : id}).countDocuments();
    res.status(200).json({
        status: "Success",
        data: {
            blog,
            comments
        }
    })
}

exports.showBlogUser = async (req, res) => {
    const query = {};
    const user_id = req.params.id;
    query.user_id = user_id;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const blogs = await BlogModel.find({ user_id }).sort({ _id: -1 }).limit(limit).skip(skip).populate({ path: "user_id" });
    blogs.map((item) => {
        const $ = cheerio.load(item.content);
        const text = $('p').first().text();
        item.content = text.substring(0, 200);
        return item;
    })
    res.status(200).json({
        status: "Success",
        filter: {
            page,
            limit
        },
        data: {
            docs: blogs
        },
        pages: await pagination(BlogModel, page, limit, query)
    })
}

exports.search = async (req, res) => {
    const query = {};
    query.keyword = req.query.keyword || "";
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = limit * (page - 1);
    const blogs = await BlogModel.find().populate({ path: 'user_id' });
    blogs.map((item) => {
        const $ = cheerio.load(item.content);
        const text = $('p').first().text();
        item.content = text.substring(0, 200);
        return item;
    })
    let result = query.keyword == "" ? blogs : blogs.map((item) => {
        const content = item.content;
        const name = item.user_id.email_name;
        const header = item.header;
        if (content.toLowerCase().includes(query.keyword.toLowerCase())
            ||
            name.toLowerCase().includes(query.keyword.toLowerCase())
            ||
            header.toLowerCase().includes(query.keyword.toLowerCase())
            ) {
            return item;
        }
    });
    const totalRow = result.length;
    const totalPages = Math.ceil(totalRow / limit);
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next <= totalPages ? true : false;
    const hasPrev = prev > 0 ? true : false;
    result = result[0] == undefined ? [] : result.slice(skip, skip + 10);
    res.status(200).json({
        status: "Success",
        filter: {
            ...query,
            page,
            limit
        },
        data: {
            docs: result
        },
        pages: {
            totalPages,
            currentPage: page,
            hasNext,
            hasPrev
        }
    })
}

exports.create = async (req, res) => {
    const { content, header } = req.body;
    const id = req.user.id;
    const newBlog = { user_id: id, header, content };
    await BlogModel(newBlog).save();
    res.status(201).json({
        status: "Success",
        message: "Create blog successfully"
    })
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const { header,content } = req.body;
    const data  = {header, content}
    await BlogModel.findByIdAndUpdate(id, data);
    res.status(200).json({
        status: "Success",
        message: "Update blog successfully"
    })
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await BlogModel.findByIdAndDelete(id);
    await CommentModel.deleteMany({ blog_id: id });
    res.status(200).json({
        status: "Success",
        message: "Delete blog successfully"
    })
}
