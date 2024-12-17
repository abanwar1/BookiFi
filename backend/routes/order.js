const router = require("express").Router();
const User = require("../models/user")
const {authenticateToken} = require("./userAuth")
const Order = require("../models/order")

// placed order
router.post("/placed-order",authenticateToken,async(req,res)=>{
  try {
    const {id} = req.headers;
    const {order} = req.body;
    for(const orderData of order){
      const newOrder = new Order({user:id, book:orderData._id});
      const orderDataFromDb = await newOrder.save();
      //saving order in user model
      await User.findByIdAndUpdate(id,{
        $push:{orders:orderDataFromDb._id},
      });
      //clearing cart
      await User.findByIdAndUpdate(id,{
        $pull:{cart:orderData._id},
      })
    }
    return res.json({
      status:"Success",
      message:"Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"An error occured"});
  }
})

//get order history of particular user
router.get("/get-order-history", authenticateToken, async(req,res)=>{
  try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate({
      path:"orders",
      populate:{path:"book"},
    });
    const orderData = userData.orders.reverse();
    return res.json({
      status:"Success",
      data:orderData,
    });
  } catch (error) {
    res.status(500).json({message:"An error occured"});
  }
})

//get all orders ---admin
router.get("/get-all-orders", authenticateToken, async(req,res)=>{
  try {
    const userData = await Order.find().populate({
      path:"book",
    }).populate({
      path:"user",
    }).sort({createdAt:-1});
    return res.json({
      status:"Success",
      data:userData,
    });
  } catch (error) {
    res.status(500).json({message:"An error occured"});
  }
})

router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status }, 
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;