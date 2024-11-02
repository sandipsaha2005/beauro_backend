import mongoose from "mongoose";

const inQuirySchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  }
  
})




export const Inq = mongoose.model("Inq", inQuirySchema)