"use client";
import React, { useState, useRef, useEffect } from "react";
import "@styles/globals.css";
import PopUpForm from "@components/InterviewForm.jsx";
import Link from "next/link";

const InterViewPage = () => {
  const [formData, setFormData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [receivedQuestion, setReceivedQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [userTranscripts, setUserTranscripts] = useState([]);
  const [botQuestions, setBotQuestions] = useState([]);
  const displayRefUser = useRef(null);
  const displayRefBot = useRef(null);

  // Speech recognition state
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  function speak(text) {
    let synth = window.speechSynthesis;
    let utter = new SpeechSynthesisUtterance();
    if (synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }
    if (text.trim() !== "") {
      utter.text = text;
      synth.speak(utter);
    }
    if (!synth.speaking) {
      synth.cancel();
      // startListening();
    }
  }

  const handleFormSubmit = (data) => {
    setFormData(data);
    // startListening(); // Start speech recognition when form is submitted
    getQuestion(data, "");
  };

  const axios = require("axios");

  function getQuestion(data, answer) {
    console.log("Hello, I am here");
    const parameter = {
      answer: answer,
      interview_type: data.type,
      level: data.level,
      job_title: data.title,
    };
    setLoading(true);
    console.log("Parameter:", parameter);
    console.log("response sent");

    axios
      .post("https://7c10-35-196-76-5.ngrok-free.app/get-question", parameter)
      .then((response) => {
        console.log("Question:", response.data.question);
        setReceivedQuestion(response.data.question);
        setBotQuestions([...botQuestions, response.data.question]);
        setLoading(false);
        speak(response.data.question);

        const intervalId = setInterval(startListening(), 1000);
        setTimeout(() => {
          clearInterval(intervalId);
        }, 10000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }

  // Speech recognition functions
  const recognition = useRef(null);

  const startListening = () => {
    console.log("now Listening");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    let listeningTimeout;

    recognition.onstart = () => {
      console.log("Listening started");
      clearTimeout(listeningTimeout); // Clear previous timeout if any
      listeningTimeout = setTimeout(() => {
        console.log("Minimum listening time reached");
        recognition.stop();
      }, 10000); // Stop after 10 seconds
    };

    recognition.onresult = (event) => {
      const transcript2 = event.results[0][0].transcript;
      console.log("Transcript: ", transcript2);
      setUserTranscripts([...userTranscripts, transcript2]);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred: ", event.error);
    };

    recognition.onend = () => {
      console.log("Listening stopped");
      clearTimeout(listeningTimeout); // Clear the timeout when listening stops
      // You may choose to start listening again here if needed
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition.current) {
      console.log("Stopping listening up");
      setTimeout(() => {
        console.log("Stopping listening");
        recognition.current.stop();
        setListening(false);
      }, 50000); // Adjust the delay time as needed (in milliseconds)
    }
    console.log("Stopping listening down");
  };

  // Handle form submission for the second form
  const handleSubmit2 = () => {
    console.log("goin to submit this", transcript);
    console.log(transcript.length);
    if (transcript.trim() !== "" && formData) {
      console.log("goin to submit");
      setUserTranscripts([...userTranscripts, transcript]);
      setTranscript(""); // Clear transcript after submission
      getQuestion(formData, transcript);
    }
  };

  useEffect(() => {
    if (transcript.trim() !== "" && formData) {
      handleSubmit2();
    }
  }, [transcript, formData]);

  useEffect(() => {
    displayRefUser.current.scrollTop = displayRefUser.current.scrollHeight;
  }, [userTranscripts]);

  useEffect(() => {
    displayRefBot.current.scrollTop = displayRefBot.current.scrollHeight;
  }, [botQuestions]);

  return (
    <>
      <div>{!formData && <PopUpForm onSubmit={handleFormSubmit} />}</div>
      <div className="interviewModule">
        <div className="userPanel">
          <div className="players">
            <p>Utsav Maji</p>
          </div>
          {/* visualizer */}
          <div>Equalizer</div>
          {/* text display for user input */}
          <div className="displayText" ref={displayRefUser}>
            {userTranscripts.map((text, index) => (
              <div key={index} className="chatTextUser">
                Utsav : {text}
              </div>
            ))}
          </div>
          {/* second form for user input */}
          {/* <div>
            <form onSubmit={handleSubmit2}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div> */}
        </div>
        <div className="botPanel">
          <div className="players">
            <p>Zen</p>
          </div>
          {/* visualizer */}
          <div>Equalizer</div>
          {/* display past and received questions */}
          <div className="displayText" ref={displayRefBot}>
            {botQuestions.map((question, index) => (
              <div key={index} className="chatTextBot">
                Zen : {question}
              </div>
            ))}
            {loading && <div className="loader"></div>} {/* Display loader */}
            {/* {receivedQuestion && ( // Render if receivedQuestion is not null
              <div className="chatTextBot">
                Zen : {receivedQuestion}
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Link href="/" className="exit">
        Exit
      </Link>
    </>
  );
};

export default InterViewPage;
