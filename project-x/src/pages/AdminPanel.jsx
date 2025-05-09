import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, MenuItem
} from "@mui/material";

const doctors = [
  "Dr. Sumith Rathnasiri",
  "Dr. Gayana Fernando",
  "Dr. Yasas Jayaweera",
  "Dr. Nipunika Vithana",
  "Dr. Anurudha Abesinghe"
];

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState({ name: "", email: "", doctor: "", date: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get("http://localhost:3000/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleOpenDialog = (id) => {
    const appointment = appointments.find((item) => item._id === id);
    const date = new Date(appointment.date).toISOString().split("T")[0];
    setEditData({ name: appointment.name, email: appointment.email, doctor: appointment.doctor, date });
    setEditId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData({ name: "", email: "", doctor: "", date: "" });
    setEditId(null);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/appointments/${editId}`, editData)
      .then((res) => {
        setAppointments(appointments.map((item) => (item._id === editId ? res.data : item)));
        handleCloseDialog();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/appointments/${id}`)
      .then(() => setAppointments(appointments.filter((item) => item._id !== id)))
      .catch((err) => console.error(err));
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Appointments Report", 14, 22);
    autoTable(doc, {
      head: [["#", "Name", "Email", "Doctor", "Date"]],
      body: appointments.map((apt, index) => [
        index + 1,
        apt.name,
        apt.email,
        apt.doctor,
        new Date(apt.date).toLocaleDateString(),
      ]),
      startY: 30,
    });
    doc.save("appointments_report.pdf");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container mt-5">
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'navy' }}>
        Manage Appointments
      </h2>

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
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(appointment._id)} color="primary" variant="contained" sx={{ mr: 1 }}>Edit</Button>
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

      <Button className="mt-3" color="primary" variant="contained" onClick={generateReport} sx={{ mt: 3 }}>
        Generate PDF Report
      </Button>

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
            select
            label="Doctor"
            name="doctor"
            value={editData.doctor}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {doctors.map((doc) => (
              <MenuItem key={doc} value={doc}>{doc}</MenuItem>
            ))}
          </TextField>
          <TextField
          label="Date"
          name="date"
          type="date"
          value={editData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
