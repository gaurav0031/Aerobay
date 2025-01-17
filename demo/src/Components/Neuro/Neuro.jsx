import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./Neuro.css"; // Import external CSS

const Neuro = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const [testResults] = useState([
    { id: 1, testName: "Spiral Test", healthy: 79, parkinsons: 21 },
    { id: 2, testName: "Tap Speed Test", healthy: 79, parkinsons: 21 },
    { id: 3, testName: "Reaction Test", healthy: 11, parkinsons: 89 },
    { id: 4, testName: "Voice Test", healthy: 0, parkinsons: 60 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log(formData);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center heading">🧠 Neuro Sketch - Health Assessment</h2>

      {/* Form Section */}
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="form-container">
          <h4 className="text-center">Personal Details</h4>

          <div className="d-flex justify-content-between">
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="form-group">
              <label className="form-label">Age *</label>
              <input type="date" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Gender *</label>
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>

      {/* Test Results */}
      <div className="mt-5">
        <h3 className="text-center">📊 Test Results</h3>
        <div className="row justify-content-center">
          {testResults.map((test) => (
            <div key={test.id} className="col-md-5 col-lg-3 my-2">
              <div className="test-card">
                <h5>{test.testName}</h5>
                <p>✅ Healthy: <strong>{test.healthy}%</strong></p>
                <p>⚠️ Parkinson’s: <strong>{test.parkinsons}%</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Neuro;
