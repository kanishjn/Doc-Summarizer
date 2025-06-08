import Header from './components/Header.jsx'
import Preview from './components/Preview.jsx'
import ChatWindow from './components/ChatWindow.jsx'

function YTSummarizer(){
    const messages = [{sender: "ai", text:"Working on it!"}]
    return(
        <div className='container'>
        <Header name="Mp4 Summarizer" title="AI-powered summarization"/>
        <ChatWindow messages={messages}/>
        <Preview />
        <form className="inputContainer" >
        <textarea className="mainInput" placeholder='Paste a YouTube link or upload an MP4 file.'></textarea>
        <div className="buttonDiv">
        <div className="fileUploadWrapper">
        <input type="file" className="fileUpload"></input>
        </div>
        <button type="submit" className="submitButton" >➤</button>
        </div>
        </form>
        <footer>
        <p>Made with 🫶 by Kanish</p>
        </footer>
        </div>
    )
}
export default YTSummarizer