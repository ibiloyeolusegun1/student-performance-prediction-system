import { Router } from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  predictStudentPerformance,
} from "../controllers/student.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createStudent);
router.post("/predict", predictStudentPerformance);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);


export default router;
