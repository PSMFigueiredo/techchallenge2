"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.searchPosts = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find();
        res.json(posts);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        res.json(post);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Post_1.default({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    try {
        const savedPost = yield post.save();
        res.status(201).send('Post criado com sucesso!');
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatePost = yield Post_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatePost);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted!' });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.deletePost = deletePost;
const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find({
            $or: [
                { title: { $regex: req.query.q, options: 'i' } },
                { content: { $regex: req.query.q, options: 'i' } }
            ]
        });
        res.json(posts);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.searchPosts = searchPosts;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find();
        res.json(posts);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.getAllPosts = getAllPosts;
