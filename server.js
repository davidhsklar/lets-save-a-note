// Needed to work right
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const PORT = process.env.PORT || 3001;
let notes = require("./develop/db/db.json");

// setting up express built in middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//setting up the GET methods

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


// Server listen

app.listen(PORT, () => {
    console.log(` server is now active on port ${PORT}!`)
  })