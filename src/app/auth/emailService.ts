import * as nodemailer from 'nodemailer';
import { } from 'nodemailer';

export default class EmailService {

    public static transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USER,  // Your Mail User Here
            pass: process.env.MAIL_PASS   // Your Mail Password Here
        }
    });

    constructor() { }

    public static sendForgotPasswordMail() {

    }

    public static sendEmailForSignup(name, pass, email) {
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "You're successfully signed up",
            html: `
                Your UserName ${name}
                Your Password ${pass}
            `
        };
        this.transporter.sendMail(mailOptions, this.callbackSend);
    }

    public static sendEmailForReset(email,token) {
        const url = `http://localhost:8080/api/v1/reset/${token}`;
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "click on below link to reset your password",
            html: `
                <h3>This is your reset link </h3>
                <p> click on this <a href="${url}">  link to reset your password </a></p>
            `
        };
        this.transporter.sendMail(mailOptions, this.callbackSend);
    }

    private static callbackSend(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(info);
        }
    }
}