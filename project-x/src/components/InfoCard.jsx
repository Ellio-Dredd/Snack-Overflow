

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { MdEmail, MdLocalPhone } from 'react-icons/md'
import ContactInfo from './Contactinfo'


export default function InfoCard() {
  return (
    <Card style={{
      width: "450px",
      height: "500px",
      padding: "20px",
      
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"

    }}>
      <CardContent>
        <Typography>
          <ContactInfo icon={<MdLocalPhone />} text="+94 0760547176" />
        </Typography>
        <Typography>
          <ContactInfo icon={<MdEmail />} text="sample@gmail.com" />
        </Typography>
        <Typography>
          <ContactInfo icon={<MdLocalPhone />} text="Kelaniya, Colombo" />
        </Typography>
      </CardContent>
    </Card>
  );
}
