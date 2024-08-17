import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswers() {
    setAnswer("Loading...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAsPHut1fdwMVEVM1kVoi05Bmct-an3OEA",
        method: "post",
        data: {
          contents: [
            { "parts": [{ "text": question }] },
          ],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating answers:", error);
      setAnswer("Failed to generate answers. Please try again.");
    }
  }

  return (
    <div className="app-container">
      <h1 className="header">Chat Application</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows="4"
        cols="50"
        className="question-input"
        placeholder="Ask GPT-99 anything"
      ></textarea>
      <button onClick={generateAnswers} className="generate-button">Generate Answer</button>
      <p className="answer-output">{answer}</p>
    </div>
  );
}

export default App;
