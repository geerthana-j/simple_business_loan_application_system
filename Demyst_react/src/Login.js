import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
function Login() {
  const navigate=useNavigate();
  const [cookies, setCookie] = useCookies(); 
  const [userLoginData, setUserLoginData] = useState({
    phoneNumber: '',
    password: '',
  });
  const[callFunction,setCallFunction] = useState(false);
  const [message, setMessage] = useState('');
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };
  
  function loginUser (){
    setCallFunction(true);
  }
  const sendLoginRequest= async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', userLoginData);
      if(response.status==200){
        alert(response.data.message);
        await setCookie('loggedIn', 'true', { path: '/', maxAge: 86400 }); 
        if(cookies.loggedIn){
          console.log(cookies);
          navigate('/loan-application');
        }
      }
      else{
        navigate('/')
      }
    }catch (error) {
      console.error(error);
    }
  
  }
  useEffect(()=>{
    if(callFunction){
      sendLoginRequest();
    }
  },[callFunction])

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={userLoginData.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userLoginData.password}
        onChange={handleInputChange}
      />
      <button onClick={loginUser}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
