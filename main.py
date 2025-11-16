from fastapi import FastAPI
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


prompt = ChatPromptTemplate.from_messages(
    [
        ("system" , "You are a helpful assistant. Please respond to the user queries"),
        ("user" , "Question:{question}")
    ]
)

def generate_response(question , llm_model , temperature , 
                      max_tokens):
    
    llm = ChatOpenAI(model = llm_model)
    output_parser = StrOutputParser()
    chain = prompt | llm | output_parser

    answer = chain.invoke({'question' : question})

    return answer


class ChatRequest(BaseModel):
    question: str
    model:str
    temperature:float
    max_tokens:int


@app.post("/chat")
async def chat(request: ChatRequest):
    question = request.question
    model = request.model
    temperature = request.temperature
    max_tokens = request.max_tokens

    response = generate_response(question , model , temperature , max_tokens)

    return {"response": response}

# Serve static files (HTML, CSS, JS)
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)
