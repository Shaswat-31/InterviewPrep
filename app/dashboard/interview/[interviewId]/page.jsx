"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [startInterview, setStartInterview] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails()
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      setInterviewData(result[0]);
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };
  
  const handleStartInterview = () => {
    setShowAlertDialog(true);
  };

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's get started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      {interviewData ? (
        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col p-5 rouned-lg border gap-5'>
          <h2 className='text-lg'><strong>Job Role/Job position:</strong> {interviewData.jobPosition || 'Loading...'}</h2>
          <h2 className='text-lg'><strong>Job Description/Tech stack:</strong> {interviewData.jobDesc || 'Loading...'}</h2>
          <h2 className='text-lg'><strong>Job Experience:</strong> {interviewData.jobExperience || 'Loading...'}</h2>
        </div>
        <div>
        <AlertDialog>
  <AlertDialogTrigger className="text-yellow-300"><Lightbulb/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle >Information</AlertDialogTitle>
      <AlertDialogDescription >
        Please enable your webcam and microphone to start the interview.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>setWebCamEnabled(true)}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


        </div>
        </div>
      ) : (
        <div>Loading interview data...</div>
      )}
     
      <div className="flex justify-center flex-col items-center">
        {webCamEnabled? <><Webcam
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        mirrored={true}
        style={{
          height: 300,
          width:300
        }}
        />
        <div>
          {
            webCamEnabled?<>
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
       <Button onClick={()=>setStartInterview(true)} className="ml-5">Start Interview</Button>
       </Link>
            </>:
            <Button onClick={handleStartInterview} className="ml-5">Start Interview</Button>
          }
        
        </div>
        </>:
        <div>
      <WebcamIcon className='h-72 w-full my-7 p-20 bg-slate-400 rounded-lg border'/>
      <Button onClick={()=>setWebCamEnabled(true)}>Enable Web cam and Microphone</Button>
      {
            webCamEnabled?<>
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
       <Button onClick={()=>setStartInterview(true)} className="ml-5">Start Interview</Button>
       </Link>
            </>:
            <Button onClick={handleStartInterview} className="ml-5">Start Interview</Button>
          }
      </div>
        }
      </div>

      </div>
      <AlertDialog open={showAlertDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle >Information</AlertDialogTitle>
      <AlertDialogDescription >
        Please enable your webcam and microphone to start the interview.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setShowAlertDialog(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{
        setWebCamEnabled(true); setShowAlertDialog(false);}}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  );
}

export default Interview;
