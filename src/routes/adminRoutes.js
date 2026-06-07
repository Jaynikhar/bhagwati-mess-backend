import express from "express";
import protect from "../middleware/authMiddleware.js";
import isOwner from "../middleware/ownerMiddleware.js";
import {
  getDashboardStats,
  getAllUsers,  
  getEarnings,
  getPackingRequests, 
  getAllSubscriptions,
  getAllPayments,
  toggleUserStatus,
  getAllOrders
} from "../controllers/adminController.js";

const router = express.Router();

// only owner can access
router.get("/stats", protect, isOwner, getDashboardStats);
router.get("/users", protect, isOwner, getAllUsers);
router.get("/subscriptions", protect, isOwner, getAllSubscriptions);
router.get("/orders", protect, isOwner, getAllOrders);
router.get("/payments", protect, isOwner, getAllPayments);
router.get("/earnings", protect, getEarnings);
router.get("/packing", protect, isOwner, getPackingRequests);
router.put("/user/:id", protect, toggleUserStatus);
export default router;
