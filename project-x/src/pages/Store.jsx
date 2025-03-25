import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Store() {
  const [products, setProducts] = useState([]);

  // Fetch items from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://rajapaksepharmacy.azurewebsites.net/api/store"); 
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching store items:", error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      <Container className='mt-4'>
        <Typography variant='h4' className='text-center mb-4' color="White">
          Pharmacy Store
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.message || "https://via.placeholder.com/150"} // Default image if none
                  alt={product.ItemName}
                />
                <CardContent>
                  <Typography variant='h6'>{product.ItemName}</Typography>
                  <Typography color='text.secondary'>Rs. {product.ItemPrice}</Typography>
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
  );
}
