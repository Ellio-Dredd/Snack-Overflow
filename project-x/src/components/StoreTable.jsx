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
  Button,
} from "@mui/material";
import axios from "axios";
import StoreADCard from "./StoreADCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Column Definitions
const columns = [
  { id: "ItemName", label: "Item Name", minWidth: 150 },
  { id: "ItemDes", label: "Item Description", minWidth: 200 },
  { id: "ItemPrice", label: "Item Price", minWidth: 100 },
  { id: "message", label: "Image", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 150 },
];

export default function StoreTable() {
  const [store, setStore] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Store");
      setStore(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/Store/${id}`);
      setStore((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

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

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Store Item List", 14, 10);

    const tableColumn = columns
      .filter((col) => col.id !== "actions" && col.id !== "message")
      .map((col) => col.label);

    const tableRows = store.map((item) =>
      tableColumn.map((col) => {
        if (col === "Image") return "Image not printable";
        return item[columns.find((c) => c.label === col).id];
      })
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      theme: "grid",
    });

    doc.save("store_items.pdf");
  };

  return (
    <>
      {/* Form Card */}
      <StoreADCard
        editingItem={editingItem}
        onSuccess={fetchData}
        clearEdit={() => setEditingItem(null)}
      />

      {/* Download Button */}
      

      {/* Table Display */}
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
                        <button
                          onClick={() => handleEdit(item)}
                          style={{
                            marginRight: 8,
                            padding: "4px 8px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={exportPDF}
      >
        Download as PDF
      </Button>
    </>
  );
}
