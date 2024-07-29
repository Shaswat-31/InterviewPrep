import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h2 className="font-bold text-4xl text-blue-600 mb-4 animate-pulse">Dashboard</h2>
      <h2 className="text-gray-500 mb-8 text-lg">Create and start your AI Mock Interview</h2>

      <div className="w-full max-w-lg flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <AddNewInterview />
      </div>

      <div className="mt-6">
        <UserButton />
      </div>
    </div>
  );
}

export default Dashboard;
