import mongoose from "mongoose";


// This model represents jobs posted by work providers

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    duration: { type: String, required: true }, // e.g., "2 days", "1 week"
    compensation: { type: Number, required: true },
    requiredSkill: { type: String, required: true }, // Skill needed, e.g., "Plumber"
    status: { type: String, default: "Open" }, // Open, In Progress, Completed, Canceled
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" }, // Assigned worker
    ratingGiven: { type: Boolean, default: false }, // Indicates if rating has been provided
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
