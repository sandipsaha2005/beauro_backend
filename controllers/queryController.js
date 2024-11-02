import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Query } from "../models/querySchema.js";
import { Inq } from "../models/inqurySchema.js";
export const createQuery = catchAsyncError(async (req, res, next) => {
    const { name, title, description, email } = req.body;
    if (!name || !title || !description || !email) {
        return next(new ErrorHandler("Please provide all details.", 400));
    }
    const queryDetails = await Query.create({
        name,
        title,
        email,
        description
    })
    await queryDetails.save();
    res.status(200).json({
        success: true,
        message: "Query sent successfully",
        queryDetails
    })
})

export const getAllQuery = catchAsyncError(async (req, res, next) => {
    try {
        const allQuery = await Query.find();
        res.status(200).json({
            success: true,
            message: "Query fetch Successfully",
            allQuery
        })
    } catch (error) {
        console.log(error);
    }
})

export const createInquiry = catchAsyncError(async (req, res, next) => {
    try {
        const { name, phone, email } = req.body;
        if (!name || !phone || !email) {
            return next(new ErrorHandler("Please provide all details.", 400));
        }
        
        const data = await Inq.create({
            name,
            email,
            phone
        })
        
        res.status(200).json({
            success: true,
            message: "Inquiry sent successfully",
            data
        })

    } catch (error) {
        console.log(error);
        
    }
})

export const getAllInquiry= catchAsyncError(async(req,res,next)=>{
    try {
        const data = await Inq.find();
        res.status(200).json({
            success: true,
            message: "Query fetch Successfully",
            data
        })
    } catch (error) {
        console.log(error);
    }
})
