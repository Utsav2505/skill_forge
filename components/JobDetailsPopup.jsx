import React from "react";
import "@styles/globals.css";
import Link from "next/link";

const JobDetailsPopup = ({ job, onClose }) => {
  return (
    <>
      <div className="popup-job">
        <div className="popup-background"></div>

        <div className="job-details-popup">
          <img className="exit-button" onClick={onClose} src="./cross.svg" />
          <h2>{job.title}</h2>
          <h5>
            <img src="./building.svg" alt="svg" />
            {job.company}
          </h5>
          <h5>
            <img src="./pin.svg" alt="svg" />
            {job.location}
          </h5>
          <div className="buttonTray">
            <Link href="/chat-zen">
              <button>ask Zen</button>
            </Link>
            <Link href="/interview">
              <button>Mock Interview</button>
            </Link>
            <a href={job.apply} target="_blank">
              <button>Apply</button>
            </a>
          </div>
          <div>
            <p>{job.description.replace("\n", "\n")}</p>
          </div>
          {/* Add more job details if needed */}
        </div>
      </div>
    </>
  );
};

export default JobDetailsPopup;
