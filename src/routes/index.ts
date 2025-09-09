import { Router } from "express";
import authRoutes from "@src/routes/authRoutes"
import studentMarksRoutes from "@src/routes/studentMarksRoutes"

const router = Router();

router.use("/student",studentMarksRoutes);
router.use("/auth",authRoutes)

export default router;