import React from 'react'
import { useState } from 'react'
import LoadingIndicator from '../components/LoadingIndicator'
import '../styles/form.css'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const RegisterPage = () => {

  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ first_name, setFirstName ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try{
      await api.post("api/user/register/", {first_name, username, password});
      toast.success("You have Registered Successfully, please Login.", {
        position:"top-center",
        autoClose:2000,
        theme: "dark",
    });
      naviagte("/login")
    }catch(error){
      alert(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
    <div className="login-form">
        <h2>Register</h2>
        <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
                <label htmlFor="username">Name:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                   />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                   />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                   />
            </div>
            <div className="form-group btn-login-div">
                <button type="submit" style={{marginTop: '10px'}}>Register</button>
            </div>
            <div className="form-group" style={{textAlign: 'center', color: 'aqua'}}>
              {loading && <LoadingIndicator />}
            </div>
        </form>
        
    </div>
</div>
  )
}

export default RegisterPage