import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        username: String,
        email: { type: String, unique: true },
        password: String,
        recoveryEmail: String,
        DOB: String,
        mobileNumber: { type: String, unique: true },
        role: { type: String, enum: ['User', 'Company_HR'] },
        status: { type: String, enum: ['online', 'offline'], default: 'offline' },
        otp: String,
        otpExpires: Date,
        otpVerified: {
            type: Boolean,
            default: false,
        }
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const User = model('User', userSchema)
