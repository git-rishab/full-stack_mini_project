const express = require("express");
const {NoteModel} = require("../models/note.model");
const notesRoute = express.Router();

notesRoute.get("/",async(req,res)=>{
    res.send({"msg":"All the notes","ok":true});
})

notesRoute.post("/create",async(req,res)=>{
    let data = new NoteModel(req.body);
    await data.save();
    res.send({"ok":true})
})

notesRoute.post("/getnotes",async(req,res)=>{
    let data = await NoteModel.find(req.body);
    res.send(data);
})

module.exports = {
    notesRoute
}