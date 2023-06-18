import React from 'react';
import './style.css'

const SkeletonCustom = () => {
  return (
    <div className='flex items-center'>
    <div className="rounded-xl h-[160px] w-[280px] skeleton"></div>
    <div class="ml-2">
      <div className='w-[500px] rounded-xl mb-3 h-[20px] skeleton skeleton-text' />
      <div className='w-[500px] rounded-xl h-[120px] skeleton skeleton-text' />
    </div>
    </div>
  );
};

export default SkeletonCustom;
