import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate=useNavigate();
  function handleNavigate(route){
      navigate(route)
  }
   return (
    <div className="App">
      <button onClick={() => handleNavigate('/login')}>Login</button>
      <button onClick={() => handleNavigate('/add-user')}> Register</button>      
    </div>
  );
}

export default App;
