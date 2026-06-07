export default function isOwner(req, res, next) {
  if (!req.user || req.user.role !== "OWNER") {
    return res.status(403).json({ message: "Owner access only" });
  }
  next();
}

