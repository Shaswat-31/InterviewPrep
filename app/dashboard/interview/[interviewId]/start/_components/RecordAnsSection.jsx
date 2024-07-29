"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { cva } from "class-variance-authority";

function RecordAnsSection({
  MockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [saveUserAnswer, setSaveUserAnswer] = useState(false);
  useEffect(() => {
    if (results.length > 0) {
      const newAnswer = results.map(result => result?.transcript).join(" ");
      setUserAnswer(prevAns => prevAns + " " + newAnswer);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  useEffect(() => {
    if (saveUserAnswer) {
      console.log("Clearing user answer");
      setUserAnswer("");
      setSaveUserAnswer(false); // Reset the flag after clearing the answer
    }
  }, [saveUserAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer(""); // Clear previous answer before starting new recording
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    
    console.log("Updating User Answer:", userAnswer);
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      MockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer : " +
      userAnswer +
      ", Depends on question and user answer for given interview question" +
      "please give us rating out of 10 for answer and feedback as area of improvement if any. " +
      "In just 3 to 5 lines to improve it in json format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const MockJsonResp = (await result.response.text())
      .replace("```json", "")
      .replace("```", "");

    console.log(MockJsonResp);
    const jsonFeedbackResp = JSON.parse(MockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData,
      question: MockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: jsonFeedbackResp?.feedback,
      rating: jsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });
    
    if (resp) {
      toast({
        variant: cva(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-neutral-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-neutral-800",
          {
            variants: {
              variant: {
                default:
                  "border bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50",
                destructive:
                  "destructive group border-red-500 bg-red-500 text-neutral-50 dark:border-red-900 dark:bg-red-900 dark:text-neutral-50",
                success:
                  "success group border-green-500 bg-green-500 text-neutral-50",
              },
            },
            defaultVariants: { variant: "success" },
          }
        ),
        description: "Answer saved successfully",
      });
      setSaveUserAnswer(true);
      setResults([])
    }
    setLoading(false);
    setResults([])
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center bg-gray-800 mt-20">
        <Image
          src={"/online-learning.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button disabled={loading} className="my-5" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2">
            <Mic />
            'Stop Recording'
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
