import Order from "../models/Order.js";
import Notification from "../models/Notification.js";

export const createOrder = async (req, res) => {
  try {
    const { mealType, price } = req.body;

    if (!mealType || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const order = await Order.create({
      user: req.user.id,
      mealType,
      price,
    });

    

    res.status(201).json({
      message: "Meal ordered successfully",
      order,
    });
  } catch (error) {
    console.log("Order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

