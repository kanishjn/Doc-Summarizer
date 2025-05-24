import { useState } from "react";
import axios from 'axios';
import Preview from './Preview.jsx'
import ChatWindow from './ChatWindow.jsx'


function Input(){
    let aiResponse = "";
    const [file, setFile] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]); 
    
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

  try {
    if (file) {
      const formData = new FormData();
      formData.append("document", file);

      const response = await axios.post("https://doc-summarizer-3.onrender.com/upload", formData, {
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
  }
}

    async function handlePrompt(){
      const trimmedPrompt = prompt.trim();
      if(!trimmedPrompt){
        console.log("No prompt fucker");
      }
      setMessages(m => [...m, { sender: "user", text: trimmedPrompt }]);
      setPrompt("");
      try{
        aiResponse = await axios.post("https://doc-summarizer-3.onrender.com/ask",{question: trimmedPrompt}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
      }});
        let aiData = aiResponse.data.answer
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\* /g, '• ')
        .replace(/\\n/g, ' ')    
        .replace(/\n/g, ' ')    
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
  <textarea className="mainInput" value={prompt} placeholder="Ask Anything" onChange={(e)=> changePrompt(e)}></textarea>
  <div className="buttonDiv">
    <div className="fileUploadWrapper">
    <input type="file" onChange={(e) => handleFileUpload(e)} className="fileUpload"></input>
    </div>
    <button type="submit" className="submitButton" >➤</button>
  </div>
</form>
</>
    );
}
export default Input