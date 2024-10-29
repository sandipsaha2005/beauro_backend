import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Query } from "../models/querySchema.js";

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
