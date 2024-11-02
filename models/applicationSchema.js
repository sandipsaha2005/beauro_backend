// models/ApplicationForm.js
import mongoose from "mongoose";

const applicationFormSchema = new mongoose.Schema({
  textFields: {
    type: Map,
    of: String,
    required: true,
  },
  files: [
    {
      name: String,
      data: String, // Base64-encoded PDF
    },
  ],
});

const ApplicationForm = mongoose.model(
  "ApplicationForm",
  applicationFormSchema
);
export default ApplicationForm;
