import mongoose from "mongoose";

//this model represents users who post jobs to find skilled workers.

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String }, // URL of the profile image
    phone: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    ratings: { type: [Number], default: [] }, // Array of ratings received
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
