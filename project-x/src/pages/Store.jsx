import { useEffect, useState } from "react";
import {Container,Grid,Card,CardContent,CardMedia,Typography,Button,Box,} from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/cart";

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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Sign in to view store items.");
        window.location.href = "/signin";
        return;
      }

      try {
        const productsResponse = await axios.get("http://localhost:3000/api/Store", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (productsResponse.status === 200) {
          setProducts(productsResponse.data);
        } else {
          alert(productsResponse.data.message);
        }

        const userResponse = await axios.get("http://localhost:3000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.status === 200) {
          setUser(userResponse.data);
        } else {
          console.error("Error fetching user:", userResponse.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message);
      }
    };

    fetchProductsAndUser();
  }, []);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    alert("Item added successfully.");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    if (!user) {
      alert("User information not loaded. Please try again.");
      return;
    }

    const item = {
      productId: product.ItemID,
      name: product.ItemName,
      price: product.ItemPrice,
      image: product.message,
      userID: user._id,
      quantity: 1,
    };

    addToCart(item);
  };

  const handleBuyNow = async (product) => {
    const token = localStorage.getItem("token");
    alert("Item purchased successfully.");
    if (!token) {
      alert("Please sign in to continue.");
      return;
    }

    if (!user) {
      alert("User not loaded yet. Try again.");
      return;
    }

    const item = {
      name: product.ItemName,
      price: product.ItemPrice,
      quantity: 1,
      image: product.message,
    };

    const total = item.price * item.quantity;

    try {
      await axios.post("http://localhost:3000/api/delivery", {
        orderId: user._id,
        deliveryPerson: "Assigned Soon",
        deliveryAddress: "Address from user profile or form",
        estimatedDeliveryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        items: [item],
        total: total,
      });

      navigate("/OrderConfirmation", {
        state: {
          trackingNo: user._id,
          items: [item],
          total: total,
        },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Order placement failed.");
    }
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
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
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
                      onClick={() => handleBuyNow(product)}
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
