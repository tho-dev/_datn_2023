import User from "../models/user.model";
import UserVerification from "../models/userverification.model";
import { userSchema } from "../validations";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../utils/email";
import { loginShema } from "../validations/auth";

export async function getAllUser(req, res, next) {
  try {
    const users = await User.find({});
    return res.json({
      status: 200,
      message: "Thành công",
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOneUser(req, res, next) {
  try {
    const { id } = req.params.id;
    const user = await User.findById({ id });
    if (!user) return res.json({ status: 404, message: "Thất bại" });
    return res.json({
      status: 200,
      message: "Thành công",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function addUser(req, res, next) {
  try {
    const { password, email } = req.body;
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((items) => items.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res.json({
        status: 400,
        message: "Email này đã tồn tại",
      });
    }
    const hash_password = await bcrypt.hash(password, 10);

    const new_user = await User.create({
      ...req.body,
      password: hash_password,
      verified: false,
    });
    sendVerificationEmail(new_user, res);
  } catch (error) {
    next(error);
  }
}
//verify email
export async function verifyEmail(req, res) {
  try {
    const { userId, uniqueString } = req.params;

    const userVerify = await UserVerification.find({ user_id: userId });

    if (!userVerify) {
      let message =
        "An error occurred while verifying the user failed. Please sign up or login again.";
      return res.redirect(`/user/verified/error=true&message=${message}`);
    }
    const { expires_at } = userVerify[0];
    const hashUnique = userVerify[0].uniqueString;

    if (expires_at < Date.now()) {
      const result = await UserVerification.deleteOne({ user_id: userId });
      if (result) {
        await User.deleteOne({ user_id: userId });
        let message = " Link has expired. please sign up again.";
        return res.redirect(`/user/verified/error=true&message=${message}`);
      }
    } else {
      const checkUnique = await bcrypt.compare(uniqueString, hashUnique);
      if (checkUnique) {
        User.updateOne({ _id: userId }, { verified: true }).then(() => {
          UserVerification.deleteOne({ user_id: userId }).then(() => {
            res.sendFile(path.join(__dirname, "./../views/verified.html"));
          });
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

export const verifiedEmail = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./../views/verified.html"));
  } catch (error) {}
};

export async function updateUser(req, res, next) {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((items) => items.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user_updated = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!user_updated) {
      return res.json({
        status: 404,
        message: "Cập nhật thất bại",
      });
    }
    return res.json({
      status: 200,
      message: "Thành công",
      data: user_updated,
    });
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginShema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        status: 400,
        message: "Email không tồn tại",
      });
    }
    if (!user.verified) {
      return res.json({
        status: 401,
        message: "Email chưa được xác thực",
      });
    }
    const isMatchPassWord = await bcrypt.compare(password, user.password);
    if (!isMatchPassWord) {
      return res.json({
        status: 400,
        message: "Mật khẩu không chính xác",
      });
    }
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    return res.json({
      status: 200,
      message: "Đăng nhập thành công",
      accessToken,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
