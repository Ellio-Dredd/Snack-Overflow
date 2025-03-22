import CoverImage from "../components/CoverImage";
import CareTypeCard from "../components/CareTypeCard";
import Box from '@mui/material/Box';


export default function Home() {
    return (
      <div style={{backgroundColor :"#1e67b0"}} >
        <CoverImage/>
        
       <br></br>

       <Box sx={{ display: 'flex', gap: 2 , marginRight:"5px"}}>
      <CareTypeCard />
      <CareTypeCard />
      <CareTypeCard />
      </Box>
        
      </div>
    );
  }
  