import React, { useEffect, useState, useRef } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Typography, Container, Box
} from '@mui/material';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable function directly
import html2canvas from 'html2canvas'; 

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null); // ref to the table for PDF

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/auth/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("No token found.");
        return;
      }

      await axios.delete(`/api/auth/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleUpdate = (user) => {
    alert(`Update feature coming soon for ${user.name}`);
  };

  const handleDownloadPDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('user-report.pdf');
    });
  };





  //for pdf generation -------------------------But doesnt work check latter-------------------
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     doc.text('User Report', 14, 15);

//     const tableColumn = ["User ID", "Name", "Email", "Gender", "Age", "Address"];
//     const tableRows = users.map(user => [
//       user.userId || '',
//       user.name || '',
//       user.email || '',
//       user.gender || '',
//       user.age || '',
//       user.address || '',
//     ]);

//     // Use autoTable directly from the imported module
//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 20,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [22, 160, 133] },
//     });

//     doc.save('user-report.pdf');
//   };



  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Admin User Management
      </Typography>



      <Box mt={4} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleUpdate(user)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="success" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>
      </Box>
    </Container>

  );
};

export default AdminUsers;
