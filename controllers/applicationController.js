// controllers/ApplicationController.js
import Joi from "joi";
import ApplicationForm from "../models/applicationSchema.js";

// Define Joi validation schema for text fields and files
const formSchema = Joi.object({
  textFields: Joi.object({
    field1: Joi.string().required(),
    field2: Joi.string().required(),
    field3: Joi.string().required(),
    field4: Joi.string().required(),
    field5: Joi.string().required(),
    field6: Joi.string().required(),
    field7: Joi.string().required(),
    field8: Joi.string().required(),
    field9: Joi.string().required(),
    field10: Joi.string().required(),
  }).required(),
  files: Joi.array()
    .items(
      Joi.object({
        originalname: Joi.string().required(),
        buffer: Joi.binary().required(),
        mimetype: Joi.string().valid("application/pdf").required(),
      })
    )
    .length(10)
    .required(),
});

// Controller function to handle form submission
export const submitApplication = async (req, res) => {
  try {
    // Validate text fields and files
    const validationResult = formSchema.validate({
      textFields: req.body,
      files: req.files,
    });

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
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
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application." });
  }
};
