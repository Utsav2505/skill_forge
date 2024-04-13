"use client";
import Link from "next/link";
import React, { useState } from "react";
import "@styles/globals.css";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Chat = () => {
  const { data: session } = useSession();
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfSubmitted, setPdfSubmitted] = useState(false); // State to track whether PDF is submitted

  const handleSendChat = async () => {
    var startTime = performance.now();
    if (!chatInput.trim()) return;
    if (!pdfSubmitted) {
      // Show error message if PDF is not submitted
      console.error("Please submit the PDF before sending the chat.");
      return;
    }

    // Add user's question to chat messages
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { message: chatInput, type: "outgoing" },
    ]);
    setLoading(true);
    // Call API and add response to chat messages
    const apiUrl = `https://743c-34-30-227-133.ngrok-free.app/chat?question=${chatInput}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { message: data.output, type: "incoming" },
    ]);
    setLoading(false);
    // Clear input after sending
    setChatInput("");
    var endTime = performance.now();

    var timeTaken = endTime - startTime;
    console.log("Time taken: " + timeTaken + " milliseconds");
  };

  //resume input
  const [selectedFileName, setSelectedFileName] = useState(""); // State to store selected file name

  // Function to handle file drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      // Set selected file name
      setSelectedFileName(file.name.replace(" pdf", ""));
      // Set pdfSubmitted to true when PDF is dropped
      setPdfSubmitted(true);
      // Handle PDF file
      console.log("PDF file dropped:", file.name);
      // You can add further processing here
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          "https://743c-34-30-227-133.ngrok-free.app/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data.message);
        // Handle success or error messages here
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    } else {
      console.log("Invalid file format. Please drop a PDF file.");
    }
  };

  // Function to handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      // Set selected file name
      setSelectedFileName(file.name);
      // Set pdfSubmitted to true when PDF is selected
      setPdfSubmitted(true);
      // Handle PDF file
      console.log("PDF file selected:", file.name);
      // You can add further processing here
    } else {
      console.log("Invalid file format. Please select a PDF file.");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  };

  return (
    <div
      className="chatmodule"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* side dash */}
      <div className="sideDash">
        <div
          style={{
            color: "white",
            fontFamily: "Sarabun",
            fontStyle: "normal",
            fontWeight: "400",
            marginTop: "2vw",
          }}
        >
          Input Resume
        </div>
        <div className="dropZone">
          {selectedFileName ? (
            <div className="resumeFile">
              <svg
                width="15"
                height="20"
                viewBox="0 0 15 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.20437 9.92177C7.02261 9.34013 7.02624 8.21682 7.13167 8.21682C7.43703 8.21682 7.40795 9.55824 7.20437 9.92177ZM7.14257 11.6376C6.86266 12.3719 6.51367 13.2117 6.11015 13.9169C6.77541 13.6625 7.52791 13.2917 8.39675 13.1208C7.93506 12.7718 7.49156 12.2702 7.14257 11.6376ZM3.72177 16.1745C3.72177 16.2035 4.20163 15.9781 4.99049 14.7131C4.74692 14.9421 3.93262 15.6037 3.72177 16.1745ZM9.60729 6.42827H14.5513V18.352C14.5513 18.8355 14.1623 19.2245 13.6788 19.2245H1.46426C0.980772 19.2245 0.591797 18.8355 0.591797 18.352V1.48428C0.591797 1.00079 0.980772 0.611816 1.46426 0.611816H8.73483V5.5558C8.73483 6.03566 9.12744 6.42827 9.60729 6.42827ZM9.31647 12.6737C8.58942 12.2302 8.10592 11.6194 7.76421 10.7179C7.92779 10.0454 8.1859 9.02386 7.98959 8.38405C7.81874 7.31527 6.44823 7.4207 6.25193 8.13685C6.07017 8.8021 6.23739 9.74001 6.54639 10.936C6.12469 11.9394 5.50306 13.2844 5.06319 14.0551C5.05956 14.0551 5.05956 14.0587 5.05592 14.0587C4.07076 14.564 2.38036 15.6764 3.07469 16.5307C3.27827 16.7815 3.65634 16.8942 3.85628 16.8942C4.50699 16.8942 5.15407 16.2399 6.07744 14.6476C7.01534 14.3386 8.04412 13.9533 8.94931 13.8042C9.73816 14.2332 10.6615 14.5131 11.2759 14.5131C12.3374 14.5131 12.4101 13.3498 11.992 12.9354C11.4867 12.441 10.0181 12.5828 9.31647 12.6737ZM14.2968 4.42886L10.7342 0.866286C10.5706 0.702698 10.3489 0.611816 10.1162 0.611816H9.89812V5.26498H14.5513V5.04322C14.5513 4.8142 14.4604 4.59245 14.2968 4.42886ZM11.6031 13.7097C11.7521 13.6116 11.5122 13.2771 10.0472 13.3826C11.3959 13.9569 11.6031 13.7097 11.6031 13.7097Z"
                  fill="#F50000"
                />
              </svg>
              <p>{selectedFileName}</p>
            </div>
          ) : (
            <div className="error">
              <p>Please submit a PDF file.</p>
            </div>
          )}

          <input
            type="file"
            name="myFile"
            className="drop-zone__input"
            onChange={handleFileInputChange}
          ></input>
        </div>
        <Link href="/" className="exitBtn">
          <p
            style={{
              margin: "0 auto",
            }}
          >
            Exit
          </p>
        </Link>
      </div>
      {/* bot box */}
      <div className="chatbox">
        {/* chatbox */}
        <div className="chatDisplay">
          {/* Map through chat messages to display */}
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className="message"
            >
              {msg.type === "outgoing" ? (
                <img className="profileIcon" src={session?.user.image} alt="" />
              ) : (
                // <img
                //   className="profileIconBot"
                //   src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FChitti_%2528character%2529&psig=AOvVaw3oqHlVDcxNNgUMOnt72SZx&ust=1713050163049000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiVvqXnvYUDFQAAAAAdAAAAABAE"
                //   alt=""
                // />

                <div className="profileIconBot"></div>
              )}
              <div className={"chat "}>
                <p className={`${msg.type}`}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        {/* inputbox */}
        <div className="input-area">
          {/* <div className="text-area">Text Area</div> */}
          <textarea
            className="text-area"
            placeholder="Enter your query........"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyPress}
          ></textarea>
          <div className="sendIcon" onClick={handleSendChat}>
            {loading ? (
              <div className="loader"></div>
            ) : (
              <svg
                width="2vw"
                height="2vw"
                viewBox="0 0 2vw 2vw"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.9117 2.36677L26.2336 24.4286C25.8806 25.9856 24.9602 26.3731 23.6523 25.6396L16.5245 20.3871L13.0851 23.695C12.7045 24.0756 12.3861 24.394 11.6526 24.394L12.1647 17.1346L25.3755 5.19716C25.9498 4.68506 25.2509 4.40133 24.4827 4.91342L8.15094 15.1969L1.11995 12.9963C-0.409425 12.5188 -0.437107 11.4669 1.43828 10.7334L28.9394 0.138447C30.2127 -0.339051 31.3269 0.422177 30.9117 2.36677Z"
                  fill="white"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
