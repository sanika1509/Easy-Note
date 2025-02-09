const mongoose = require("mongoose");
//Schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

//Create Model
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
