import React from 'react';
import { FaBriefcase, FaCheckCircle, FaUsers } from 'react-icons/fa';
import heroImage from '../assets/Images/HeroImage.png'; // Replace with your hero image path

const HeroSection = ({ counts }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-5 flex flex-col md:flex-row items-center gap-12">
      {/* Left Side: Message and Counts */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Empowering the Future of Blue-Collar Workforce Connections
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Handy is revolutionizing the way skilled labor connects with employers offering a trusted, efficient platform for hiring and job placement across the blue-collar industry.
        </p>

        {/* Counts */}
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaBriefcase className="text-lightBlue dark:text-yellow text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{counts.jobPosted}</h3>
              <p className="text-gray-600 dark:text-gray-400">Jobs Posted</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaCheckCircle className="text-lightBlue dark:text-yellow text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{counts.jobFulfilled}</h3>
              <p className="text-gray-600 dark:text-gray-400">Jobs Fulfilled</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaUsers className="text-lightBlue dark:text-yellow text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{counts.jobSeekers}</h3>
              <p className="text-gray-600 dark:text-gray-400">Job Seekers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="flex justify-center flex-1">
        <img
          src={heroImage}
          alt="A diverse group of blue-collar workers collaborating"
          className="w-full max-w-sm md:max-w-[460px] h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;




