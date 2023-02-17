const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    note:String,
    userID:String
},{
    versionKey:false
})

const NoteModel = mongoose.model("Note",noteSchema);

module.exports = {
    NoteModel
}