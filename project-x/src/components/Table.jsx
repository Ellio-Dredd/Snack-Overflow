import  { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button
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

  // Fetch feedback from API
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


  
  // Delete Feedbacks
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/feedbacks/${id}`)
      .then(() => {
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((item) => item._id !== id)
        );
      })
      .catch((err) => console.error(err));
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
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((feedback) => (
              <TableRow hover key={feedback._id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{feedback[column.id]}</TableCell>
                ))}



                  <TableCell>
                  {/* Delete button */}
                  <Button onClick={() => handleDelete(feedback._id)} color="error" variant="contained">Delete</Button>
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
    </Paper>
  );
}


