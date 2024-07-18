
import {Router} from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    getPosts,
    searchPosts,
    updatePost
} from "../controllers/postsController";

const router: Router = Router();
router.get('/', getPosts);
router.get('/:search', searchPosts);
router.get('/:admin', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);




export default router