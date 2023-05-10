const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require("../controllers/noteControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

console.log(router);

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNoteById)
  .delete(protect, deleteNoteById);

module.exports = router;
