import nodemailer from "nodemailer";
import { emailHtml } from "./emailHtml.js";
import jwt from "jsonwebtoken"


export const sendEmails = async (email, userName) => {


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mohamed.shahata282@gmail.com",
            pass: "dlmppxckpphoozzo",
        },
    });

    jwt.sign({ email }, 'verifyToken', async (err, token) => {
        const info = await transporter.sendMail({
            from: '"Saraha app 👻" <mohamed.shahata282@gmail.com>',
            to: email,
            subject: "Hello ✔",
            html: emailHtml(userName, token),
        });

        console.log("Message sent: %s", info.messageId);
    })
}