import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate =useNavigate();

    function handleEmail(event){
        setEmail(event.target.value);
    }

    function handlePassword(event){
        setPassword(event.target.value);
    }

    async function handleSignIn(event){
        event.preventDefault()// Prevents the default form submission (page reload)
        try{
            await axios.post("https://doc-summarizer-kmc0.onrender.com/register", new URLSearchParams({email, password}));
            navigate("/")
        }
        catch(err){
            const error = document.getElementById("error")
            console.log(err)
        }
    }
    return(
        <div className="SignUpDiv">
        <form className="myForm" onSubmit={handleSignIn}>
        <h1>Sign Up</h1>
        <label > Email:</label>
        <input name="mail" className="SignUpEmail" type="email" value={email} onChange={(e)=> handleEmail(e)}></input>  

        <label> Password:</label>
        <input name="password" className="SignUpPassword" type="password" value={password} onChange={(e)=> handlePassword(e)}></input>
        <span className="error" id="SignUpError"></span>  

        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/">Log in</Link></p>
        </form>
        </div>
    )
}
export default SignUp