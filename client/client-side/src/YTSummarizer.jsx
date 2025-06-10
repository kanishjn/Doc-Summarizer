import Header from './components/Header.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { useState } from 'react';
import axios from 'axios';
import './YTPage.css'

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
}
function YTSummarizer(){
    let aiResponse = "";
    const [prompt, setPrompt] = useState("");
    const [currentUrl, setCurrentUrl] = useState(""); 
    const [url, setUrl] = useState("")
    const [messages, setMessages] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    
    function handlePromptUpload(event){
      setPrompt(event.target.value);
    }
    function handleUrlUpload(event){
      setCurrentUrl(event.target.value);
    }

    async function handleSubmit(event) {
  event.preventDefault();

  if (!currentUrl && !prompt.trim()) {
    console.log("No file or prompt submitted");
    return;
  }

    setIsLoading(true);
  try {
    if (currentUrl) {
      setUrl(currentUrl);
      const formData = new FormData();
      formData.append("video_url", currentUrl);
      formData.append("user_id",sessionStorage.getItem("userId"))

      const response = await axios.post("https://doc-summarizer-kmc0.onrender.com/yt_upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Upload response:', response.data);
      setCurrentUrl("");
      setMessages(m => [...m, { sender: "ai", text: "Url Submitted!" }]);
    }

    if (prompt.trim()) {
      await handlePrompt(); 
    }

  } catch (error) {
    console.error("Submission failed:", error);
    setMessages(m => [...m, { sender: "ai", text: "Retry later" }]);
  }finally{
    setIsLoading(false);
  }
}

    async function handlePrompt(){
      const trimmedPrompt = prompt.trim();
      setMessages(m => [...m, { sender: "user", text: trimmedPrompt }]);
      setPrompt("");
      try{
        
        aiResponse = await axios.post("https://doc-summarizer-kmc0.onrender.com/yt_ask", { question: trimmedPrompt,user_id: sessionStorage.getItem("userId")}, {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000 // 30 seconds timeout
});
//if fast api takes too long the axios shows networks error thats why we increase timeout
        let aiData = aiResponse.data.answer
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\* /g, '<br/>• ')
          .replace(/\\n/g, '<br/>')    
          .replace(/\n/g, '<br/>')    
          .replace(/"/g, '')       
          .trim();
        setMessages(m => [...m, { sender: "ai", text: aiData}]);
      }catch (error) {
      console.error("Failed to get answer:", error.aiResponse?.data || error.message);
      setMessages(m => [...m, { sender: "ai", text: "Error getting response." }]);
    }
    }

    function goToUrl(){
        if (url) {
            console.log(url);
            window.open(url, '_blank'); // Use window.open instead of replace
        } else {
            console.log("No URL available");
        }
    }

    return(
        <div className='container'>
        <Header name="YouTube Summarizer" title="AI-powered summarization"/>
        <ChatWindow messages={messages}/>
        <form className="inputContainer" onSubmit={handleSubmit}>
            <div className="inputDiv">
                <input type="text" className='urlField' placeholder="Enter YouTube URL" value={currentUrl} onChange={(e)=>handleUrlUpload(e)}onFocus={(e) => (e.target.style.borderColor = "#007BFF")}onBlur={(e) => (e.target.style.borderColor = "#ccc")}></input>

        <textarea className="mainInput" onChange={(e)=>handlePromptUpload(e)} value={prompt} placeholder='Ask Anything'></textarea>
          </div>
        <div className="buttonDivYT">
        <button type="button" title="Open on YouTube" className='YTOpener' onClick={goToUrl}></button>
        <button type="submit" title="Submit" className="submitButton" >{isLoading ? <LoadingSpinner /> : "➤"}</button>
        </div>
        
        </form>
        <footer>
        <p>Made with 🫶 by Kanish</p>
        </footer>
        </div>
    )
}
export default YTSummarizer