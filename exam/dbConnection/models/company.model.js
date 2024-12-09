import { Schema, model } from "mongoose"

const companySchema = new Schema(
    {
        companyName: { type: String, unique: true },
        description: String,
        industry: String,
        address: String,
        numberOfEmployees: String,
        companyEmail: String,
        companyHR: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const Company = model('Company', companySchema)
