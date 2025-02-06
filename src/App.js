// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./COMPONENT/Add";  // Import Add component
import Edit from "./COMPONENT/Edit"; // Import Edit component

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Add />} />        {/* Add page route */}
        <Route path="/edit" element={<Edit />} />  {/* Edit page route */}
      </Routes>
  
  );
}

export default App;
