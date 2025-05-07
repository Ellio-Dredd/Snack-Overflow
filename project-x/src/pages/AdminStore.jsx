import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from "@mui/material";
import axios from "axios";
import StoreADCard from "../components/StoreADCard"; // Make sure the path is correct

const columns = [
  { id: "ItemName", label: "Item Name", minWidth: 150 },
  { id: "ItemDes", label: "Item Description", minWidth: 200 },
  { id: "ItemPrice", label: "Item Price", minWidth: 100 },
  { id: "message", label: "Image", minWidth: 250 },
];

export default function StoreTable() {
  const [store, setStore] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/Store", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStore(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        padding: 2,
      }}
    >
      {/* Add Item Form */}
      <StoreADCard />

      {/* Table of Items */}
      <Paper sx={{ width: "100%", overflow: "auto" }}>
        <TableContainer sx={{ maxHeight: 440, maxWidth: "100%", overflowX: "auto" }}>
          <Table stickyHeader aria-label="store table">
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
              {store.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No Data Available
                  </TableCell>
                </TableRow>
              ) : (
                store
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((feedback) => (
                    <TableRow hover key={feedback._id}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {column.id === "message" ? (
                            <img
                              src={feedback[column.id]}
                              alt="Item"
                              style={{ width: "100px", height: "auto" }}
                            />
                          ) : (
                            feedback[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={store.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
