"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "@styles/globals.css";
import JobCard from "@components/JobCard.jsx";
import Nav from "@components/Nav.jsx";

const IndexPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_data");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterTitle(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Function to filter jobs based on title
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(filterTitle.toLowerCase())
  );

  // Function to sort jobs based on the selected option
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === "titleAsc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "titleDesc") {
      return b.title.localeCompare(a.title);
    } else if (sortOption === "dateAsc") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "dateDesc") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return 0; // No sorting
    }
  });

  return (
    <>
      <Nav page={2} />
      <h6 className="subtitle">Job Search</h6>
      <div className="container">
        <div className="filter-sort">
          <label>
            <img src="./filter.svg" />
            Filter :
          </label>
          <select value={filterTitle} onChange={handleFilterChange}>
            <option value="">All</option>
            {/* Extracting unique job titles */}
            {[...new Set(jobs.map((job) => job.title))].map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          <label>
            <img src="./sort.svg" />
            Sort by:
          </label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="titleAsc">Title (A-Z)</option>
            <option value="titleDesc">Title (Z-A)</option>
            <option value="dateAsc">Date (Oldest first)</option>
            <option value="dateDesc">Date (Newest first)</option>
          </select>
        </div>
        <div className="job-list">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job) => <JobCard key={job.link} job={job} />)
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
