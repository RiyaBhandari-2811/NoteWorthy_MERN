const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// End point
app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// The find() method returns the first element in an array that passes a test function.
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});

app.use("/api/users", userRoutes);
app.use(notFound)
app.use(errorHandler)


const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(`Listing on Port : ${Port}`);
});
