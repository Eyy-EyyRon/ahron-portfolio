import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
        <button className="cta-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl">
          <span className="text-lg font-semibold"></span>
          <FontAwesomeIcon icon={faArrowDown} className="text-3xl" />
        </button>
      </div>
      <div className="hero-image mt-10 md:mt-0">
        <img
          src="./src/assets/images/meme.jpg"
          alt="GUY"
          className="rounded-full shadow-lg max-w-sm md:max-w-md"
        />
      </div>
    </section>
  );
};

export default Hero;
