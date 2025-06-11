import Card from './components/Card.jsx'
import Header from './components/Header';
function HomePage(){
  
      const aiFeatures = [
    {
      title: "Document Summarizer",
      description: "Transform lengthy documents into concise, actionable summaries",
      icon: "📄",
      bgColor: "#6366f1",
      features: [
        "PDF & Word support",
        "Key points extraction",
        "Multiple output formats",
        "Batch processing"
      ],
      redirectUrl: "/docsummarizer"
    },
    {
      title: "YouTube Summarizer",
      description: "Get quick summaries of YouTube videos without watching",
      icon: "🎥",
      bgColor: "#ef4444",
      features: [
        "Auto transcript analysis",
        "Timestamp highlights",
        "Key moments detection",
        "Multi-language support"
      ],
      redirectUrl: "/ytsummarizer"
    }
  ];

  return(
    <div className='HomePageDiv'>
    <Header name="Ai-Powered Tools" title="'Haven't thought of it yet'" className="HomePageHeader"></Header>
    <div className='mainDiv' style={{
      minHeight: '80vh',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 16px 0'
        }}>AI Tools Collection</h1>
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          margin: '0'
        }}>Powerful AI-driven solutions for your everyday tasks</p>
      </div >
      <ul className="cardList" style={{listStyle:'none', padding:0, margin:0}}>
        {aiFeatures.map((feature, index)=>{
            return(<li key={index}><Card details ={feature}></Card></li>);  
        })}
        </ul>
          </div>
          <footer className='Homefooter'>
        <p>Made with 🫶 by Kanish</p>
      </footer>
        </div>
)
}
export default HomePage