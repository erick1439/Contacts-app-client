import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login.js';
import Register from "./Components/Register/Register.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>    
      </Router>
    </div>
  );
}

export default App;