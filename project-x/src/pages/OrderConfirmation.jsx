import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Container, Typography, Button, Box } from "@mui/material";

export default function OrderConfirmation() {
  const location = useLocation();
  const { trackingNo, items, total } = location.state || {}; // Get order details from location state

  const generatePdf = () => {
  const doc = new jsPDF();

  // Header Section
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text("Rajapakse Pharmacy & Grocery", 14, 20);
  doc.setFontSize(12);
  doc.text("Thank you for your order!", 14, 30);

  // Order ID
  doc.setFontSize(12);
  doc.text(`Order ID: ${trackingNo}`, 14, 40);

  // Order Details Section
  const tableData = items.map((item, index) => [
    index + 1,
    item.name,
    item.quantity,
    `Rs. ${item.price}`,
    `Rs. ${item.quantity * item.price}`,
  ]);

  // Table header
  autoTable(doc, {
    head: [["#", "Item", "Qty", "Price", "Subtotal"]],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 5,
      halign: 'center',
      valign: 'middle',
      lineColor: [44, 62, 80],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: [52, 152, 219],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [236, 240, 241],
    },
    margin: { top: 10, bottom: 30 },
  });

  // Total Section
  const totalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: Rs. ${total}/=`, 14, totalY);

  // Footer Section
  const footerY = doc.internal.pageSize.height - 20;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text("Thank you for shopping with us!", 14, footerY);

  // Save the PDF
  doc.save("e-bill.pdf");
};

  return (
    <Container sx={{ textAlign: "center", mt: 5, padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Thank you for your order!
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif",
          color: "#555",
        }}
      >
        Your order has been placed successfully.
      </Typography>

      <Box
        mt={5}
        sx={{
          textAlign: "left",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Order ID: {trackingNo}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            color: "#555",
            mt: 2,
          }}
        >
          Ordered Items:
        </Typography>
        {items.map((item, idx) => (
          <Typography
            key={idx}
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#555",
              fontWeight: "400",
              lineHeight: 1.5,
            }}
          >
            {item.name} - {item.quantity} × Rs. {item.price}
          </Typography>
        ))}
        <Typography
          sx={{
            fontFamily: "'Poppins', sans-serif",
            mt: 2,
            fontWeight: "bold",
            color: "#333",
            fontSize: "1.2rem",
          }}
        >
          Total: Rs. {total}/=
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          mt: 4,
          px: 4,
          borderRadius: "30px",
          backgroundColor: "#4CAF50", // Green color
          color: "#fff",
          fontWeight: "bold",
          '&:hover': {
            backgroundColor: "#45a049", // Darker green on hover
          },
        }}
        onClick={generatePdf}
      >
        Download e-Bill PDF
      </Button>
    </Container>
  );
}
