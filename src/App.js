import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const App = () => {
  const navigate = useNavigate()

  return (
    <div className='container flex p-4 text-center'>
      <h1>Home page</h1>
      <Button style={{ width:"12rem"}} onClick={() => navigate("/create")}>Next</Button>
    </div>
  );
}

export default App;
