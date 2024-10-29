import mongoose from "mongoose";

const qaSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  asnwer: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true
  }
})




export const QA = mongoose.model("QA", qaSchema)