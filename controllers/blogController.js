import { Blog } from "../models/blogSchema.js";
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import { QA } from "../models/qa.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, description, author, content, tags, qa, metaKeywords, metaDescription, metaTitle } = req.body;
    // console.log(req.body);
    // console.log(req.files);

    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'Heading image and image are required.' });
    }

    if (qa.length < 0) {
      return res.status(400).json({ message: 'Provide atleast on Q&A' });
    }

    const imageBase64 = req.files.file.data.toString('base64');

    const newBlog = new Blog({
      title,
      description,
      author,
      content,
      tags,
      image: imageBase64,
      metaKeywords,
      metaDescription,
      metaTitle
    });

    await newBlog.save();

    // console.log(newBlog?._id?.toString());

    const questionAns = JSON.parse(qa)

    questionAns?.forEach(async (element) => {
      const { question, ans } = element;
      const questionAns = new QA({
        question,
        asnwer: ans,
        blogId: newBlog?._id?.toString()
      })
      await questionAns.save();
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog: newBlog,
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

export const getAllBlog = async (req, res, next) => {
  try {
    const allBlog = await Blog.find();

    res.status(200).json({
      message: 'All blogs fetched Successfully',
      success: true,
      blogs: allBlog
    })
  } catch (error) {
    console.log(error);

  }


}

export const getOneBlog = async (req, res, next) => {
  try {
    const { id } = req.body;
    const blog= await Blog.findOne({_id:id});

    res.status(200).json({
      message:'Blog fetched Successfully',
      blog:blog,
      success:true
    })
  } catch (error) {
    console.log(error);
    
  }


}

export const getQa = async (req, res, next) => {
  try {
    const { blogId } = req.body;
    
    const getQas = await QA.find({ blogId }); // Add await to resolve the Promise
    console.log(getQas);
    
    res.status(200).json(getQas); // Send the result as a response, if needed
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
