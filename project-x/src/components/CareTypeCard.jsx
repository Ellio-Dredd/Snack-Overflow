
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';


export default function CareTypeCard({ image, title }) {
  return (

    <Card sx={{ maxWidth: 345  , marginLeft:"13px"}}>
      <CardMedia
        sx={{ height: 140 }}
        image={image} title={title} />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "20px" }}  >
         {title}
        </Typography>
       
    </CardContent>

    </Card>

  );
}


//  PropTypes validation
CareTypeCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

