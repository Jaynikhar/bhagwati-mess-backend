import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders } from "../controllers/orderController.js";



const router = express.Router();

console.log(" Order routes loaded");

router.post("/create", protect, createOrder);
router.get("/my", protect, getMyOrders);



router.get("/test", (req, res) => {
  res.send("Order route working ");
});



export default router;
