import { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import axios from "axios";

const columns = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "phone", label: "Phone", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "message", label: "Message", minWidth: 250 },
];

export default function StoreTable() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editOpen, setEditOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/feedbacks");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/feedbacks/${id}`)
      .then(() => {
        setFeedbacks((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEditOpen = (feedback) => {
    setCurrentFeedback({ ...feedback });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setCurrentFeedback(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/feedbacks/${currentFeedback._id}`, currentFeedback);
      setFeedbacks((prev) =>
        prev.map((fb) => (fb._id === currentFeedback._id ? response.data : fb))
      );
      handleEditClose();
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "auto" }}>
      <TableContainer sx={{ maxHeight: 440, maxWidth: "100%", overflowX: "auto" }}>
        <Table stickyHeader aria-label="feedback table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((feedback) => (
              <TableRow hover key={feedback._id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{feedback[column.id]}</TableCell>
                ))}
                <TableCell>
                  <Button
                    onClick={() => handleEditOpen(feedback)}
                    color="primary"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(feedback._id)}
                    color="error"
                    variant="contained"
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={feedbacks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Feedback Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Feedback</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={currentFeedback?.name || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={currentFeedback?.phone || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={currentFeedback?.email || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Message"
            name="message"
            fullWidth
            multiline
            rows={3}
            value={currentFeedback?.message || ""}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
