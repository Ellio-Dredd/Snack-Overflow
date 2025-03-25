import  { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from "@mui/material";

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState({ name: "", email: "", doctor: "", date: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch appointments
  useEffect(() => {
    axios.get("https://rajapaksepharmacy.azurewebsites.net/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Open dialog for editing
  const handleOpenDialog = (id) => {
    const appointment = appointments.find((item) => item._id === id);
    setEditData({ name: appointment.name, email: appointment.email, doctor: appointment.doctor, date: new Date(appointment.date).toLocaleDateString() });
    setEditId(id);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData({ name: "", email: "", doctor: "", date: "" });
    setEditId(null);
  };

  // Update appointment
  const handleUpdate = () => {
    axios.put(`https://rajapaksepharmacy.azurewebsites.net/api/appointments/${editId}`, editData)
      .then((res) => {
        setAppointments(appointments.map((item) => (item._id === editId ? res.data : item)));
        handleCloseDialog();
      })
      .catch((err) => console.error(err));
  };

  // Delete appointment
  const handleDelete = (id) => {
    axios.delete(`https://rajapaksepharmacy.azurewebsites.net/api/appointments/${id}`)
      .then(() => setAppointments(appointments.filter((item) => item._id !== id)))
      .catch((err) => console.error(err));
  };

  // Generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Appointments Report", 10, 10);
    appointments.forEach((appointment, index) => {
      doc.text(`${index + 1}. ${appointment.name} - ${appointment.email} - ${appointment.doctor} - ${new Date(appointment.date).toLocaleDateString()}`, 10, 20 + index * 10);
    });
    doc.save("appointments_report.pdf");
  };

  // Handle change for table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel - Manage Appointments</h2>

      {/* Table to display appointments */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment, index) => (
              <TableRow key={appointment._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(appointment._id)} color="primary" variant="contained">Edit</Button>
                  <Button onClick={() => handleDelete(appointment._id)} color="secondary" variant="contained">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={appointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Report Generation */}
      <Button className="mt-3" color="primary" variant="contained" onClick={generateReport}>Generate Report</Button>

      {/* Dialog for editing appointment */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Doctor"
            name="doctor"
            value={editData.doctor}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            value={editData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
