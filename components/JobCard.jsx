"use client";
import "@styles/globals.css";
import React, { useState, useEffect } from "react";
import JobDetailsPopup from "@components/JobDetailsPopup.jsx";

const JobCard = ({ job, onClick }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobCardClick = (job) => {
    // console.log(job);
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };
  return (
    <>
      <div className="job-card">
        <h3>
          {job.title}
          <img src="./linkedin.svg" alt="svg" />
        </h3>
        <p>{job.description}</p>
        <h5
          style={{
            position: "absolute",
            bottom: "-0.5vw",
            left: "1vw",
          }}
        >
          <img src="./building.svg" alt="svg" />
          {job.company}
        </h5>
        <h5>
          <img src="./pin.svg" alt="svg" />
          {job.location}
          <button onClick={handleJobCardClick}>View</button>
        </h5>
        {/* Add more job details if needed */}
      </div>
      {selectedJob && <JobDetailsPopup job={job} onClose={handleClosePopup} />}
    </>
  );
};

export default JobCard;
