import React from "react";
import Link from "next/link";
import "@styles/globals.css";

const Links = () => {
  return (
    <div
      className="linkbox"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div className="pageLink">
        <Link
          href="/job-list"
          style={{ textDecoration: "none", color: "white" }}
          className="userLink"
        >
          Job Search
        </Link>
      </div>
      <div className="pageLink">
        <Link
          href="/"
          style={{ textDecoration: "none", color: "white" }}
          className="userLink"
        >
          Score Resume
        </Link>
      </div>
      <div className="pageLink">
        <Link
          href="/chat-zen"
          style={{ textDecoration: "none", color: "white" }}
          className="userLink"
        >
          ask Zen
        </Link>
      </div>
      <div className="pageLink">
        <Link
          href="/interview"
          style={{ textDecoration: "none", color: "white" }}
          className="userLink"
        >
          Mock Interview
        </Link>
      </div>
    </div>
  );
};

export default Links;
