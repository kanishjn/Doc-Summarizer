import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

function Login({setIsLoggedIn, setUserId}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate =useNavigate();

    function handleEmail(event){
        setEmail(event.target.value);
    }

    function handlePassword(event){
        setPassword(event.target.value);
    }

    async function handleLogin(event){
        event.preventDefault()// Prevents the default form submission (page reload)
        try{
            const res = await axios.post("https://doc-summarizer-kmc0.onrender.com/login", new URLSearchParams({email, password}));
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userId", res.data.user_id);
            setIsLoggedIn(true)
            setUserId(res.data.user_id);
            navigate("/home")
        }
        catch(err){
            const error = document.getElementById("LoginError")
            error.textContent = `Invalid Credentials`;
        }
    }
    return( 
        <div className="LoginDiv">
        <form className="myForm" onSubmit={handleLogin}> 
        <h1>Login</h1>
        <label > Email:</label>
        <input name="mail" className="loginEmail" type="email" value={email} onChange={(e)=> handleEmail(e)}></input>   

        <label > Password:</label>
        <input name="password" className="loginPassword" type="password" value={password} onChange={(e)=> handlePassword(e)}></input> 
        <span className="error" id="LoginError" style={{color:"red", position:'relative', top:"5px", fontSize:"1.3rem"}}></span>  

        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
        </div>
    )
}
export default Login