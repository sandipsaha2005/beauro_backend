import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
  }
  
})




export const Query = mongoose.model("Query", querySchema)