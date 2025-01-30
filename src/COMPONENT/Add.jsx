import React, { useState } from 'react';
import './Add.css';

export default function Add() {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
   const dataToSend = {
      NAME: formData.name,
      AGE: formData.age,
      CITY: formData.city,
      EMAIL: formData.email,
    };
    const apiUrl = "https://api.sheetbest.com/sheets/f0a19c4e-5cbe-4bdb-9650-a11d8d54c3e6";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending data in JSON format
        },
        body: JSON.stringify(dataToSend), // Send the updated form data
      });

      if (response.ok) {
        alert("Data added successfully!");
        setFormData({ name: "", age: "", city: "", email: "" }); // Reset form
      } else {
        alert("Failed to add data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };
  return (
    <div className="form-container">
      <h2>Add Data to Google Spreadsheet</h2>
      <form onSubmit={handleSubmit}>
   
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age:
          <input
            className="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>   
        <label>
          City:
          <input
            className="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
