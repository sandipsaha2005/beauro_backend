
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';

import { Logo } from "../models/logoSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const createLogo = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'Heading image and image are required.' });
    }
    const imageBase64 = req.files.file.data.toString('base64');

    const newLogo = new Logo({
      logo: imageBase64,
    });

    await newLogo.save();

    res.status(201).json({
      message: 'Logo created successfully',
      success: true
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const updateBlog = async (req, res, next) => {
  try {
    const { title, description, author, content, tags } = req.body;
    const blogId = req.params.id;

    // Find the blog by ID
    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Convert the new images to Base64 if provided
    let headingImagesBase64 = blog.headingImages;  // Keep existing headingImage
    let imageBase64 = blog.image;  // Keep existing image

    if (req.files) {
      if (req.files.headingImages) {
        headingImagesBase64 = req.files.headingImages.data.toString('base64');
        headingImagesBase64 = `data:${req.files.headingImages.mimetype};base64,${headingImagesBase64}`;
      }
      if (req.files.image) {
        imageBase64 = req.files.image.data.toString('base64');
        imageBase64 = `data:${req.files.image.mimetype};base64,${imageBase64}`;
      }
    }

    // Update blog post details
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.author = author || blog.author;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.headingImages = headingImagesBase64;  // Update heading image
    blog.image = imageBase64;  // Update image

    // Save the updated blog post
    await blog.save();

    res.status(200).json({
      message: 'Blog post updated successfully',
      blog: blog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const getAllLogo = async (req, res, next) => {
  try {
    const allLogo = await Logo.find();

    res.status(200).json({
      message: 'All blogs fetched Successfully',
      success: true,
      logos: allLogo
    })
  } catch (error) {
    console.log(error);

  }


}





export const deleteLogo = async (req, res, next) => {
  try {
    
    
    const { _id } = req.body;

    if (!_id) {
      return next(new ErrorHandler("Please provide required details"));
    }

    // Delete the blog by ID
    const logo = await Logo.findByIdAndDelete(_id);
    console.log(logo);
    
    if (!logo) {
      return next(new ErrorHandler("Logo not found"));
    }

    // Delete associated QA by blogId

    res.status(200).json({
      success: true,
      message: "Logo deleted successfully",
    });
  } catch (error) {
    console.log(error);
    
    // next(error); // Pass the error to the global error handler
  }
};
