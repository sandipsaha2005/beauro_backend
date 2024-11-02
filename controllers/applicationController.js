// controllers/ApplicationController.js
import Joi from "joi";
import ApplicationForm from "../models/applicationSchema.js";

// Define Joi validation schema for text fields and files
const formSchema = Joi.object({
  textFields: Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be a valid 10-digit Indian number",
      }),
    email: Joi.string().email().required(),
    city: Joi.string().required(),
    pin: Joi.string().required(),
    dist: Joi.string().required(),
    state: Joi.string().required(),
    certificationName: Joi.string().required(),
    category: Joi.string().required(),
    licenseType: Joi.string(),
    companyName: Joi.string(),
    ownerName: Joi.string(),
    designation: Joi.string(),
  }).required(),
  files: Joi.array()
    .items(
      Joi.object({
        originalname: Joi.string()
          .pattern(/^[\w,\s-]+\.(pdf|jpg|jpeg)$/i)
          .required()
          .messages({
            "string.pattern.base":
              "File name must end with .pdf, .jpg, or .jpeg",
          }),
        mimetype: Joi.string()
          .valid("application/pdf", "image/jpeg")
          .required()
          .messages({
            "string.valid": "Only PDF and JPG files are allowed",
          }),
      })
    )
    .length(10)
    .required()
    .messages({
      "array.length": "Exactly 10 files are required",
    }),
});

// Controller function to handle form submission
export const submitApplication = async (req, res) => {
  try {
    // Validate text fields
    const { error } = formSchema.validate(
      {
        textFields: req.body,
        files: req.files,
      },
      { abortEarly: false } // Collect all validation errors
    );

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ error: errors });
    }

    // Validate if 10 files are uploaded
    if (req.files.length !== 10) {
      return res.status(400).json({ error: "Exactly 10 files are required" });
    }

    // Convert files to base64 and store in array
    const files = req.files.map((file) => ({
      name: file.originalname,
      data: file.buffer.toString("base64"),
    }));

    // Create and save new application form
    const applicationForm = new ApplicationForm({
      textFields: req.body,
      files,
    });

    await applicationForm.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({
      error:
        error.message ||
        "An unexpected error occurred while submitting the application.",
    });
  }
};
