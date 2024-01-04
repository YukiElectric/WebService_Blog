const express = require('express');
const router = express.Router();

const middleware = require('../apps/middleware/auth');
const AuthController = require('../apps/controllers/auth');
const BlogController = require('../apps/controllers/blog');
const CommentController = require('../apps/controllers/comment');

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get("/blog", middleware.verifyToken, BlogController.index);

router.get("/blog/:id", middleware.verifyToken, BlogController.show);

router.get("/blog/user/:id", middleware.verifyToken, BlogController.showBlogUser);

router.get("/search", middleware.verifyToken, BlogController.search);

router.post("/blog", middleware.verifyToken, BlogController.create);

router.put("/blog/:id", middleware.verifyToken, BlogController.update);

router.delete("/blog/:id", middleware.verifyToken, BlogController.delete);

router.get("/comment", middleware.adminAuth , CommentController.index);

router.get("/blog/:id/comment", middleware.verifyToken , CommentController.show);

router.post("/blog/:id/comment", middleware.verifyToken, CommentController.create);

router.put("/comment/:id", middleware.verifyToken, CommentController.update);

router.delete("/comment/:id", middleware.verifyToken, CommentController.delete);

module.exports = router;