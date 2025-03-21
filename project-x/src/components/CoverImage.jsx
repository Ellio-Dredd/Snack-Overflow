
import { Box,Typography, CssBaseline } from "@mui/material";





import UploadPrescription from "../components/PrescriptionCard"

const CoverImage = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "#59C1BD",
          position: "relative",
          width: "100%",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Text Behind */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            position: "absolute",
            top: "0px", // Adjust this value for spacing from the top
            left: "50%", // Move to the center
            fontSize: "190px" ,
            transform: "translateX(-50%)", // Perfectly center the text
            color: "black", // Adjust for visibility
            fontWeight: "bold",
            // zIndex: 0, // Text behind the image
          }}
        >
          Pharmacy
        </Typography>

        {/* Image on Top */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url('https://i.ibb.co/JW0WSrBT/download-removebg.png')`,
            backgroundSize: "contain", // Ensures entire image is visible
            backgroundRepeat: "no-repeat", // Prevents repeating
            backgroundPosition: "center",
            // zIndex: 1, // Image on top of text
          }}
         

        />
         <UploadPrescription/>
       
      </Box>
    </>
  );
};

export default CoverImage;
