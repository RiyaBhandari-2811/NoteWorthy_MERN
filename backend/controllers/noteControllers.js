const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  // This will give all the notes that belongs to that user
  // Here is a CATCH , here we want Users ID but we don't have it
  // So we make use of Middleware to achieve that
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    // here req.user._id is coming from our middleware
    // Using the new operator with a model constructor allows you to create a new document object without immediately saving it to the database. It gives you more control over the document creation process, allowing you to modify and validate the document before explicitly calling the save() method to persist it to the database.
    const note = new Note({ user: req.user._id, title, content, category });

    const createNote = await note.save();

    res.status(201).json(createNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const updateNoteById = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  // CHECK for correct user : check if the updating user id is = to the login user id
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action ");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const UpdatedNote = await note.save();
    res.json(UpdatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const deleteNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  // CHECK for correct user : check if the updating user id is = to the login user id
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action ");
  }

  if (note) {
    await Note.findOneAndRemove(req.params.id);
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
