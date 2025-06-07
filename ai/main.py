from fastapi import FastAPI, UploadFile, File, HTTPException
from dotenv import load_dotenv
from fastapi import Form
import os
import httpx
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from pydantic import BaseModel
import mysql.connector
import fitz  # for PDF
from docx import Document  # for DOCX

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # This fetches the key from env
print("Loaded Key:", GEMINI_API_KEY) 
app = FastAPI()
timeout_config = httpx.Timeout(30.0) 

def get_db():
    return mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
    )    

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or "*" for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register(email: str = Form(...), password: str = Form(...)):
    db = get_db()
    cursor = db.cursor()#works as an iterator

    cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))#we don't store because because we are not retrieving (it keeps the result to server itself)
    if cursor.fetchone():#after the select query fetchone tries to retrieve a row from the query result set
        raise HTTPException(status_code=400, message="User already exists")
    
    else:
        cursor.execute("INSERT INTO Users (email, password) VALUES (%s, %s)",(email,password))
        db.commit()
        return {"message": "User registered successfully"}

@app.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    db = get_db()
    cursor = db.cursor()
    print(type(email), type(password))
    cursor.execute("SELECT id FROM Users WHERE email = %s AND password = %s", (str(email), str(password)))
    result = cursor.fetchone()
    if result:
        return {"message": "Login successful", "user_id": result[0]}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


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
    

@app.post("/upload")
async def upload_doc(file: UploadFile = File(...), user_id: int = Form(...)):
    content = await file.read()
    try:
        text = extract_text(file, content)
    except Exception as e:
        return {"message": f"Could not extract text: {str(e)}"}
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO Contexts (user_id, context) VALUES (%s, %s)", (user_id, text))
    db.commit()
    return {"message": "Document uploaded and stored."}

class Question(BaseModel):
    question:str
    user_id:int
    
@app.post("/ask")
async def ask_question(q:Question):
     question = q.question
     user_id = q.user_id
     
     db = get_db()
     cursor = db.cursor()
     cursor.execute(
        "SELECT id, context FROM Contexts WHERE user_id = %s ORDER BY id DESC LIMIT 1", 
        (user_id,)#just user_id send it as a single integer but with comma it becomes a tuple and MySQL expects parameters to be in a list, tuple, or dictionary format.
    )
     
     context = cursor.fetchone()
     if not context:
        return {"error": "No document uploaded yet."}
     
     cursor.execute(" SELECT sender, text FROM Messages WHERE user_id = %s ORDER BY timestamp DESC LIMIT 6", (user_id,))
     rows = cursor.fetchall()
     bubbles = []
     current = {}
     
     for sender, text in reversed(rows):
        if sender == "user":
            current["question"] = text
        elif sender == "ai":
            current["answer"] = text
        
        if "question" in current and "answer" in current:
            bubbles.append(current)
            current = {}
            if len(bubbles) >= 3:
                break
    
     bubble_text = "\n\n".join(
    [f"Previous Q: {b['question']}\nPrevious A: {b['answer']}" for b in bubbles])
     
     final_prompt = f"Context: {context}\n\nPrevious chat: {bubble_text}\n\nQuestion:{question}"
            

     data ={
         "contents":[
             {
                 "parts":[
                     {"text": final_prompt}
                 ]
             }
         ]
     }
     
     headers = {"Content-Type": "application/json"}
     url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
     
     async with httpx.AsyncClient(timeout=timeout_config) as client:
            try:
                response = await client.post(url, headers=headers, json=data)
            except httpx.RequestError as exc:
                return {"error": f"Request failed: {exc}"}
            except httpx.TimeoutException:
                return {"error": "The request timed out. Please try again."}
            if response.status_code != 200:
                return {"error": "Failed to summarize", "details": response.text}
            res_json = response.json()
            answer_text = res_json.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No answer available")
            cursor.execute("INSERT INTO Messages (user_id, text, sender) VALUES (%s, %s, %s)",(user_id, question, "user"))
            cursor.execute("INSERT INTO Messages (user_id, text, sender) VALUES (%s, %s, %s)",(user_id, answer_text, "ai"))
            db.commit()

            return {"answer": answer_text}
     
        