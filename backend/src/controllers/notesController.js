import Note from "../models/Note.js"

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    } catch (error) {
        console.error("ERROR IN getAllNotes CONTROLLER", error)
        res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content }); 

        const savedNote = await newNote.save();//contains newid, and dates
        res.status(201).json({ savedNote })
    } catch (error) {
        console.error("ERROR IN createNote CONTROLLER", error)
        res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote)
            return res.status(404).json({ message: "NOTE NOT FOUND" })
        res.status(200).json({message: "NOTE DELETED"})
    } catch (error) {
        console.error("ERROR IN updateNote CONTROLLER", error)
        res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }
}

export async function deleteNote(req, res) {
    try {
        const deltedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deltedNote)
            return res.status(404).json({ message: "CANNOT FIND NOTE" })
        res.status(200).json({ message: "NOTE DELETED" })
    } catch (error) {
        console.error("ERROR IN deleteNote CONTROLLER", error)
        res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }
}

export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note)
            return res.status(404).json({message:"NOTE NOT FOUND"});
        res.status(200).json(note);
    } catch (error) {
        console.error("ERROR IN getNoteById CONTROLLER", error)
        res.status(500).json({ message: "INTERNAL SERVER ERROR" }) 
    } 
}