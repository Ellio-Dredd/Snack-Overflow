import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


// Add to cart function 
const API_URL = "http://localhost:3000/api/cart"; 
// Your backend cart service URL

export const addToCart = async (item) => {
  try {
    await axios.post(API_URL, item);
    console.log("Item added to cart:", item);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export default function Store() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/Store", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching store items:", error);
        alert("Error fetching items: " + error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    const item = {
      productId: product.ItemID,
      name: product.ItemName,
      price: product.ItemPrice,
      quantity: 1,
    };

    addToCart(item);
  };

  return (
    
    
    <div
    
    
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #c2e9fb, #a1c4fd)",
        paddingTop: "10px",
        paddingBottom: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      
      <Container>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{
            fontWeight: "bold",
            color: "#2a2a2a",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "40px",
            marginTop: "30px",
          }}
        >
          Pharmacy Store
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={product.message || "https://via.placeholder.com/150"}
                  alt={product.ItemName}
                  style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {product.ItemName}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Rs. {product.ItemPrice}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        borderRadius: "30px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        borderRadius: "30px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
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