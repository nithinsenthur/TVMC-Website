import nodemailer from "nodemailer"
import dotenv from "dotenv"

if (process.env.NODE_ENV !== 'production') dotenv.config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS
    }
})

export default transporter