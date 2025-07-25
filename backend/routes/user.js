const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const {authenticateToken} = require("../middleware/auth")
//sing-up
router.post("/sign-up", async (req,res) => {
  try {
    const {username,email,password,address} = req.body;
    //username length check
    if(username.length< 4){
      return res
      .status(400)
      .json({message:"Username length should be greaterthan 3"});
    }
    //username already exist
    const existingUsername = await User.findOne({username:username});
    if(existingUsername) {
      return res
      .status(400)
      .json({message:"Username already exist "});
    }
    //email already exist
    const existingEmail = await User.findOne({email:email});
    if(existingEmail) {
      return res
      .status(400)
      .json({message:"Email already exist"});
    }
    //password length check & bcrypt
    if(password.length<=5){
      return res
      .status(400)
      .json({message:"Password must me length of 6"});
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User ({username:username,email:email,password:hashPassword,address:address});
    await newUser.save();
    return res.status(200).json({message:"Signup Successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
  }
})
//login
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    await bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (isMatch) {
        const token = generateToken(existingUser._id); // using your helper

        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get-user-information
router.get("/get-user-information",authenticateToken, async(req,res)=>{
  try {
    const {id} = req.headers;
    const data  = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
  }
})

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;


    if (!id || !address) {
      return res.status(400).json({ message: "Missing id or address" });
    }

    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;