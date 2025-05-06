import * as React from 'react';
import { Box, Container, CssBaseline, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import StickyHeadTable from '../components/Table.jsx';
import FeedbackChart from '../components/FeedbackChart.jsx'; // ✅ Import Chart

const AdminFeedback = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <br />
      <Typography variant="h3" color="white" align="center">
        Patient Feedback
      </Typography>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, width: "100%", flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <StickyHeadTable />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeedbackChart />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AdminFeedback;
