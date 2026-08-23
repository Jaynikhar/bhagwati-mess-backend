import express from "express";
import Subscription from "../models/Subscription.js";
import { createSubscription, getMySubscription } from "../controllers/subscriptionController.js";
import protect from "../middleware/authMiddleware.js";
console.log("Subscription route mounted");

const router = express.Router();

router.post("/create", protect, createSubscription);


router.get("/my", protect, getMySubscription);

router.get("/test", (req, res) => {
  res.send("Subscription route working");
});

export default router;
