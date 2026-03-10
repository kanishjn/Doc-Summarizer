import './App.css'
import DocSummarizer from './DocSummarizer.jsx'
import HomePage from './HomePage.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import YTSummarizer from './YTSummarizer.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userId,setUserId] = useState(null);

  useEffect(()=>{
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      const uid = sessionStorage.getItem("userId");
      console.log("Session Logged In:", loggedIn);  
      console.log("Session User ID:", parseInt(uid));      
      if(loggedIn && uid){
      setIsLoggedIn(true)
      setUserId(uid);
    }
  },[])
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}></Login>}></Route>
      <Route path='/home' element={<ProtectedRoute ><HomePage></HomePage></ProtectedRoute>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/docsummarizer' element={<ProtectedRoute ><DocSummarizer></DocSummarizer></ProtectedRoute>}></Route>
      <Route path='/ytsummarizer' element={<ProtectedRoute ><YTSummarizer></YTSummarizer></ProtectedRoute>}></Route>
    </Routes>
   </Router>
  )
}

export default App
