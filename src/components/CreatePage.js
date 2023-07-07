import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const CreatePage = () => {
    const navigate = useNavigate()
    const [post, setPost] = useState({
      title:"",
      description:"",
    })
    

    const handleChange = (e) => {
      const {name, value} = e.target;

      setPost(prev => {
        return({
          ...prev,
          [name]:value,
        })
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(post)

      axios.post("/create",post)
      .then(res => console.log(res))
      .catch(err => console.log(err))

      navigate("/posts")
    }

  return (
    <div class="container p-4">
        <h4>Create a Post</h4>

        <Form>
          <Form.Group>
            <Form.Control 
              name="title"
              value={post.title}
              placeholder='title'
              style={{marginBottom: "1rem"}}
              onChange={handleChange}
            />
            
            <Form.Control 
                className="my-12"
                name="description"
                value={post.description}
                placeholder='description'
                style={{marginBottom: "1rem"}}
                onChange={handleChange}
            />
            
              <button 
                type="submit" 
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                  Create Post
              </button>
          </Form.Group>
        </Form> 

        <Button className="btn btn-secondary m-4" onClick={() => navigate(-1)}>Back</Button>
    </div>
  )
}

export default CreatePage