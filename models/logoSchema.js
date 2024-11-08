import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },

})




export const Logo = mongoose.model("Logo", logoSchema)