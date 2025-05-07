import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import StickyHeadTable from '../components/Table.jsx';
import FeedbackChart from '../components/FeedbackChart.jsx';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AdminFeedback = () => {
  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');

    // Delay to ensure chart and table are fully rendered
    setTimeout(() => {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add title and date before inserting the image
        pdf.setFontSize(16);
        pdf.text('Patient Feedback Report', 10, 15);
        pdf.setFontSize(12);
        pdf.text(`Date: ${new Date().toLocaleDateString()}`, 10, 25);

        // Insert image with offset to leave space for title/date
        pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight);
        pdf.save('feedback-report.pdf');
      });
    }, 500); // 0.5s delay
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <br />
                      <Typography
                            variant="h3"
                            color="primary"
                            sx={{ fontFamily: 'Poppins' , fontWeight: 'bold', }}
                            align="center"
                          >
                            Patient Feedback
                </Typography>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, width: '100%', flexGrow: 1 }}>
          {/* Content wrapper for PDF export */}
          <div id="pdf-content">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <StickyHeadTable />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeedbackChart />
              </Grid>
            </Grid>
          </div>

          {/* PDF Download Button */}
          <Box mt={4} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
              Download Report as PDF
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AdminFeedback;
