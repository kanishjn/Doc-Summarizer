from fastapi import FastAPI, UploadFile, File
from dotenv import load_dotenv
from fastapi import Form
import os
import httpx
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import fitz  # for PDF
from docx import Document  # for DOCX

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # This fetches the key from env
print("Loaded Key:", GEMINI_API_KEY) 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or "*" for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FastAPI is working"}

def extract_text_from_pdf(file_bytes):
    text = ''
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_text_from_docx(file_bytes):
    doc = Document(BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])

def extract_text(file: UploadFile, content: bytes):
    filename = file.filename.lower()
    if filename.endswith(".pdf"):
        return extract_text_from_pdf(content)
    elif filename.endswith(".docx"):
        return extract_text_from_docx(content)
    elif filename.endswith(".txt"):
        return content.decode("utf-8")
    else:
        raise ValueError("Unsupported file type")
    
stored_docs = {}

@app.post("/upload")
async def upload_doc(file: UploadFile = File(...)):
    content = await file.read()
    try:
        text = extract_text(file, content)
    except Exception as e:
        return {"message": f"Could not extract text: {str(e)}"}
    
    stored_docs["current"] = text  
    print(stored_docs)
    return {"message": "Document uploaded and stored."}
    
@app.post("/ask")
async def ask_question(question: str = Form(...)):
     if "current" not in stored_docs:
        return {"error": "No document uploaded yet."}
     context = stored_docs["current"]

     data ={
         "contents":[
             {
                 "parts":[
                     {"text": f"Context: {context}\n\nQuestion: {question}"}
                 ]
             }
         ]
     }
     
     headers = {"Content-Type": "application/json"}
     url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
     
     async with httpx.AsyncClient() as client:
         response = await client.post(url, headers=headers, json=data)
         
         if response.status_code != 200:
             
             return {"error": "Failed to summarize", "details": response.text}
         
         res_json = response.json()
         
         try:
             res_json = response.json()
             answer_text = res_json.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No answer available")
             return {"answer": answer_text}
         except Exception as e:
             return {"error": "Failed to extract answer", "details": str(e)}