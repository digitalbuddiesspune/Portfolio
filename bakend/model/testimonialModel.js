import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    clientLocation: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
