import { useState } from "react";
import axios from 'axios';
import Preview from './Preview.jsx'
import ChatWindow from './ChatWindow.jsx'

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
}

function Input(){
    let aiResponse = "";
    const [file, setFile] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    
    function handleFileUpload(event){
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }

    function changePrompt(event){
      setPrompt(event.target.value);
    }

    async function handleSubmit(event) {
  event.preventDefault();

  if (!file && !prompt.trim()) {
    console.log("No file or prompt submitted");
    return;
  }

    setIsLoading(true);
  try {
    if (file) {
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id",sessionStorage.getItem("userId"))

      const response = await axios.post("https://doc-summarizer-kmc0.onrender.com/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Upload response:', response.data);
      setFile(null);
      setMessages(m => [...m, { sender: "ai", text: "File uploaded!" }]);
    }

    if (prompt.trim()) {
      await handlePrompt(); 
    }

  } catch (error) {
    console.error("Submission failed:", error);
    setMessages(m => [...m, { sender: "ai", text: "Error during upload or prompt." }]);
  }finally{
    setIsLoading(false);
  }
}

    async function handlePrompt(){
      const trimmedPrompt = prompt.trim();
      setMessages(m => [...m, { sender: "user", text: trimmedPrompt }]);
      setPrompt("");
      try{
        
        aiResponse = await axios.post("https://doc-summarizer-kmc0.onrender.com/ask", { question: trimmedPrompt,user_id: sessionStorage.getItem("userId")}, {
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

    return(
      <>
      <ChatWindow messages={messages}/>
      <Preview file={file} clearFile={() => setFile(null)}/>
      <form className="inputContainer" onSubmit={(e)=> handleSubmit(e)}>
  <textarea className="mainInput" value={prompt} placeholder="Upload a document and ask anything" onChange={(e)=> changePrompt(e)}></textarea>
  <div className="buttonDiv">
    <div className="fileUploadWrapper">
    <input type="file" onChange={(e) => handleFileUpload(e)} className="fileUpload"></input>
    </div>
<button type="submit" className="submitButton" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "➤"}</button>  
      </div>
</form>
</>
    );
}
export default Input