import  { useState } from "react";
import {  Button, Card, CardContent, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from '@mui/icons-material/Description';

const UploadPrescription = () => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        position: "absolute",
        top: "235px",
        left: "70%", 
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        margin:0,
        borderRadius: "16px",
        boxShadow: 9,
        width: "190px",
        height: "175px",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="600" fontFamily="Poppins, sans-serif" >
          Upload Prescription 

         
         
        </Typography>
       
        
        <Button
          variant="outlined"
          sx={{ marginTop: 0, width: "90%",height:"30%" ,color: "black",fontFamily: "Poppins, sans-serif"}}
        >
           <DescriptionIcon
        sx={{ }}/>
        </Button>

        
        <input
          type="file"
          accept="image/*,application/pdf"
          id="upload-prescription"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <label htmlFor="upload-prescription">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{ marginBottom: 1, marginTop: 1, width: "100%" }}
          >
            {fileName ? "Uploaded" : "Upload"}
          </Button>
        </label>
        {fileName && (
          <Typography
            variant="body2"
            sx={{ marginTop: 0, textAlign: "center", color: "gray" }}
          >
            {fileName}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadPrescription;
