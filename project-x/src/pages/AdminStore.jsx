
import * as React from 'react';
import { Box, Container, CssBaseline } from "@mui/material";
import Typography from "@mui/material/Typography";
import StoreADCard from '../components/StoreADCard'; 
import StoreTable from '../components/StoreTable'; 





const AdminStore = () => {
  return (
    <React.Fragment>
      <CssBaseline /><br></br>
            <Typography variant="h3" color="White" align="center">
                    Admin Items Validation
            </Typography>

            <StoreADCard/>
      <Container maxWidth="lg">
        {/* Ensure the Box expands fully */}
        <Box sx={{ mt: 4, width: "100%", display: "flex", justifyContent: "center", flexGrow: 1 }}>

          
           
          <StoreTable />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AdminStore;


