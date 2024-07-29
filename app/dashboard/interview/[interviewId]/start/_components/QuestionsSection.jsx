import { Lightbulb, Volume1, Volume2 } from 'lucide-react';
import React, { useState } from 'react';

function QuestionsSection({ MockInterviewQuestion, activeQuestionIndex }) {
  const [QuestionListening, SetQuestionListening]=useState(false);
  const TextToSpeech=(text)=>{
    SetQuestionListening(true);
    if('speechSynthesis' in window)
    {
      const speech =new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Sorry, Your browser does not support text to speech')
    }
  }
  const stopTextToSpeech = () => {
    SetQuestionListening(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };
  console.log(MockInterviewQuestion);
  return MockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
        {MockInterviewQuestion && MockInterviewQuestion.map((question, index) => (
          <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestionIndex==index?'bg-gray-700 text-white': 'bg-slate-200' }`} key={index}>Question #{index+1}</h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg'>{MockInterviewQuestion[activeQuestionIndex]?.question}
        {
          QuestionListening?<>
          <Volume2 onClick={()=>stopTextToSpeech()} className='cursor-pointer'/>
          </>:
          <>
          <Volume1 onClick={()=>TextToSpeech(MockInterviewQuestion[activeQuestionIndex]?.question)}
          className='cursor-pointer'
          />
          </>
        }
        </h2>
      <div className='border rounded-lg p-5 bg-slate-300 mt-20'>
        <h2 className='flex gap-2 items-center text-slate-600'>
          <Lightbulb/>
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-slate-600 mt-3'>Tap on record answer to record your answer</h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
