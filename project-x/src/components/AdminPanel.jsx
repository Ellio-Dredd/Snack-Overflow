import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  // Fetch data (mocked for now)
  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new item
  const handleAdd = () => {
    axios.post("http://localhost:5000/api/items", formData)
      .then((res) => setData([...data, res.data]))
      .catch((err) => console.error(err));
    setFormData({ name: "", email: "" });
  };

  // Edit item
  const handleEdit = (id) => {
    const item = data.find((item) => item._id === id);
    setFormData({ name: item.name, email: item.email });
    setEditId(id);
  };

  // Update item
  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/items/${editId}`, formData)
      .then((res) => {
        setData(data.map((item) => (item._id === editId ? res.data : item)));
        setEditId(null);
        setFormData({ name: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  // Delete item
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => setData(data.filter((item) => item._id !== id)))
      .catch((err) => console.error(err));
  };

  // Generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Admin Panel Report", 10, 10);
    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - ${item.email}`, 10, 20 + index * 10);
    });
    doc.save("report.pdf");
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>

      {/* Form */}
      <div className="mb-3">
        <input type="text" name="name" placeholder="Name" className="form-control" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="form-control mt-2" value={formData.email} onChange={handleChange} />
        {editId ? (
          <button className="btn btn-warning mt-2" onClick={handleUpdate}>Update</button>
        ) : (
          <button className="btn btn-success mt-2" onClick={handleAdd}>Add</button>
        )}
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(item._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Report Generation */}
      <button className="btn btn-info" onClick={generateReport}>Generate Report</button>
    </div>
  );
};

export default AdminPanel;
