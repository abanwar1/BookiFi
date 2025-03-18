// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// require("./conn/conn")
// const User = require("./routes/user");
// const Books = require("./routes/book")
// const Favourite = require("./routes/favourite")
// const Cart = require("./routes/cart")
// const Order = require("./routes/order")

// app.use(cors());
// app.use(express.json());
// const PORT = process.env.PORT || 3000
// app.get("/",(req,res)=>{
//   res.send("Backend is working");
// })
// app.use("/api/v1",User)
// app.use("/api/v1",Books)
// app.use("/api/v1",Favourite)
// app.use("/api/v1",Cart)
// app.use("/api/v1",Order)
// app.listen(PORT,()=>{
//   console.log(`Server Started ${PORT}`);
  
// });

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Define routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

module.exports = app; // Export app for Vercel
