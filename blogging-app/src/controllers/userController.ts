import {Request, Response} from "express";
import User from "../models/User";
import jwt from "jsonwebtoken"


interface CustomError extends Error {};


export const registrarUsuario = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        const error = err as CustomError;
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (err) {
        const error = err as CustomError;
        res.status(500).json({ message: error.message });
    }
};
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = await User.findById(req?.user?.id).select("-password");
        res.json(user);
    } catch (err) {
        const error = err as CustomError;
        res.status(500).json({ message: error.message });
    }
};