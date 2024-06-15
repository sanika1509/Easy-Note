const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/noteModel");
const router = express.Router();

const authenticate = require("../middlewares/auth");

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const noteAdded = await Note.create({
      title: title,
      content: content,
      userId: req.userId,
    });
    res.status(201).json(noteAdded);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const showAll = await Note.find({ userId: req.userId });
    if (showAll) res.status(200).json(showAll);
    else res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleNote = await Note.findById({ _id: id });
    res.status(200).json(singleNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleNote = await Note.findByIdAndDelete({ _id: id });
    res.status(200).json(singleNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updateNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
