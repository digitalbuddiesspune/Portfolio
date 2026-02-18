import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "e-commerce development",
        "website development",
        "app development",
        "game development",
        "saas",
        "salesforce development",
        "cloud based development",
        "custom software development",
      ],
    },

    webType: {
      type: String,
      default: "",
      trim: true,
    },

    websiteLink: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String, // Cloudinary URL
      required: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);