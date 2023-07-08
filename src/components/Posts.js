import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';



const Posts = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [updatedPost, setUpdatedPost] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


useEffect(() => {
    axios
        .get("/posts")
        .then((res) => {
            console.log(res);
            setPosts(res.data)
        })
        .catch(err => console.log(err));
        
},[])

useEffect(() => {
    // Simulating an asynchronous action with setTimeout
    setIsLoading(true);
    setTimeout(() => {
      // Fetch data or perform any other asynchronous operation
      const fetchedData = posts;
      setPosts(fetchedData);
      setIsLoading(false);
    }, 200);
  }, []);

  const updatePost = (post) => {
    setUpdatedPost(post)
    handleShow()
  }

  const deletePost = (id) => {
    axios
        .delete(`/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        
        window.location.reload();
  } 

  const handleChange = (e) => {
    const {name, value} = e.target;  

    setUpdatedPost(prev => {
        return ({
            ...prev,
            [name]: value
        });
    });
  };

  const saveUpdatedPost = () => {
    axios.put(`/update/${updatedPost._id}`, updatedPost)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    handleClose();

    window.location.reload();
  }

  return (
    <div className="flex" style={{width:"90%", textAlign: "center", margin: "auto auto"}}>
        <div style={{marginBottom: "10px", marginTop:"20px"}}>
            <Button onClick={() => navigate(-1)}>Back</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control 
                            name="title" value={updatedPost.title ? updatedPost.title : null} 
                            style={{marginBottom: "1rem"}} 
                            placeholder="title" 
                            onChange={handleChange}
                        />
                        <Form.Control 
                            name="description" 
                            value={updatedPost.description ? updatedPost.description : null} 
                            placeholder='description'
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={saveUpdatedPost}>
                    Save Changes
                </Button>
            </Modal.Footer>
      </Modal>

        </div>
        <h2 style={{fontSize: "40px", paddingTop:"10px"}}>Posts</h2>
        
        {isLoading ? (
                    <div className="d-flex align-items-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>
            ): (
                    <div>
                        {
                            posts.map(post => {
                                return (
                                    <div key={post._id} 
                                        style={{
                                            border: "solid lightgray 1px",
                                            borderRadius:"8px",
                                            marginBottom:"1rem",
                                            padding:"1rem"
                                        }}
                                    >
                                            <h4 className=''>{post.title}</h4>
                                            <p>{post.description}</p>
                                            <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
                                                <Button onClick={() => updatePost(post)} variant="outline-info">Update</Button>
                                                <Button onClick={() => deletePost(post._id)} variant="outline-danger">Delete</Button>
                                            </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
        }
    </div>
  )
}

export default Posts
