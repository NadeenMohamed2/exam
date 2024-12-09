import { Schema, model } from "mongoose"

const jobSchema = new Schema(
  {
    jobTitle: String,
    jobLocation: { type: String, enum: ['onsite', 'remotely', 'hybrid'] },
    workingTime: { type: String, enum: ['part-time', 'full-time'] },
    seniorityLevel: { type: String, enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'] },
    jobDescription: String,
    technicalSkills: [String],
    softSkills: [String],
    addedBy: { type: Schema.Types.ObjectId, ref: 'Company' },
  },
  {
    versionKey: false,
    timestamps: { updatedAt: false }
  }
);

export const Job = model('Job', jobSchema)
