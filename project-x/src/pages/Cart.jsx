import {Container,Typography,Card,CardMedia,CardContent,Button,Box,Divider} from "@mui/material";
  import { useState, useEffect } from "react";
  import axios from "axios";
  
  const API_URL = "http://localhost:3000/api/cart";
  
  export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      fetchCartItems();
    }, []);
  
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(API_URL);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    const increaseQuantity = async (id) => {
      await axios.put(`${API_URL}/increase/${id}`);
      fetchCartItems();
    };
  
    const decreaseQuantity = async (id) => {
      await axios.put(`${API_URL}/decrease/${id}`);
      fetchCartItems();
    };
  
    const removeItem = async (id) => {
      await axios.delete(`${API_URL}/${id}`);
      fetchCartItems();
    };
  
    const handleCheckout = async () => {
      try {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const payload = {
          userId: "guest",
          items: cartItems,
          total,
        };
        await axios.post("http://localhost:3000/api/cart/checkout", payload);
        alert("Order placed successfully!");
        setCartItems([]);
        await axios.delete(API_URL); // clear cart
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Checkout failed!");
      }
    };
  
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #c2e9fb, #a1c4fd)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          paddingTop: "30px",
          paddingBottom: "40px",
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
              marginBottom: "30px",
            }}
          >
            Shopping Cart
          </Typography>
  
          <Box
            sx={{
              maxHeight: "500px",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {cartItems.map((item) => (
              <Card
                key={item._id}
                sx={{
                  display: "flex",
                  mb: 2,
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 150, objectFit: "cover" }}
                  image={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary">
                      Price: Rs. {item.price}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      mt={2}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        -
                      </Button>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        +
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => removeItem(item._id)}
                        sx={{ ml: 2 }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
  
          {cartItems.length > 0 && (
            <Box textAlign="right" mt={4}>
              <Divider />
              <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                Total: Rs. {totalPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                sx={{
                  mt: 2,
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 4,
                }}
              >
                Checkout
              </Button>
            </Box>
          )}
        </Container>
      </div>
    );
  }
  