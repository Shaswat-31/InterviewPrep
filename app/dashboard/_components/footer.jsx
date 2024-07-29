import React from 'react';

function Footer() {
    return (
      <footer className="w-full py-4 bg-gray-800 text-white flex justify-center items-center fixed bottom-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
          <p className="text-sm font-bold">made by shaswat</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  