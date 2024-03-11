// SearchBar.js

import React, { useState } from "react";
import "./SearchBar.css"; 

const SearchBar = () => {
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1"); 

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search clicked");
    console.log("Text Input:", textInput);
    console.log("Selected Option:", selectedOption);
  };

  return (
    <div className="search-bar">
      <div>
        <span className="label">Document Name:</span>
        <input
          type="text"
          value={textInput}
          onChange={handleInputChange}
          placeholder="Type: "
        />
      </div>
      <div>
        <span className="label">Order By:</span>
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value="option1">File Name</option>
          <option value="option2">Date</option>
          <option value="option3">Last Modified</option>
          {}
        </select>
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
