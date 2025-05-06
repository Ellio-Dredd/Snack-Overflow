
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

import { Container, Typography, Button, Box } from "@mui/material";

export default function OrderConfirmation() {
  const location = useLocation();
  const { items = [], total = 0 } = location.state || {};

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("e-Bill", 14, 20);
    doc.setFontSize(12);
    doc.text(`Thank you for your order!`, 14, 30);
    doc.text(`Total: Rs. ${total}/=`, 14, 40);

    const tableData = items.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      `Rs. ${item.price}`,
      `Rs. ${item.quantity * item.price}`,
    ]);

    autoTable(doc, {
      head: [["#", "Item", "Qty", "Price", "Subtotal"]],
      body: tableData,
      startY: 50,
    });

    doc.save("e-bill.pdf");
};

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your order has been placed successfully.
      </Typography>

      <Box mt={4}>
        <Typography variant="h6">Ordered Items:</Typography>
        {items.map((item, idx) => (
          <Typography key={idx}>
            {item.name} - {item.quantity} × Rs. {item.price}
          </Typography>
        ))}
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          Total: Rs. {total}/=
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 4, px: 4, borderRadius: "30px" }}
        onClick={generatePdf}
      >
        Download e-Bill PDF
      </Button>
    </Container>
  );
}
