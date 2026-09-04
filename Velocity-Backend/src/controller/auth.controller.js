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

  res.status(201).json({ msg: "User Registered Successfully." , user });
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
  res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000
});

  res.status(200).json({ msg: "Login Successfull" , user});
};

//Get User Controller
const getCurrentUser = async (req,res) => {
  const user = await userModel.findById(req.user._id)
  
  if(!user){
    return res.status(401).json({msg:"User not found"})
  }

  res.send(user)
}

// Logout Controller
const logout = (req,res) => {
  res.clearCookie('token' , {
    httpOnly : true,
    path : '/'
  })

  res.status(200).json({msg:"Logout successfull."})
}
module.exports = { loginUser, registerUser , getCurrentUser , logout};
