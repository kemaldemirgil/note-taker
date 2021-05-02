const router = require("express").Router();
const fs = require("fs");

// get notes json
router.get("/notes", (req, res) => {
    fs.readFile("db/db.json", 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        res.json(JSON.parse(data));
    });
});

// upload to notes 
router.post("/notes", (req, res) => {
    const newNote = req.body;
    const noteList = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const noteId = (noteList.length).toString();
    console.log(newNote);
    newNote.id = noteId;
    noteList.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

// delete a note
router.delete("/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let noteId = (req.params.id).toString();
    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    })
    fs.writeFileSync("db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

module.exports = router;