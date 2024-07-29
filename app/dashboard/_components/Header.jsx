"use client";
import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

function Header() {
  const path = usePathname();
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <div className='flex p-4 items-center justify-between bg-gray-800 shadow-sm text-white'>
      <Image src={'/logo.svg'} width={40} height={20} alt='Logo' />
      <ul className='hidden md:flex gap-6'>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard' && 'text-primary font-bold'
          }`}
          onClick={() => handleNavigation('/dashboard')}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/questions' && 'text-primary font-bold'
          }`}
          onClick={() => handleNavigation('/dashboard/questions')}
        >
          Ask-Anything
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/previousInterview' && 'text-primary font-bold'
          }`}
          onClick={() => handleNavigation('/dashboard/previousInterview')}
        >
          Previous Interviews
        </li>
        {/* <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/how' && 'text-primary font-bold'
          }`}
          onClick={() => handleNavigation('/dashboard/how')}
        >
          How it works?
        </li> */}
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
