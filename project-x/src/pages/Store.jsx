
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
    {id: 1, name: "Pro1", Price: "Rs.12", image: ""},
    {id: 2, name: "Pro2", Price: "Rs.12", image: ""},
    {id: 3, name: "Pro3", Price: "Rs.12", image: ""},
    {id: 4, name: "Pro4", Price: "Rs.12", image: ""},
    {id: 5, name: "Pro5", Price: "Rs.12", image: ""},
    {id: 6, name: "Pro6", Price: "Rs.12", image: ""},
    {id: 7, name: "Pro7", Price: "Rs.12", image: ""},
    {id: 8, name: "Pro8", Price: "Rs.12", image: ""},
]


export default function Store() {
  return (
    <div>
      <Container className='mt-4'>
        <Typography variant='h4' className='text-center mb-4'>
            Pharmacy Store
        </Typography>
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card>
                        <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                        <CardContent>
                            <Typography variant='h6'>{product.name}</Typography>
                            <Typography color='text.secondary'>{product.Price}</Typography>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant="contained" color="primary">
                                    Add to Cart
                                </Button>
                                <Button variant="contained" color="primary">
                                    Buy Now
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  )
}
