"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Page({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    GetFeedback();
  }, []);

  useEffect(() => {
    if (feedbackList.length > 0) {
      const totalRating = feedbackList.reduce((sum, item) => sum + parseFloat(item.rating), 0);
      setOverallRating(totalRating / feedbackList.length);
    }
  }, [feedbackList]);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  };

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>
        Your overall interview rating <strong>{overallRating.toFixed(1)}/10</strong>
      </h2>

      <h2 className='text-sm text-gray-500'>
        Find below your question with correct answer, your answer and feedback
      </h2>
      {feedbackList && feedbackList.map((item, index) => (
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='p-2 bg-secondary rounded-lg m-2 text-left flex justify-between'>
            {item.question} <ChevronDownCircleIcon />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'>
                <strong>Rating: {item.rating}</strong>
              </h2>
              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-800'>
                <strong>Your Answer: </strong>{item.userAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-800'>
                <strong>Correct Answer: </strong>{item.correctAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-800'>
                <strong>Feedback: </strong>{item.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Page;
