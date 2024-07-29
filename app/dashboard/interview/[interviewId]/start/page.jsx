"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function StartInterview({params}) {
    const [interviewData, setInterviewData]=useState();
    const [MockInterviewQuestion,setMockInterviewQuestion]=useState();
    const[activeQuestionIndex, setActiveQuestionIndex]=useState(0);
    useEffect(()=>{
        
            GetInterviewDetails();
    },[])
    const GetInterviewDetails = async () => {
        try {
          const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));
    
          const jsonMockResp=JSON.parse(result[0].jsonMockResp)
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
          console.log(jsonMockResp);
          console.log(2+2);
          console.log(params.interviewId)
        } catch (error) {
          console.error('Error fetching interview details:', error);
        }
      };
      
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
         <QuestionsSection MockInterviewQuestion={MockInterviewQuestion}
         activeQuestionIndex={activeQuestionIndex}
         />
         
         <RecordAnsSection MockInterviewQuestion={MockInterviewQuestion}
         activeQuestionIndex={activeQuestionIndex}
         interviewData={params.interviewId}
         />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0 && 
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=MockInterviewQuestion?.length-1 &&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==MockInterviewQuestion?.length-1 && 
        <Link href={'/dashboard/interview/'+params.interviewId+'/feedback'}>
        <Button>End Interview</Button></Link>}
      </div>
    </div>
  )
}

export default StartInterview
