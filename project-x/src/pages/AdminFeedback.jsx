
import * as React from 'react';
import { Box, Container, CssBaseline } from "@mui/material";
import Typography from "@mui/material/Typography";



import StickyHeadTable from '../components/Table.jsx';

const AdminFeedback = () => {
  return (
    <React.Fragment>
      <CssBaseline /><br></br>
            <Typography variant="h3" color="White" align="center">
                    Patient Feedback
            </Typography>
      <Container maxWidth="lg">
        {/* Ensure the Box expands fully */}
        <Box sx={{ mt: 4, width: "100%", display: "flex", justifyContent: "center", flexGrow: 1 }}>

          

          <StickyHeadTable />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AdminFeedback;


