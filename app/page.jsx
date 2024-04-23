"use client";

import Nav from "../components/Nav";
import Typewriter from "typewriter-effect";
const Home = () => {
  return (
    <div className="homeBack">
      <Nav page={1} />
      <div className="section-1">
        <h1>
          Where Ambitions Meet
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              pauseFor: 1000,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Opportunity")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Growth")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Progress")
                .pauseFor(1000)
                .start();
            }}
          />
        </h1>
        <div>
          <video src="./main.mp4" autoPlay loop muted className="home-video" />
        </div>
      </div>
      <div className="section-2"></div>
    </div>
  );
};

export default Home;
