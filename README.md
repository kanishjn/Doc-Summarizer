# Document Summarizer AI

A powerful AI-powered document summarization and question-answering system that can handle various document formats and YouTube video transcripts.

## Features

- Document Upload & Processing
  - Supports PDF, DOCX, and TXT files
  - Extracts text content for AI processing
  - Stores documents in MySQL database

- YouTube Video Integration
  - Extract transcripts from YouTube videos
  - Ask questions about video content
  - Timestamp-based answers

- AI-Powered Question Answering
  - Uses Google's Gemini AI model
  - Context-aware responses
  - Maintains conversation history
  - Supports both document and video-based queries

- User Authentication
  - User registration and login
  - Secure password storage
  - Session management

## Tech Stack

### Backend
- FastAPI (Python)
- MySQL Database
- Google Gemini AI API
- YouTube Transcript API
- PyMuPDF (for PDF processing)
- python-docx (for DOCX processing)

### Frontend
- React.js
- Modern UI components
- Responsive design

## Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL Server
- Google Cloud Account (for Gemini API)

## Environment Variables

Create a `.env` file in the `ai` directory with the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/document-summarizer-ai.git
cd document-summarizer-ai
```

2. Set up the Python environment:
```bash
cd ai
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the Node.js server:
```bash
cd ../server
npm install
```

4. Set up the client:
```bash
cd ../client/client-side
npm install
```

## Database Setup

1. Create a MySQL database
2. Import the database schema (schema will be provided in the repository)
3. Update the database credentials in the `.env` file

## Running the Application

1. Start the AI server:
```bash
cd ai
uvicorn main:app --reload
```

2. Start the Node.js server:
```bash
cd server
npm start
```

3. Start the client:
```bash
cd client/client-side
npm start
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - User login

### Document Operations
- `POST /upload` - Upload a document
- `POST /ask` - Ask questions about uploaded documents

### YouTube Operations
- `POST /yt_upload` - Upload YouTube video transcript
- `POST /yt_ask` - Ask questions about YouTube video content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for providing the AI capabilities
- YouTube Transcript API for video transcript extraction
- FastAPI for the robust backend framework 