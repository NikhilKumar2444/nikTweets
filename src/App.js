import './App.css';
import Profile from './components/Profile';
import Home from './components/Home';
import Explore from './components/Explore';
import Login from './components/Login';
import {BrowserRouter as Router,
Routes,
Route,
Link
} from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile/:id" element ={<Profile/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path ="/" element ={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
