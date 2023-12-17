import nodemailer from "nodemailer";
import dotenv from "dotenv";
import pug from "pug";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import bcrypt from "bcryptjs";
import UserVerification from "../models/user-verifi-cation.model";

dotenv.config();

export async function sendEmail(user, subject, html) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: `Hệ thống Poly-Tech ${process.env.USER}`,
      to: user?.email,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
}
export const sendVerificationEmail = async ({ _id, email }, res) => {
  // send email
  let config = {
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  };
  let transporter = nodemailer.createTransport(config);
  const currentUrl = process.env.BE_URL;

  const uniqueString = uuidv4() + _id;
  const templatePath = path.join(__dirname, "./../views/verifyEmail.pug");

  const templateEmail = pug.renderFile(templatePath, {
    url: `${currentUrl + "/user/verify/" + _id + "/" + uniqueString}`,
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: templateEmail,
  };

  const salt = 10;
  const hash_uni = await bcrypt.hash(uniqueString, salt);
  const newUserVerification = await UserVerification.create({
    user_id: _id,
    uniqueString: hash_uni,
    created_at: Date.now(),
    expires_at: Date.now() + 21600000,
  });
  transporter.sendMail(mailOptions).then(() => {
    return res.json({
      status: 201,
      message: "Kiểm tra email của bạn để xác thực tài khoản",
    });
  });
};
