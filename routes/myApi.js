const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/postresponce", async (req, res) => {
  try {
    const { name, email, phone, trainingMode, subject, date } = req.body;
    const student = new Student({
      name,
      email,
      phone,
      trainingMode,
      subject,
      date
    });
    const savedStudent = await student.save();
    res.json(savedStudent);
    console.log(savedStudent);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
    });
    return;
    res.status(500).send("Internal Server Error");
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.put("/updatestudent/:id", async (req, res) => {
  try {
    const { name, email, phone, trainingMode, subject } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        trainingMode,
        subject,
      },
      { new: true }
    );
    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.delete("/deletstudent/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndRemove(req.params.id);
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
