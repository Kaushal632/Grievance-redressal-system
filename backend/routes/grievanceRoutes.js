const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const {
  createGrievance,
  getGrievances,
  getCompletedGrievances,
  getOngoingGrievances,
  updateGrievanceStatus,
  getNewGrievances,
} = require("../controllers/grievanceController");

// Citizen creates grievance (requires auth + optional image)
router.post("/create", auth, upload.single("image"), createGrievance);

// Role-aware fetch endpoints
router.get("/", auth, getGrievances);                  // officer sees all, citizen sees own
router.get("/completed", auth, getCompletedGrievances);
router.get("/ongoing", auth, getOngoingGrievances);
router.get("/new", auth, getNewGrievances);


// Update grievance status
router.put("/:id/status", auth, updateGrievanceStatus);

module.exports = router;
