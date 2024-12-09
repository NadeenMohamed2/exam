import mongoose from 'mongoose'

export const dbConnection = mongoose.connect('mongodb://localhost:27017/JobSearchApp').then(() => {
    console.log("database connected successfully.");
}).catch((err) => {
    console.log("database error " + err);
})
