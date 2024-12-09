import { Schema, model } from "mongoose"

const applicationSchema = new Schema(
    {
        jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        userTechSkills: [String],
        userSoftSkills: [String],
        userResume: String,
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

applicationSchema.post('find', function (docs) {
    docs.forEach(val => {
        val.userResume = "http://localhost:3000/" + val.userResume
    });
})

export const Application = model('Application', applicationSchema)