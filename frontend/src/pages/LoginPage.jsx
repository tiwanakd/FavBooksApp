import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "../components/LoadingIndicator";
import '../styles/form.css'


const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();

      try {
        const res = await api.post("/api/token/", { username, password });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/mybooks");
        window.location.reload();
      } catch (error) {
        alert("Error Logging in, please check you credentails!")
        console.error(error);
      }finally{
        setLoading(false);
      }

    }

  return (
<div className="login-container">
    <div className="login-form">
        <h2>Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </div>
            <div className="form-group" style={{textAlign: 'center', color: 'aqua'}}>
              {Loading && <LoadingIndicator />}
            </div>
            <div style={{textAlign: 'center', marginTop: '15px'}}>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
        </form>
        
    </div>
</div>

  )
}

export default LoginForm