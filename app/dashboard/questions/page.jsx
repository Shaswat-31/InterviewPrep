"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatSession } from "@/utils/GeminiAIModel";
import { Button } from '@/components/ui/button'; // Adjust the import path if necessary
import { Textarea } from '@/components/ui/textarea'; // Adjust the import path if necessary

function Questions() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer('Loading your answer... \n It might take up to 10 seconds');
    try {
      const prompt = "Please provide answer to this question as a text : " + question;
      const result = await chatSession.sendMessage(prompt);
      console.log(result); // Log the response to check its structure
      const text = result.response.candidates[0].content.parts[0].text;
      setAnswer(text);
    } catch (error) {
      console.log(error);
      setAnswer('Sorry - Something went wrong. Please try again!');
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 text-center animate-pulse">
          Chat AI
        </h1>
        <form onSubmit={generateAnswer} className="space-y-6">
          <Textarea
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
            className="resize-none border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={generatingAnswer}
            className={`w-full py-3 rounded-lg text-white ${generatingAnswer ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition`}
          >
            {generatingAnswer ? "Loading..." : "Generate Answer"}
          </Button>
        </form>
        <div className="mt-8 p-6 bg-gray-100 border border-gray-200 rounded-lg">
          <ReactMarkdown className="text-gray-700">{answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Questions;
