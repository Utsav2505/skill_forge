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

  const handleFormSubmit = (data) => {
    console.log(data);
    setFormData(data);
    // getQuestion(data);
    // console.log("response sent");
  };

  const axios = require("axios");

  function getQuestion(data) {
    const parameter = {
      answer: displayText.join("\n"),
      interview_type: data.type,
      level: data.level,
      job_title: data.title,
    };
    setLoading(true);
    console.log("Parameter:", parameter);
    console.log("response sent");

    axios
      .post("https://d6ad-34-28-119-83.ngrok-free.app/get-question/", parameter)
      .then((response) => {
        console.log("Question:", response.data.question);
        setReceivedQuestion(response.data.question); // Set received question
        setQuestions([...questions, response.data.question]); // Add received question to the list of questions
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }

  //display and input of text
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState([]);
  const displayRef = useRef(null);

  // Function to handle form submission for the second form
  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      setDisplayText([...displayText, inputText]);
      setInputText("");
      // After updating the displayText state, call the API
      getQuestion(formData);
    }
  };

  // Scroll to the bottom of the div when displayText changes
  useEffect(() => {
    displayRef.current.scrollTop = displayRef.current.scrollHeight;
  }, [displayText]);

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
          <div className="displayText" ref={displayRef}>
            {displayText.map((text, index) => (
              <div key={index} className="chatTextUser">
                Utsav : {text}
              </div>
            ))}
          </div>
          {/* second form for user input */}
          <div>
            <form onSubmit={handleSubmit2}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="botPanel">
          <div className="players">
            <p>Zen</p>
          </div>
          {/* visualizer */}
          <div>Equalizer</div>
          {/* display past and received questions */}
          <div className="displayText" ref={displayRef}>
            {questions.map((question, index) => (
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
