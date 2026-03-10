import Input from './components/Input.jsx'
import Header from './components/Header.jsx'
import './index.css'

function DocSummarizer(){
    return(
        <div className='container'>
      <Header name="Document Summarizer" title="AI-powered summarization"/>
      <Input/>
      <footer>
        <p>Made with 🫶 by Kanish</p>
      </footer>
    </div>
    )
}
export default DocSummarizer