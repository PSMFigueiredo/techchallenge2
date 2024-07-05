"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController_1 = require("../controllers/postsController");
const router = (0, express_1.Router)();
router.get('/', postsController_1.getPosts);
router.get('/:id', postsController_1.getPostById);
router.post('/', postsController_1.createPost);
router.put('/:id', postsController_1.updatePost);
router.delete('/:id', postsController_1.deletePost);
router.get('/:search', postsController_1.searchPosts);
router.get('/:admin', postsController_1.getAllPosts);
exports.default = router;