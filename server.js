const express = require("express");
const path = require("path");
const fs = require("fs");
// const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    const noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const noteId = (noteList.length).toString();
    console.log(newNote);
    newNote.id = noteId;
    noteList.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();
    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})









app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));