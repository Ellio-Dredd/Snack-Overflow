import CoverImage from "../components/CoverImage";
import CareTypeCard from "../components/CareTypeCard";
import Box from '@mui/material/Box';
import Navbar from "../components/Navbar";



export default function Home() {
    return (
      
      <div style={{backgroundColor :"white"}} >
       
        <CoverImage/>
        
       <br></br>

       <Box sx={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
      <CareTypeCard
              image="https://i.ibb.co/WvQTJkyT/image.png"
              title="Bones care"
             
            />
            <CareTypeCard
              image="https://i.ibb.co/DHyCY6fn/image-1.png"
              title="Diabete Care"
              
            />
            <CareTypeCard
              image="https://i.ibb.co/BHhgRS06/image-2.png"
              title= "    Kidney Care   "
            
            />
              <CareTypeCard
              image="https://i.ibb.co/Z6X3NbJc/image-3.png"
              title="  Liver Care  "
              
            />
              <CareTypeCard
              image="https://i.ibb.co/67sWqZBG/image-4.png"
              title="Eye Care"
             
            />
      </Box>
        
      </div>
    );
  }
  