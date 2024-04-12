"use client";
import React from "react";
import { useState, useEffect } from "react";
import "@styles/globals.css";

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    console.log(chatInput);
    const apiUrl = `https://9738-34-66-29-203.ngrok-free.app/chat?question=${chatInput}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    +setChatMessages([
      ...chatMessages,
      { message: data.output, type: "incoming" },
    ]);
  };
  // console.log(chatMessages.Chat);
  return (
    <>
      {/* <main class="chatbot">
        <ul class="chatbox">
          <li class="chat outgoing">
            <img src="Zen PP.png" alt="" />
            <p>Hello how i can help you!</p>
          </li>
        </ul>

        <div className="chat-input">
          <textarea
            placeholder="Enter your query........"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          ></textarea>
          <div id="send-btn" onClick={handleSendChat}>
            send
          </div>
        </div>
      </main> */}
      <div className="chatmodule">
        {/* side dash */}
        <div className="sideDash">SideDash</div>
        {/* bot box */}
        <div className="chatbox">
          {/* chatbox */}
          <div className="chatDisplay"></div>
          {/* inputbox */}
          <div className="input-area">
            {/* <div className="text-area">Text Area</div> */}
            <textarea
              className="text-area"
              placeholder="Enter your query........"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            ></textarea>
            <div className="sendIcon" onClick={handleSendChat}>
              <svg
                width="31"
                height="26"
                viewBox="0 0 31 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.9117 2.36677L26.2336 24.4286C25.8806 25.9856 24.9602 26.3731 23.6523 25.6396L16.5245 20.3871L13.0851 23.695C12.7045 24.0756 12.3861 24.394 11.6526 24.394L12.1647 17.1346L25.3755 5.19716C25.9498 4.68506 25.2509 4.40133 24.4827 4.91342L8.15094 15.1969L1.11995 12.9963C-0.409425 12.5188 -0.437107 11.4669 1.43828 10.7334L28.9394 0.138447C30.2127 -0.339051 31.3269 0.422177 30.9117 2.36677Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
