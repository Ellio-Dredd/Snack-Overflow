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
} from "@mui/material";
import axios from "axios";
import StoreADCard from "./StoreADCard"; // Adjust the path accordingly

const columns = [
  { id: "ItemName", label: "Item Name", minWidth: 150 },
  { id: "ItemDes", label: "Item Description", minWidth: 200 },
  { id: "ItemPrice", label: "Item Price", minWidth: 100 },
  { id: "message", label: "Image", minWidth: 250 },
  { id: "actions", label: "Actions", minWidth: 150 },
];

export default function StoreTable() {
  const [store, setStore] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch store data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Store");
      setStore(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/Store/${id}`);
      // After deletion, filter out the item from the state
      setStore((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Edit an item (set the selected item to be edited)
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* StoreADCard component for adding/updating items */}
      <StoreADCard
        editingItem={editingItem}
        onSuccess={fetchData} // This will reload the store data after success
        clearEdit={() => setEditingItem(null)} // Clears the editing state after successful submission
      />

      <Paper sx={{ width: "100%", overflow: "auto", mt: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                  .map((item) => (
                    <TableRow hover key={item._id}>
                      <TableCell>{item.ItemName}</TableCell>
                      <TableCell>{item.ItemDes}</TableCell>
                      <TableCell>{item.ItemPrice}</TableCell>
                      <TableCell>
                        <img
                          src={item.message}
                          alt="Item"
                          style={{ width: "100px", height: "auto" }}
                        />
                      </TableCell>
                      <TableCell>
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(item)}
                          style={{
                            marginRight: 8,
                            padding: "4px 8px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                          }}
                        >
                          Edit
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "red",
                            color: "white",
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
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
    </>
  );
}
