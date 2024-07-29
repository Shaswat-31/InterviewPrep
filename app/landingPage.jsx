// components/LandingPage.jsx
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard'); // Navigate to the dashboard
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to InterviewPrep AI</h1>
      <p className={styles.description}>
        InterviewPrep AI is your personal interview help bot. Tailor your interview sessions based on job positions, tech stacks, and years of experience. Receive feedback, ratings, and correct answers powered by AI to help you prepare effectively.
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleClick}>Sign In</button>
        <button className={styles.button} onClick={handleClick}>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage;
