const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register Controller
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({ msg: "User Already Exist !" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({ msg: "User Registered Successfully.", user });
};

//Login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found !" });
  }

  const isValidPass = await bcrypt.compare(password, user.password);
  console.log(isValidPass);

  if (!isValidPass) {
    return res.status(401).json({ msg: "Invalid Password" });
  }
  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

  console.log("TOKEN CREATED:", token);
  console.log("FRONTEND URL:", process.env.FRONTEND_URL);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ msg: "Login Successfull", user });
};

//Get User Controller
const getCurrentUser = async (req, res) => {
  const user = await userModel.findById(req.user._id);

  if (!user) {
    return res.status(401).json({ msg: "User not found" });
  }

  res.send(user);
};

// Logout Controller
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({ msg: "Logout successfull." });
};

// Forget password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        msg: "Email is required",
      });
    }

    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        msg: "No account found with this email",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires after 10 minutes
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtp = otp;
    user.resetOtpExpires = otpExpires;

    await user.save();

    // Send OTP email
    const { Resend } = require("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [user.email],
      subject: "Velocity Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">
          
          <h1 style="color: #172554;">Velocity</h1>

          <h2>Password Reset</h2>

          <p>Hi ${user.firstName},</p>

          <p>
            We received a request to reset your Velocity account password.
          </p>

          <p>Your OTP is:</p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            background: #f1f5f9;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
          ">
            ${otp}
          </div>

          <p style="margin-top: 20px;">
            This OTP will expire in <strong>10 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset, you can safely ignore
            this email.
          </p>

          <p>
            Thank you,<br />
            <strong>Velocity Team</strong>
          </p>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        msg: "Failed to send OTP email",
      });
    }

    console.log("Password reset email sent:", data);

    return res.status(200).json({
      msg: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        msg: "Email, OTP and new password are required",
      });
    }

    // Find the user
    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // Check OTP
    if (user.resetOtp !== otp) {
      return res.status(400).json({
        msg: "Invalid OTP",
      });
    }

    // Check OTP expiry
    if (!user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({
        msg: "OTP has expired",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    //savw hashed password
    user.password = hashedPassword;

    // Clear OTP after successful reset
    user.resetOtp = null;
    user.resetOtpExpires = null;

    await user.save();

    return res.status(200).json({
      msg: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
};
