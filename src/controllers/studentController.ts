import { Request, Response } from "express";
import StudentMarksEntry from "../models/StudentMarksEntry";
import auth from "../middleware/auth";

export const createStudentMarksEntry=async (req: Request, res: Response) => {
  try {
    const { name, marks, subject, grade } = req.body;
    const entry = new StudentMarksEntry({
      name,
      marks,
      subject,
      grade,
      user: req.userId
    });
    await entry.save();
    res.json(entry);
  } catch {
    res.status(500).send("Server error");
  }
}

export const getAllStudentsEntry=async (req: Request, res: Response) => {
  try {
    const entries = await StudentMarksEntry.find({ user: req.userId });
    res.json(entries);
  } catch {
    res.status(500).send("Server error");
  }
}

export const updateStudentEntry=async (req:Request, res: Response) => {
  try {
    let entry = await StudentMarksEntry.findOne({ _id: req.params.id, user: req.userId });
    if (!entry) return res.status(404).json({ msg: "Entry not found" });

    entry.name = req.body.name ?? entry.name;
    entry.marks = req.body.marks ?? entry.marks;
    entry.subject = req.body.subject ?? entry.subject;
    entry.grade = req.body.grade ?? entry.grade;

    await entry.save();
    res.json(entry);
  } catch {
    res.status(500).send("Server error");
  }
}

export const deleteStudentEntry=async (req:Request, res: Response) => {
  try {
    const entry = await StudentMarksEntry.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!entry) return res.status(404).json({ msg: "Entry not found" });
    res.json({ msg: "Entry deleted" });
  } catch {
    res.status(500).send("Server error");
  }
}