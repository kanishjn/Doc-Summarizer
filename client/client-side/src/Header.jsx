function Header(){
    return(
        <div className="headerDiv">
            <div className="logoDiv">
                <a href="http://localhost:5173/"><img src="src/assets/earth.jpeg" alt="logo"></img></a>
                <p>Document Summarizer</p>
            </div>
            <h2>AI-powered summarization</h2>
            <div className="links">
                <a className="gitLink"href="https://github.com/kanishjn/document-summarizer-ai"><img src="src/assets/github.png" alt="Github Repo"></img></a>
                <a className="linkedinLink"href="https://www.linkedin.com/in/kanish-jain-1b83902ab/" alt="My Linkedin"><img src="src/assets/linkedin.webp"></img></a>
            </div>
        </div>
    );
}
export default Header