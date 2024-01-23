import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import './NewPost.css'
import { Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function EditPost() {
  const { id } = useParams();
  const [title,setTitle]=useState("")
  const [content,setContent]=useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/${id}`
        );
        setContent(()=>response.data.content);
        setTitle(()=>response.data.title);
        console.log(title)
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPostDetails();
    }, []); 

    const navigate=useNavigate()
    const handleSubmit=async ()=>{
        const author=localStorage.getItem('username');
        if(!author){console.log('Login first'); return;}
        const body={
            content,
            title,
            author
        }
        const headers = {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
        };
        try{
            const response=await axios.post('http://localhost:3001/posts',
            body,{headers:headers});
            if(response){
                setContent('');
                setTitle('');
                navigate(`/posts/${response.data._id}`,{replace:true})
            }
        }catch(err){
            console.log(err)
        }
    }
 
  return (
    <>
    <div className='newpost'>
      <div id='form'>
        <textarea value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='New Post Title here...' id='title'/>
        <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Write your post content here...'/>
      <Button variant='contained' id='publish' onClick={handleSubmit}>Publish</Button>
      </div>
      <div id='tip'>
      <h2>Crafting an Engaging Post Title</h2>
Consider your post title as a concise yet captivating summary — a quick glimpse into the essence of your post captured in a single sentence. Strategically integrate keywords to enhance searchability and reach a broader audience.
      </div>
    </div>
    </>
    )
}

export default EditPost;
