import express from "express";
import sampleRoutes from "./sample.route";
import taskRoutes from "./task.route";

const router = express.Router();

router.use("/samples", sampleRoutes);
router.use("/tasks", taskRoutes);

export default router;
