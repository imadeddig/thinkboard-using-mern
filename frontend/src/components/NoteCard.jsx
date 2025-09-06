import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formateDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => { //passing them hea, from homepage

    const handleDelete = async (e, id) =>{
        e.preventDefault();

        if(!window.confirm("sure ?")) return;

        try {
            api.delete(`notes/${id}`);
            setNotes((prev)=> prev.filter(note => note._id !== id)) // get rid of deleted note
            toast.success("note deleted successfully !")
        } catch (error) {
            console.log("error in handle delete" , error)
            toast.error("failed to be deleted successfully !")
        }
    }
  return (
    <Link to={`/note/${note._id}`}
    className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'
    >
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-camp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                    {formateDate(new Date(note.createdAt))
                    }
                </span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e, note._id)}>
                        <Trash2Icon className='size-4'/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard