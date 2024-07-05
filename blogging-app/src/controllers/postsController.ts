import {Request, Response} from "express";
import Post from "../models/Post";


interface CustomError extends Error {};


export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err){
        const error = err as CustomError;
        res.status(500).json({message: `${error.message}`});
    }
};

export const getPostById = async (req: Request, res: Response)=> {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err){
        const error = err as CustomError;
        res.status(500).json ({message: `${error.message}`});
    }
};
export const createPost = async (req: Request, res: Response)=> {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    try {
        const savedPost = await post.save();
        res.status(201).send('Post criado com sucesso!');
    }catch (err){
        const error = err as CustomError;
        res.status(500).json({message: `${error.message}`});
    }
};

export const updatePost = async (req: Request, res: Response)=> {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatePost);
    } catch (err){
        const error = err as CustomError;
        res.status(500).json({message: `${error.message}`});
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({message: 'Post deleted!'});
    }catch (err){
        const error = err as CustomError;
        res.status(500).json({message:`${error.message}`})
    }
    }

export const searchPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find({
            $or: [
                {title: {$regex: req.query.q, options: 'i'}},
                {content: {$regex: req.query.q, options: 'i'}}
            ]
        });
        res.json(posts);
    }catch (err){
        const error = err as CustomError;
        res.status(500).json({message:`${error.message}`})
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        const error = err as CustomError;
        res.status(500).json({message:`${error.message}`})
    }
}