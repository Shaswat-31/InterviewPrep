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
    <div className='p-10 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col items-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl'>
        <div className='mb-8'>
          <h2 className='text-4xl font-extrabold text-green-700 mb-2'>
            Congratulations!
          </h2>
          <p className='text-2xl font-semibold text-gray-700'>
            Here is your interview feedback
          </p>
          <div className='mt-4'>
            <p className='text-xl font-medium text-blue-600'>
              Your overall interview rating:
              <span className='text-4xl font-bold text-blue-700 ml-2'>
                {overallRating.toFixed(1)}/10
              </span>
            </p>
          </div>
        </div>

        <h2 className='text-md text-gray-600 mb-6'>
          Find below your question with correct answer, your answer, and feedback.
        </h2>

        {feedbackList && feedbackList.map((item, index) => (
          <Collapsible key={index} className='mb-5'>
            <CollapsibleTrigger className='p-4 bg-blue-100 rounded-lg m-2 text-left flex justify-between items-center hover:bg-blue-200 transition'>
              <span className='text-gray-700 font-medium'>{item.question}</span>
              <ChevronDownCircleIcon className='text-blue-600' />
            </CollapsibleTrigger>
            <CollapsibleContent className='bg-white rounded-lg shadow-md p-4'>
              <div className='flex flex-col gap-4'>
                <div className='p-2 border-l-4 border-red-500 bg-red-50 rounded-lg'>
                  <strong className='block text-red-600 text-lg'>
                    Rating: {item.rating}
                  </strong>
                </div>
                <div className='p-2 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg'>
                  <strong className='block text-yellow-600 text-lg'>
                    Your Answer:
                  </strong>
                  <p className='text-yellow-800'>{item.userAns}</p>
                </div>
                <div className='p-2 border-l-4 border-green-500 bg-green-50 rounded-lg'>
                  <strong className='block text-green-600 text-lg'>
                    Correct Answer:
                  </strong>
                  <p className='text-green-800'>{item.correctAns}</p>
                </div>
                <div className='p-2 border-l-4 border-blue-500 bg-blue-50 rounded-lg'>
                  <strong className='block text-blue-600 text-lg'>
                    Feedback:
                  </strong>
                  <p className='text-blue-800'>{item.feedback}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        <div className='mt-10'>
          <Button  onClick={() => router.replace('/dashboard')} className='bg-green-600 hover:bg-green-700 transition w-full py-3 text-white'>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
