import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String }, // URL of the profile image
    phone: { type: String, required: true },
    skills: [{ type: String, required: true }], // List of skills, e.g., "Plumber", "Electrician"
    experience: { type: Number, required: true }, // Years of experience
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    range: { type: Number, required: true }, // Range in km they are willing to work
    rating: { type: Number, default: 0 }, // Average rating
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;