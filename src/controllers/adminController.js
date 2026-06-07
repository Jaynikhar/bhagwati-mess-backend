import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import Attendance from "../models/Attendance.js";
import Notification from "../models/Notification.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
// import Packing from "../models/Packing.js";


export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: "active" });

    const today = new Date().toISOString().split("T")[0];

    const todayAttendance = await Attendance.countDocuments({
      date: today,
      present: true
    });

    res.json({
      totalUsers,
      activeSubscriptions,
      todayAttendance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEarnings = async (req, res) => {
  try {
    const monthlyUsers = await Subscription.countDocuments({ type: "monthly", status: "active" });
    const dailyOrders = await Attendance.countDocuments({ present: true });

    const monthlyIncome = monthlyUsers * 3000;
    const dailyIncome = dailyOrders * 120;

    res.json({
      monthlyIncome,
      dailyIncome,
      totalIncome: monthlyIncome + dailyIncome
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// GET all active subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find()
      .populate("user", "username email");

    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET all daily orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username");

    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// GET all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "username");

    res.json(payments);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};



export const getPackingRequests = async (req, res) => {
  try {
    const notification = await Notification.find()
      .populate("user", "username");

    res.json(notification);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // hide password
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log("Get users error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: "User status updated", isActive: user.isActive });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


