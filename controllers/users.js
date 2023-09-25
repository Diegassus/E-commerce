import mongoose from "mongoose";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    let errors = [];
    const { username, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword) errors.push({message:"Passwords do not match"});
    if(password.length < 6) errors.push({message:"Password must be at least 6 characters long"});

    if(errors.length > 0) return res.status(400).json(errors);

    const confirm = await User.findOne({email});
    if(confirm) return res.status(400).json({message:"Email already exists"});

    const newUser = new User({username, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.json(newUser);
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"User not found"});

    const match = await user.matchPassword(password);
    if(!match) return res.status(400).json({message:"Wrong password"});

    const token = jwt.sign({id:user._id,role:user.role}, process.env.SECRET, {expiresIn:'1h'});
    res.json({token});
}

export const profile = async (req,res) => { // Consultar su propio perfil
    const user = await User.findById(req.userId);
    if(!user) return res.status(400).json({message:"User not found"});
    res.json(user);
}

export const externProfile = async (req,res) => { // Consultar perfil externo ADMINS
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(400).json({message:"User not found"});
    res.json(user);
}

export const getAllUsers = async (req,res) => {
    const filter = req.query.filter;
    let users;
    switch (filter) {
        case 'admins':
            users = await User.find({role:true});
            break;
        case 'users':
            users = await User.find({role:false});
            break;
        default:
            users = await User.find();
    }
    res.json(users);
}

export const updateUser = async (req,res) => {
    const id = req.params.id;
    const { username, password, confirmPassword } = req.body;
    const errors = [];

    if(password !== confirmPassword) errors.push({message:"Passwords do not match"});
    if(password.length < 6) errors.push({message:"Password must be at least 6 characters long"});

    if(errors.length > 0) return res.status(400).json(errors);

    const user = await User.findById(id);
    if(!user) return res.status(400).json({message:"User not found"});

    const newUser = await new User({username, email: user.email, password});
    newUser.password = await newUser.encryptPassword(password);
    // user.password = await user.encryptPassword(password);
    // user.username = username;
    // user.save();
    
    await User.findByIdAndUpdate(id,{username:newUser.username, password:newUser.password});

    res.json({message:"User updated"});
}

export const profileUpdate = async (req,res) => {
    const id = req.userId;
    const { username, password, confirmPassword } = req.body;
    const errors = [];

    if(password !== confirmPassword) errors.push({message:"Passwords do not match"});
    if(password.length < 6) errors.push({message:"Password must be at least 6 characters long"});

    if(errors.length > 0) return res.status(400).json(errors);

    const user = User.findById(id);
    if(!user) return res.status(400).json({message:"User not found"});

    const newUser = await new User({username, email: user.email, password});
    newUser.password = await newUser.encryptPassword(password);
    // user.password = await user.encryptPassword(password);
    // user.username = username;
    // user.save();
    
    await User.findByIdAndUpdate(id,{username:newUser.username, password:newUser.password});
    res.json({message:"User updated"});
}

export const deleteUser = async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(400).json({message:"User not found"});
    await User.findByIdAndDelete(id);
    res.json({message:"User deleted"});
}