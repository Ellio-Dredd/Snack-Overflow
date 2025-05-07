
import { Box,Typography, CssBaseline } from "@mui/material";
import backgroundImage from "../assets/background.jpg"; // Adjust the path as necessary
import UploadPrescription from "../components/PrescriptionCard"

const CoverImage = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          marginTop: "-40px",
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: "center",
          top: 0,
          width: "100%",
          height: "80vh",
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
            position: "center",
            marginBottom: "500px", // Adjust this value for spacing from the top
            marginTop: "150px", // Adjust this value for spacing from the top
            left: "50%", // Move to the center
            fontSize: "170px" ,
            // transform: "translateX(-50%)", // Perfectly center the text
            color: "black",// Adjust for visibility
            WebkitTextStroke: "5px #bce4fc", // Text stroke for better visibility
            fontWeight: "bold",
            // zIndex: 0, // Text behind the image
            fontFamily: "'Poppins', sans-serif",
            // fontWeight: 400,

          }}
        >
          P H A R M A C Y
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
            backgroundRepeat: "no-repeat", // Prevents repeating THE IMAGE 
            backgroundPosition: "center",
            // zIndex: 1, // Image on top of text
          }}
         

        />
         
       
      </Box>
    </>
  );
};

export default CoverImage;
