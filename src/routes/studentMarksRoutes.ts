import { Router, Response,Request } from "express";
import { createStudentMarksEntry,getAllStudentsEntry } from "../controllers/studentController";
import auth from "../middleware/auth";

const router = Router();


router.post("/", auth,createStudentMarksEntry );


router.get("/", auth,getAllStudentsEntry);


router.put("/:id", auth,);


router.delete("/:id", auth,);

export default router;
