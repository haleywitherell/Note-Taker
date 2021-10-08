const path = require('path');
const express = require('express');
const fs = require('fs');
const db = require("./db/db.json")

const PORT = process.env.PORT || 3001;

const app = express(); 

//middleware = server settings

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))

//routes

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(db)
})

app.post('/api/notes', (req,res) => {
    const newNote = req.body
    newNote.id = Math.floor(Math.random() * 1000000)
    db.push(newNote)

    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) throw err;
        res.json("cats")
    })
})

//run server
app.listen(PORT, () => {
    console.log("wahoo")
})