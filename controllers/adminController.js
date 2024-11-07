import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js'

import { Admin } from '../models/adminSchema.js'
import jwt, { decode } from 'jsonwebtoken'



export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provid requried details", 400));
    }

    const AdminUser = await Admin.findOne({ email }).select("+password");


    if (!AdminUser) {
        return next(new ErrorHandler("Admin not found", 400));
    }

    const isPasswordMatched = await AdminUser.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Admin not found", 400));
    }
    const options = {
        expiresIn: process.env.TOKEN_EXPIRE // Token will expire in 1 hour
    };
    // console.log(process.env.JWT_SECRET_KEY);

    const token = jwt.sign({ email }, process.env.JWT_ADMIN_SECRET_KEY, options);

    res.status(200).json({
        success: true,
        message: "You have Successfully Logged In",
        accessToken: token,
    });
})
export const me = catchAsyncError(async (req, res, next) => {
    try {
        const obj = req.user
 
        const user = await Admin.findOne({ email: obj.email });
        res.status(200).json({
            user: {
                id: user?._id,
                username: user?.adminName,
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
        const { adminName, password, email, phone } = req.body;
        if (!adminName || !password || !email || !phone) {
            return next(new ErrorHandler("Please provid requried details", 400));
        }
        const alreadyPresentAdmin= await Admin.findOne({email:email});
        
        if(alreadyPresentAdmin){
            return next(new ErrorHandler("Admin already exists",400));
        }

        const AdminDetails = await Admin.create({
            adminName,
            password,
            email,
            phone
        });
        await AdminDetails.save();
        res.status(200).json({
            success: true,
            message: 'Admin Created Successfully.',
            AdminDetails
        })
    } catch (error) {
        console.log(error);
    }
})








