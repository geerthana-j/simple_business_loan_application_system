import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import  axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const[callFunction,setCallFunction] = useState(false);
  const [userRegData, setUserRegData] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserRegData({ ...userRegData, [name]: value });
  };
  const sendRegisterRequest = async()=>{
        try {
          const response = await axios.post('http://localhost:8080/api/register', userRegData);
          console.log(response);
          if(response.status==200){
            
            alert(response.data.message);
            navigate('/');
          }
          else{
            alert(response.data.message);
            window.location.reload(); 
          }
          
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(()=>{
      if(callFunction){
        sendRegisterRequest();
      }
    },[callFunction])

    function registerUser(){
      setCallFunction(true);
    }
  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={userRegData.userName}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userRegData.password}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={userRegData.firstName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={userRegData.lastName}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="emailAddress"
        placeholder="Email Address"
        value={userRegData.emailAddress}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={userRegData.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={userRegData.confirmPassword}
        onChange={handleInputChange}
      />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}


export default Register;
  