import { NextFunction, Request, Response } from "express";
import StudentMarksEntry from "@src/models/StudentMarksEntry";
import { HttpStatusCode } from "@src/utils/httpStatus";
import { HttpMessage } from "@src/utils/httpMessage";
import ApiError from "@src/utils/apiError";

export const createStudentMarksEntry=async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { name, marks, subject, grade,date,time } = req.body;
    const entry = new StudentMarksEntry({
      name,
      marks,
      subject,
      grade,
      date,
      time,
    });
    await entry.save();
    res.json(entry);
  } catch(error) {
    next(error)
  }
}

export const getAllStudentsEntry=async (req: Request, res: Response,next:NextFunction) => {
  try {
    const entries = await StudentMarksEntry.find({});
    res.json(entries);
  } catch(error){
   next(error)
  }
}

export const updateStudentEntry=async (req:Request, res: Response,next:NextFunction) => {
  try {
    let entry = await StudentMarksEntry.findOne({ _id: req.params.id});
   if (!entry) {
      return next(
        new ApiError(HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND)
      );
    }

    entry.name = req.body.name ?? entry.name;
    entry.marks = req.body.marks ?? entry.marks;
    entry.subject = req.body.subject ?? entry.subject;
    entry.grade = req.body.grade ?? entry.grade;
    entry.date=req.body.date ?? entry.date;
    entry.time=req.body.time ?? entry.time;

    await entry.save();
    res.json(entry);
  } catch(error) {
    next(error)
  }
}

export const deleteStudentEntry=async (req:Request, res: Response,next:NextFunction) => {
  try {
    const entry = await StudentMarksEntry.findOneAndDelete({ _id: req.params.id });
    if (!entry) return res.status(HttpStatusCode.NOT_FOUND).json(HttpMessage.NOT_FOUND);
    res.json({ msg:HttpMessage.DELETED });
  } catch(error) {
    next(error)
  }
}