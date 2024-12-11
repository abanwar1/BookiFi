const router = require("express").Router();
const User = require("../models/user")
//sing-up
router.post("/sing-up", async (req,res) => {
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
    const newUser = new User ({username:username,email:email,password:password,address:address});
    await newUser.save();
    return res.status(200).json({message:"Signup Successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
  }
})
module.exports = router;