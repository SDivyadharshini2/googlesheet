import React, { useState, useEffect } from 'react';

import "./Edit.css";
const Edit = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ NAME: '', AGE: '', CITY: '', EMAIL: '' });
  
  // API URL for fetching and updating data
  const apiUrl = 'https://api.sheetbest.com/sheets/f0a19c4e-5cbe-4bdb-9650-a11d8d54c3e6';

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  // Handle edit button click, set data to form and show form
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({ ...data[index] });
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit to update the data in the sheet
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/${editingIndex}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const updatedData = [...data];
        updatedData[editingIndex] = formData;
        setData(updatedData);
        setEditingIndex(null);
        setFormData({ NAME: '', AGE: '', CITY: '', EMAIL: '' });
      } else {
        const errorData = await response.text();
        console.error('Update Error Response:', errorData);
        alert(`Failed to update data: ${errorData}`);
      }
    } catch (error) {
      console.error('Request error:', error);
      alert('Network error occurred while trying to update.');
    }
  };

  return (
    <div>
      <h1>Edit Data</h1>
      
      {/* Table displaying current data */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.NAME}</td>
              <td>{item.AGE}</td>
              <td>{item.CITY}</td>
              <td>{item.EMAIL}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for editing data */}
      {editingIndex !== null && (
        <form onSubmit={handleSubmit}>
          <h2>Edit Row</h2>
          <label>
            Name:
            <input
              type="text"
              name="NAME"
              value={formData.NAME}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="AGE"
              value={formData.AGE}
              onChange={handleInputChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="CITY"
              value={formData.CITY}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Edit;
