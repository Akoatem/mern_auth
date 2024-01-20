
import User from '../models/User.js';
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';
import jwt  from 'jsonwebtoken';

// create user
export const registerController = async(req, res, next)=>{
    const {username, email, password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password:hashedPassword})
    try {
        await newUser.save()
   res.status(201).json({
        message:"New user created successfully"
      }) 
    } catch (error) {
        next(error)
    } 
}

// login user

export const loginController = async(req, res, next)=>{
    const {username, password} = req.body
    try {
        const validUser = await User.findOne({username})
        if(!validUser){
            return next(errorHandler(404, "user not found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(401, "invalid credentials"))
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_KEY)
        // to hide the password
        const {password:hashedPassword, ...rest} = validUser._doc
        // to add expiring date
        const expiryDate = new Date(Date.now() + 360000)
        res.cookie('access_token', token, {httpOnly:true, expires:expiryDate})
        .status(200)
        .json(rest)
        
    } catch (error) {
        next(error)
    } 
}


// google login

export const googleController = async(req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
           const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
           const {password:hashedPassword, ...rest} = user._doc
        const expiryDate = new Date(Date.now() + 360000)
        res.cookie('access_token', token, {httpOnly:true, expires:expiryDate})
        .status(200)
        .json(rest)
     }else{
        const generatedPassword = Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = new User({
            // to convert username to name
            username: req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
            email: req.body.email, password: hashedPassword,
            profilePicture:req.body.photo})
            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_KEY)

            const {password:hashedPassword2, ...rest} = newUser._doc
            const expiryDate = new Date(Date.now() + 360000)
            res.cookie('access_token', token, {httpOnly:true, expires:expiryDate})
            .status(200)
            .json(rest)
     }
        
    } catch (error) {
        next(error)
    } 
}

export const logoutController = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
  };
  
