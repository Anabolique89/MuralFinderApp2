import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <FaSpinner className="animate-spin text-4xl text-purple-600" />
  </div>
);

export default Spinner;
