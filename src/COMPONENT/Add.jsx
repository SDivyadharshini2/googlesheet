import React, { useState, useEffect } from "react";
import "./Add.css";
import { useNavigate } from "react-router-dom";
export default function Add() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    email: "",
  });

  const [dataList, setDataList] = useState([]);
  const apiUrl = "https://api.sheetbest.com/sheets/f0a19c4e-5cbe-4bdb-9650-a11d8d54c3e6";
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      NAME: formData.name,
      AGE: formData.age,
      CITY: formData.city,
      EMAIL: formData.email,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        alert("Data successfully added!");
        fetchData(); // Refresh data list after adding
      } else {
        const errorData = await response.text();
        console.error("Error response:", errorData);
        alert(`Failed to add data: ${errorData}`);
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("Network error.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the server.");
    }
  };

  const handleDelete = async (index) => {
    const entryToDelete = dataList[index];
    const nameToDelete = entryToDelete.NAME;
    const emailToDelete = entryToDelete.EMAIL;

    // Find the row index that matches both NAME and EMAIL
    const rowIndex = dataList.findIndex(
      (entry) => entry.NAME === nameToDelete && entry.EMAIL === emailToDelete
    );

    if (rowIndex === -1) {
      alert("No matching entry found to delete.");
      return;
    }

    // Construct the delete URL using the row index
    const deleteUrl = `${apiUrl}/${rowIndex}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Data successfully deleted!");
        fetchData(); // Refresh data after deletion
      } else {
        const errorText = await response.text();
        alert(`Failed to delete data. Server Response: ${errorText}`);
      }
    } catch (error) {
      alert("An error occurred.");
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="main">
        <div className="formdata">
          {/* Form Section */}
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
        {/* Table Section */}
        <div>
          {dataList.length > 0 ? (
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
                {dataList.map((data, index) => (
                  <tr key={index}>
                    <td>{data.NAME}</td>
                    <td>{data.AGE}</td>
                    <td>{data.CITY}</td>
                    <td>{data.EMAIL}</td>
                    <td>
                    <button onClick={() => navigate("/edit", { state: data })}>Go to Update Data</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available. Add some entries!</p>
          )}
        </div>
      </div>
    </div>
  );
}
