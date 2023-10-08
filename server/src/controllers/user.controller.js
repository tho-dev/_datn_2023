import User from '../models/user.model';
import UserVerification from '../models/user-verifi-cation.model';
import RefreshToken from '../models/refresh-token.model';
import { userSchema } from '../validations';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { sendEmail, sendVerificationEmail } from '../utils/email';
import { loginShema } from '../validations/auth';
import createError from 'http-errors';
import { signAccessToken, signRefreshToken } from '../middleware/jwt.middleware';
import randomstring from 'randomstring';
import resetPassWordModel from '../models/reset-password.model';
import pug from 'pug';

export async function getAllUser(req, res, next) {
  try {
    const { _page = 1, _sort = 'createdAt', _order = 'asc', _limit = 10 } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == 'desc' ? -1 : 1,
      },
    };
    const { docs, ...paginate } = await User.paginate({}, options);
    if (!docs) {
      throw createError.NotFound('Không tìm thấy sản phẩm');
    }
    return res.json({
      status: 200,
      message: 'Thành công',
      data: {
        docs,
        paginate,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getOneUser(req, res, next) {
  try {
    const { id } = req.params.id;
    const user = await User.findById({ id });
    if (!user) throw createError.NotFound('Không tìm thấy user');
    return res.json({
      status: 200,
      message: 'Thành công',
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
      throw createError.BadRequest(errors);
    }

    const userExit = await User.findOne({ email: email });
    if (userExit) {
      throw createError.BadRequest('Email này đã tồn tại');
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
export async function verifyEmail(req, res, next) {
  try {
    const { userId, uniqueString } = req.params;

    const userVerify = await UserVerification.find({ user_id: userId });

    if (!userVerify) {
      let message = 'An error occurred while verifying the user failed. Please sign up or login again.';
      return res.redirect(`/user/verified/error=true&message=${message}`);
    }
    const { expires_at } = userVerify[0];
    const hashUnique = userVerify[0].uniqueString;

    if (expires_at < Date.now()) {
      const result = await UserVerification.deleteOne({ user_id: userId });
      if (result) {
        await User.deleteOne({ user_id: userId });
        let message = ' Link has expired. please sign up again.';
        return res.redirect(`/user/verified/error=true&message=${message}`);
      }
    } else {
      const checkUnique = await bcrypt.compare(uniqueString, hashUnique);
      if (checkUnique) {
        User.updateOne({ _id: userId }, { verified: true }).then(() => {
          UserVerification.deleteOne({ user_id: userId }).then(() => {
            res.sendFile(path.join(__dirname, './../views/verified.html'));
          });
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

export const verifiedEmail = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, './../views/verified.html'));
  } catch (error) {
    next(error);
  }
};

export async function updateUser(req, res, next) {
  try {
    const user_updated = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!user_updated) {
      throw createError.BadRequest('Cập nhật thất bại');
    }
    return res.json({
      status: 200,
      message: 'Cập nhật Thành công',
      data: user_updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserPassword(req, res, next) {
  try {
    const { password, new_password, new_confirm_password } = req.body;
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      throw createError.NotFound('Không tìm thấy user');
    }
    const isMatchPassWord = await bcrypt.compare(password, user.password);

    if (!isMatchPassWord) {
      throw createError.BadRequest('Mật khẩu không chính xác');
    }
    if (new_password.length < 6) {
      throw createError.BadRequest('Mật khẩu mới phải lớn hơn 6 ký tự');
    }
    const hash_password = await bcrypt.hash(new_password, 10);

    const user_updated = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        password: hash_password,
        confirm_password: new_confirm_password,
      },
      { new: true }
    );
    if (!user_updated) {
      throw createError.BadRequest('Cập nhật thất bại');
    }
    return res.json({
      status: 200,
      message: 'Cập nhật mật khẩu Thành công',
      data: user_updated,
    });
  } catch (error) {
    next(error);
  }
}

export const sendOtp_resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Tìm người dùng trong cơ sở dữ liệu bằng email
    const user = await User.findOne({ email });
    if (!user) {
      throw createError.NotFound('Không tìm thấy người dùng với địa chỉ email này.');
    }
    const resetPassModel = await resetPassWordModel.findOne({
      user_id: user._id,
    });
    if (resetPassModel) {
      throw createError.BadRequest('Mã Otp vẫn còn hiệu lực vui lòng đợi 5p');
    }

    const opt_length = 6;
    const otp_code = randomstring.generate({
      length: opt_length,
      charset: 'numeric',
    });
    const hash_otp = await bcrypt.hash(otp_code, 10);
    await resetPassWordModel.create({
      user_id: user._id,
      otp_code: hash_otp,
    });
    const templatePath = path.join(__dirname, './../views/verifyPassword.pug');
    const templateEmail = pug.renderFile(templatePath, {
      otp: otp_code,
    });
    await sendEmail(user, 'Mã OTP', templateEmail);
    return res.json({
      status: 200,
      message: 'Mã Otp đã được gửi đến email của bạn',
      data: otp_code,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassWord = async (req, res, next) => {
  try {
    const { email, new_password, otp_code } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      throw createError.NotFound('Không tìm thấy người dùng với địa chỉ email này.');
    }
    const resetPassModel = await resetPassWordModel.findOne({
      user_id: user._id,
    });
    console.log(resetPassModel);
    if (!resetPassModel) {
      throw createError.BadRequest('Không tìm thấy mã otp hoặc mã otp hết hạn');
    }

    const is_otp = await bcrypt.compare(otp_code, resetPassModel.otp_code);
    console.log(is_otp);
    if (!is_otp) {
      throw createError.BadRequest('Mã otp không đúng');
    }
    const hash_password = await bcrypt.hash(new_password, 10);
    user.password = hash_password;
    user.confirm_password = new_password;
    console.log('user_new', user);
    await user.save();
    await resetPassModel.deleteOne();

    return res.json({
      status: 200,
      message: 'Thay đổi mật khẩu thành công',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginShema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      throw createError.BadRequest(errors);
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError.BadRequest('Email không tồn tại');
    }
    if (!user.verified) {
      throw createError.Unauthorized('Email chưa được xác thực');
    }
    const isMatchPassWord = await bcrypt.compare(password, user.password);
    if (!isMatchPassWord) {
      throw createError.BadRequest('Mật khẩu không chính xác');
    }

    const accessToken = await signAccessToken(user);
    const refreshToken = await signRefreshToken(user);

    const optionsCookies = {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    };

    res.cookie('refreshToken', refreshToken, optionsCookies);
    res.cookie('loggedIn', 'true', optionsCookies);

    return res.json({
      status: 200,
      message: 'Đăng nhập thành công',
      accessToken,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export async function logout(req, res, next) {
  try {
    const refreshToken = req?.cookies?.refreshToken;
    const userToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    const optionsCookies = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };
    res.clearCookie('refreshToken');
    res.cookie('loggedIn', 'false', optionsCookies);

    if (!userToken) {
      return res.json({
        message: 'logged out successfully',
      });
    }

    await userToken.deleteOne();

    return res.json({
      status: 200,
      message: 'logged out successfully',
    });
  } catch (error) {
    next(error);
  }
}
