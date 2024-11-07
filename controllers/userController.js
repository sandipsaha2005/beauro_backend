import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js'
import { User } from '../models/userSchema.js'

import jwt, { decode } from 'jsonwebtoken'



export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provid requried details", 400));
    }

    const user = await User.findOne({ email }).select("+password");


    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("User not found", 400));
    }
    const options = {
        expiresIn: process.env.TOKEN_EXPIRE // Token will expire in 1 hour
    };

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, options);

    res.status(200).json({
        success: true,
        message: "You have Successfully Logged In",
        accessToken: token,
    });
})
export const me = catchAsyncError(async (req, res, next) => {
    try {
        const obj = req.user
        const user = await User.findOne({ email: obj.email });
        res.status(200).json({
            user: {
                id: user?._id,
                username: user?.username,
                email: user?.email,
                phone: user?.phone
            }
        })

    } catch (error) {
        console.log(error);

    }
})
export const register = catchAsyncError(async (req, res, next) => {

    try {
        const { firstName, password, email, phone, lastName } = req.body;

        if (!lastName || !firstName || !password || !email || !phone) {
            return next(new ErrorHandler("Please provid requried details", 400));
        }
        const alreadyPresentUser=await User.findOne({email:email});
  
        
        if(alreadyPresentUser){
            return next(new ErrorHandler("User already present",400))
        }

        const userDetails = await User.create({
            username: `${firstName} ${lastName}`,
            password,
            email,
            phone
        });
        const options = {
            expiresIn: process.env.TOKEN_EXPIRE // Token will expire in 1 hour
        };

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, options);

        await userDetails.save();
        res.status(200).json({
            success: true,
            message: 'User Created Successfully.',
            accessToken: token,
        })
    } catch (error) {
        console.log(error);
    }
})








