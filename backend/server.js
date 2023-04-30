// const express = require("express");
// const notes = require("./data/notes");
// const dotenv = require("dotenv");

// const app = express();
// dotenv.config();

// // End point
// // app.get('/' , (req , res)=>{
// //     res.send("API is running ...")
// // });

// app.get('/api/notes' , (req , res) => {
//     res.json(notes)
// });


// // The find() method returns the first element in an array that passes a test function. 
// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   res.send(note);
// });

// const Port = (process.env.PORT || 3000) ; 

// app.listen(Port , () => {
//   console.log(`Listing on Port : ${Port}`);
// });
