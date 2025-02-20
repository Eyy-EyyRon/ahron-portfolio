import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import '../App'; 


const Hero = () => {
  return (
    <section
      id="home"
      className="hero bg-gray-900 text-white min-h-screen flex items-center justify-center px-6"
    >
      <div className="hero-content text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Hello, I'm <span className="text-blue-500">Ahron Pasadilla</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400">
         Junior UI | UX Developer
        </p>
      </div>
      <div className="hero-image mt-10 md:mt-0">
        <img
          src="./src/assets/images/profile.jpg"
          alt="GUY"
          className="rounded-full shadow-lg max-w-sm md:max-w-md"
        />
      </div>
    </section>
  );
};

export default Hero;
