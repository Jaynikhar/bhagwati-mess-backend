import Subscription from "../models/Subscription.js";
import Nosubscription from "../models/Nosubscription.js";
import Notification from "../models/Notification.js";

export const createSubscription = async (req, res) => {
  try {
    const { plan, joinDate, price } = req.body;

    if (!plan || !joinDate || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      joinDate,
      price,
    });

  
    res.status(201).json({
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    console.log("Subscription error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });

    if (!subscription) {
      res.json(Nosubscription );
    }else{
      res.json(subscription); // ✅ send direct object

    }

    // res.json(subscription); // ✅ send direct object
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
