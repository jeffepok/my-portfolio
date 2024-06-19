import React from 'react';
import {FiMoreHorizontal} from 'react-icons/fi';

const Home = () => {
  return <main className="text-white container mx-auto px-16 xl:px-32 mt-28">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className='h-full'>
        <div className="text-4xl text-left">
          <p className="">Hi,</p>
          <p className="pt-3">I am Jefferson Tuffour</p>
          <p className="pt-3">Full-Stack Developer</p>
          <p className="text-sm pt-7">
             I have 5 years of professional experience, an expert in building robust and scalable mobile and web applications in Python, Django, React, Node.js, and Flutter.    
          </p>
          <p className="text-sm pt-7 text-gray-400">
                    I'm working at Overloop LTD., where I offer software engineering services to it's clients in the U.S.
          </p>

        </div>
        <div className='text-center mt-10 text-gray-400 hover:text-white'>
          <a href="/about">View more<FiMoreHorizontal className="mx-auto"/></a>

        </div>
      </div>
      <div>
            Blog
        <p className="mt-10">Coming soon...</p>
      </div>
    </div>
  </main>;
};

export default Home;
