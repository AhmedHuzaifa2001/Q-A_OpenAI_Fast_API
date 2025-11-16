# 🤖 Q&A ChatBot with FastAPI & OpenAI

A modern, full-stack Q&A chatbot application built with **FastAPI**, **LangChain**, and **OpenAI's GPT models**. Features a sleek dark-themed interface with real-time AI responses.

## ✨ Features

- 🚀 **FastAPI Backend** - High-performance async API endpoints
- 🤖 **OpenAI Integration** - Powered by GPT-4o, GPT-4-turbo, and GPT-4
- 🎨 **Modern UI** - Dark-themed, responsive web interface
- ⚙️ **Customizable Parameters** - Adjust temperature and max tokens in real-time
- 🔒 **Secure** - API keys protected with environment variables
- 📝 **LangChain Integration** - Structured prompt templates and output parsing

## 🛠️ Tech Stack

**Backend:**
- FastAPI
- LangChain
- OpenAI API
- Python 3.x
- Pydantic

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API




## 📁 Project Structure

```
QA_Chatbot_FastApi/
├── main.py                 # FastAPI backend
├── static/
│   ├── index.html         # Frontend UI
│   ├── style.css          # Styling
│   └── script.js          # Client-side logic
├── .env                   # Environment variables (not in repo)
├── .gitignore            # Git ignore file

```

## 🎯 How It Works

1. **User Input**: User enters a question in the web interface
2. **API Request**: Frontend sends POST request to `/chat` endpoint
3. **LangChain Processing**: Backend processes the query using LangChain prompt templates
4. **OpenAI API**: Query is sent to selected GPT model
5. **Response**: AI-generated response is formatted and displayed to user

## ⚙️ Configuration Options

**Model Selection:**
- gpt-4o (default)
- gpt-4-turbo
- gpt-4

**Parameters:**
- **Temperature** (0.0 - 1.0): Controls response randomness
- **Max Tokens** (50 - 300): Controls response length



## 🚧 Future Enhancements

- [ ] Add chat history functionality
- [ ] Implement streaming responses
- [ ] Add user authentication
- [ ] Support for multiple AI models (Anthropic, Groq, etc.)
- [ ] Markdown rendering for formatted responses
- [ ] Export chat conversations




⭐ **Star this repo if you found it helpful!**
