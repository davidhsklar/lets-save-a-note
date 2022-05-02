// required variables

const express = require('express');
const path = require ('path');
const fs = require ('fs');
const util = require ('util');
const { allowedNodeEnvironmentFlags } = require('process');

// global variables

let writefileAsync = util.promisify(fs.writeFile);
let appendfileAsync = util.promisify(fs.appendFile);
let readFileAsync = util.promisify(fs.readFile);
let noteList;

// set up the express server

const app = express();
const PORT = process.env.PORT || 3001;

// Parses data being handled by express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

//set up routes

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get ("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "./public/notes/html"));
});

app.get("/api/notes", function (req, res) {
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
    .then(function(data) {
        return res.json(json.parse(data));
    });
});

app.post 