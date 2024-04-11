import React, { useState } from "react";
import "@styles/globals.css";

const PopUpForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: "",
    level: "",
    title: "",
    length: "",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsOpen(false); // Close the popup after submission
  };

  return (
    <div className={isOpen ? "popup-form active" : "popup-form"}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div className="firstCol">
            <label>Interview Type:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Technical">Technical</option>
              <option value="Screening">Screening</option>
            </select>

            <label>Level:</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <label>Job Title:</label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            >
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Back-End Developer">Back-End Developer</option>
              <option value="Front-End Developer">Front-End Developer</option>
              <option value="Others">Others</option>
            </select>

            <label>Length:</label>
            <select
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
            >
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="secondCol">
            <label>Job Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <button type="submit" className="submitButton">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PopUpForm;
