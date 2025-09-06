import mongoose from "mongoose";

// 1- create a schema
// 2- model based off of that schema

const noteSchema = new mongoose.Schema({ //A schema is like a blueprint for how each document in the collection should look.
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    {
        timestamps: true // mongodb by default gives createdAt, updatedAt
    }
);

const Note = mongoose.model("Note", noteSchema); //object you use to interact with the collection in MongoDB.
//Mongoose will create a collection called notes (lowercase + plural of "Note").

export default Note;