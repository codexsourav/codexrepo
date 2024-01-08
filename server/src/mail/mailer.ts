import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import env from "dotenv";
env.config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILMAIL,
        pass: process.env.EMAILPASS,
    },
});

async function sendNewEmail(to: string, subject: string, html: string): Promise<SMTPTransport.SentMessageInfo> {
    const info = await transporter.sendMail({
        from: 'From: ' + to,
        to: process.env.EMAILSLIST,
        subject: subject,
        html: html,
    });
    return info;
}

export default sendNewEmail;
