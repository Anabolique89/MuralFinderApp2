import React from 'react';
import { Stories } from '../components';

const Feed = () => {
  return (
    <>
    
    <div className='lg:w-[83%] md:w-[83%] sm:w-full w-full min-h-screen lg:py-7 md:py-7 sm:py-4 py-3 px-3 flex items-start gap-x-20'>
{/* Feed + Blog Post Section  */}
<div className='lg:w md:w-full sm:w-full w-full h-auto relative'>
  {/* Blog Posts Section */}
  < Stories />
  {/* Feed Section */}
<div className='w-full h-auto flex items-center justify-center mt-6'>
  <div className='lg:w-[73%] md:w-[73%] sm:w-[80%] w-[80%] h-auto'>
{/*  */}
  </div>
</div>
</div>
{/* Recommended Users Section */}
<div className='w- h-auto lg:block md:hidden sm:hidden hidden'>
  {/*  */}

</div>
    </div>
    </>
  )
}

export default Feed