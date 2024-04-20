"use client";
import React, { useState } from "react";

const SpeechToText = () => {
  const [output, setOutput] = useState("");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  console.log(recognition);

  recognition.lang = "en-US";
  recognition.onstart = () => {
    setOutput("Listening...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setOutput("You said: " + transcript);
  };

  recognition.onerror = (event) => {
    setOutput("Error occurred: " + event.error);
  };

  const startRecognition = () => {
    recognition.start();
  };

  const stopRecognition = () => {
    recognition.stop();
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Speech-to-Text Demo</h1>
      <div id="output">{output}</div>
      <button id="start-recognition" onClick={startRecognition}>
        Start Listening
      </button>
      <button id="stop-recognition" onClick={stopRecognition}>
        Stop Listening
      </button>
    </div>
  );
};

export default SpeechToText;
