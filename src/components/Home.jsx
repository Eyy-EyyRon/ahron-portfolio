import React from 'react';
import '../assets/css/Home.css'; 


const Home = () => {
  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeIn">
        Welcome to My Portfolio
      </h1>
      <div className="content bg-white shadow-lg rounded-lg p-6 max-w-lg text-center animate-slideUp">
        <p className="text-xl text-gray-700 font-semibold mb-2">
          Hi, I'm <span className="text-blue-500">Ahron Pasadilla</span>
        </p>
        <p className="text-gray-600 text-lg">
          I'm a web developer passionate about creating amazing websites.
        </p>
      </div>
    </div>
  );
};

export default Home;
