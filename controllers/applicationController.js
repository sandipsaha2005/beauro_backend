import Joi from "joi";
import ApplicationForm from "../models/applicationSchema.js";

// Define Joi validation schema for text fields
const formSchema = Joi.object({
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
});

// Controller function to handle form submission
export const submitApplication = async (req, res) => {
  try {
    // Validate that req.body is an array and contains objects
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res
        .status(400)
        .json({ error: "Request body must be a non-empty array" });
    }

    // Validate each object in the array
    const errors = [];
    for (const item of req.body) {
      const { error } = formSchema.validate(item, { abortEarly: false });
      if (error) {
        errors.push(...error.details.map((err) => err.message));
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    // Check if files are provided and are exactly 10
    // if (!req.files || req.files.length !== 10) {
    //   return res.status(400).json({ error: "Exactly 10 files are required" });
    // }

    // Convert files to base64 format
    let files = [];
    if (req.files) {
      files = req.files.map((file) => {
        const fileBase64 = file.data.toString("base64");
        return {
          name: file.originalname,
          data: `data:${file.mimetype};base64,${fileBase64}`,
        };
      });
    }

    // Create and save new application forms for each object in the array
    const applicationForms = req.body.map(
      (item) =>
        new ApplicationForm({
          textFields: item,
          files,
        })
    );

    await ApplicationForm.insertMany(applicationForms);
    res.status(201).json({ message: "Applications submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({
      error:
        error.message ||
        "An unexpected error occurred while submitting the application.",
    });
  }
};
