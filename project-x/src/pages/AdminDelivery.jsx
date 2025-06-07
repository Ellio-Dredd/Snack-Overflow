import { useEffect, useState, useRef } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Box
} from '@mui/material';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const AdminDelivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const tableRef = useRef(null); // ref to the table for PDF

  useEffect(() => {
    axios.get('/api/admin-delivery')
      .then(res => setDeliveries(res.data))
      .catch(err => console.error('Error fetching deliveries:', err));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [id]: newStatus }));
  };

  const updateStatus = (id) => {
    const status = statusUpdates[id];
    if (!status) return;

    axios.patch(`/api/admin-delivery/${id}/status`, { status })
      .then(res => {
        setDeliveries(prev => prev.map(del => (del._id === id ? res.data : del)));
        alert('Status updated successfully');
      })
      .catch(err => {
        console.error('Error updating status:', err);
        alert('Failed to update status');
      });
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
      pdf.save('delivery-report.pdf');
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Admin Panel - Manage Deliveries
      </Typography>

      <Box mt={4} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Delivery Person</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery._id}>
                <TableCell>{delivery.orderId?.orderNumber || 'N/A'}</TableCell>
                <TableCell>{delivery.deliveryPerson}</TableCell>
                <TableCell>{delivery.deliveryAddress}</TableCell>
                <TableCell>
                  {Array.isArray(delivery.items) && delivery.items.length > 0 ? (
                    <ul>
                      {delivery.items.map((item, index) => (
                        <li key={index}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No items'
                  )}
                </TableCell>
                <TableCell>
                  <select
                    value={statusUpdates[delivery._id] || delivery.status}
                    onChange={(e) => handleStatusChange(delivery._id, e.target.value)}
                    style={{
                      backgroundColor: '#2d3748',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: '1px solid #4a5568',
                      fontSize: '14px',
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => updateStatus(delivery._id)}
                    sx={{ mr: 1 }}
                  >
                    Update Status
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

export default AdminDelivery;
