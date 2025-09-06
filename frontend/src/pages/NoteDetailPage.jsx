import React, { useEffect, useState, useSyncExternalStore } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeft, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        if (error.response.status === 429) {
          toast.error('slow down, rate limit reached', {
            duration: 4000
          })
        }
        else {
          toast.error('failed to fetch note')
        }

      }
      finally {
        setLoading(false);
      }
    }

    fetchNote()

  }, [id]); //whenever id changes, run useeffect
  const handleDelete = async () => {
    if (!window.confirm("are you sure you want to delete this note ?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("note deleted")
      navigate("/")

    } catch (error) {
      console.log("error in handleDelete :", error);
      toast.error("failed to delete note")
    }
  }
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("fields cannot be empty");
      return;
    }

    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("note updated successfully !");
      navigate("/")
    } catch (error) {
      toast.error('cannot update note')
    }
    finally {
      setSaving(false)
    }
  }
  return (



    <div>
      {loading && <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>}

      {!loading &&   //there was an error, since react was tryna see what is in node.title, but mea lwl kant empty, donc have to make sure bli its there
        <div className='min-h-screen bg-base-200'>
          <div className="container mx-auto px-4 py-8">

            <div className="max-w-2xl mx-auto">

              <div className="flex items-center justify-between mb-6">
                <Link to={"/"} className="btn btn-ghost">
                  <ArrowLeft className='h-5 w-5' />
                  Back to Notes
                </Link>
                <button onClick={handleDelete} className='btn btn-error btn-outline'>
                  <Trash2Icon className='h-5 w-5' />
                  Delete Note
                </button>
              </div>

              <div className="card bg-base-100">

                <div className="card-body">
                  <div className="form-control mb-4">
                    <label className="label">
                      <input
                        type='text'
                        placeholder='Note Title'
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        className="input input-bordered w-full" />
                    </label>
                  </div>


                  <div className="form-control mb-4">
                    <label className="label">
                      <textarea
                        type='text'
                        placeholder='Note Content'
                        value={note.content}
                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                        className="input input-bordered w-full" />
                    </label>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      disabled={saving}
                      onClick={handleSave}
                      className="btn btn-primary">

                      {saving ? "Saving.." : "Save changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      }
    </div>
  )
}

export default NoteDetailPage