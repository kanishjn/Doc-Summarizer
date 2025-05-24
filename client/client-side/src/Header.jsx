function Header(){
    return(
        <div className="headerDiv">
            <div className="logoDiv">
                <a href="https://doc-summarizer-9qpr.vercel.app/"><img src="https://th.bing.com/th/id/OIP.90CjEvpnujGAyyu4YTw9oQHaHl?cb=iwp2&rs=1&pid=ImgDetMain" alt="logo"></img></a>
                <p>Document Summarizer</p>
            </div>
            <h2>AI-powered summarization</h2>
            <div className="links">
                <a className="gitLink"href="https://github.com/kanishjn/document-summarizer-ai"><img src="https://pngimg.com/uploads/github/github_PNG80.png" alt="Github Repo"></img></a>
                <a className="linkedinLink"href="https://www.linkedin.com/in/kanish-jain-1b83902ab/" alt="My Linkedin"><img src="https://freelogopng.com/images/all_img/1656994981linkedin-icon-png.png"></img></a>
            </div>
        </div>
    );
}
export default Header