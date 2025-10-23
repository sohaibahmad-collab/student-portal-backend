import { Router } from "express";
import { createStudentMarksEntry,deleteStudentEntry,getAllStudentsEntry, updateStudentEntry } from "@src/controllers/studentController";
import auth from "@src/middleware/auth";

const router = Router();


router.post("/", auth,createStudentMarksEntry );


router.get("/", auth,getAllStudentsEntry);


router.put("/:id", auth,updateStudentEntry);


router.delete("/:id", auth,deleteStudentEntry);

export default router;
