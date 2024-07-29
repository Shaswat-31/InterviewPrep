"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
 // Assuming you have Shad CDN imported

const LandingPage = () => {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path); // Navigate to the specified path
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to InterviewPrep AI</h1>
      <p style={styles.description}>
        InterviewPrep AI is your personal interview help bot. Tailor your interview sessions based on job positions, tech stacks, and years of experience. Receive feedback, ratings, and correct answers powered by AI to help you prepare effectively.
      </p>
      <div style={styles.buttonContainer}>
        <Button onClick={() => handleClick('/dashboard')} style={styles.button}>Sign In</Button>
        <Button onClick={() => handleClick('/sign-up')} style={styles.button}>Sign Up</Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
    background: 'linear-gradient(to bottom right, #e0eafc, #cfdef3)',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    maxWidth: '800px',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '50px',
    display: 'flex',
    gap: '20px',
  },
  button: {
    fontSize: '1.25rem',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#005bb5',
  },
};

export default LandingPage;
