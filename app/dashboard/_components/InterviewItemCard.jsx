import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview.mockId);
  };
  
  const onFeedback = () => {
    router.push('/dashboard/interview/' + interview.mockId + '/feedback');
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
      <h2 className="font-bold text-xl ">{interview?.jobPosition}</h2>
      <h2 className="text-md text-gray-700 mb-1">{interview?.jobExperience} years of experience</h2>
      <h2 className="text-sm text-gray-500 mb-4">Created At: {new Date(interview.createdAt).toLocaleDateString()}</h2>
      <div className="flex justify-between gap-4">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
