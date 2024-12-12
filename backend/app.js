const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn")
const User = require("./routes/user");
const Books = require("./routes/book")
app.use(express.json());


app.use("/api/v1",User)
app.use("/api/v1",Books)
app.listen(process.env.PORT,()=>{
  console.log(`Server Started ${process.env.PORT}`);
  
});