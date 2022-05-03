/* I used PATH instead of router because there are not too many API calls being made
by the application.  If there were 10 or more, I would use the built in
express router method to make it easier to manage*/

// dependencies needed to work right

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const PORT = process.env.PORT || 3001;
let notes = require("./db/db.json");

// setting up express built in middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//routing and using GET methods to return notes as JSON 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


// routing and using POST to save new notes

app.post("/api/notes", (req, res) => {
    req.body.id = uniqid();
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notes, null, 1)
    );
    res.json(notes);
});

// DELETE function that deletes notes based on ID parameter

app.delete("/api/notes/:id", (req, res) => {
    notes = notes.filter(notes => {
        if (notes.id !== req.params.id) {
         return notes;
        }
       });
       res.json(notes);
      });


// Server listen for start

app.listen(PORT, () => {
    console.log(` server is now active on port ${PORT}!`)
  })