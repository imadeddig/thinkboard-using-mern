import React, { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react";
import {toast} from "react-hot-toast"
import axios from 'axios'
import api from '../lib/axios'

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // because we'll be having inputs from the UI
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim()  || !content.trim()){
      toast.error("All fields are required")
      return;
    }
    setLoading(true);

    try {
      await api.post("/notes" , {
        title,
        content
      })
      toast.success("Note creaetd successfully !");
      navigate("/")

    } catch (error) {
      console.error(error)
      if (error.response.status === 429){
        toast.error("Slow down! too many notes creation..",{
          duration: 4000,
        })
      }
      else{
   toast.error("failed to create note :(")
      }
   
      
    } finally{
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeft className='size-5' />
            Back to Notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'></h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder='Note Title' className='input input-bordered' value={title} onChange={(e) => {
                    setTitle(e.target.value)
                  }} />
                </div>


                                <div className='form-control mb-4'>
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <input type="text" placeholder='Write your note here...' className='input input-bordered' value={content} onChange={(e) => {
                    setContent(e.target.value)
                  }} />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled= {loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage