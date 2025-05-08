import { Container, Typography, Card, CardContent, Button, Box, Divider, CardMedia } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/cart";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    fetchPreviousOrders();
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const userResponse = await axios.get(
        "http://localhost:3000/api/auth/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userID = userResponse.data._id;
      const response = await axios.get(`${API_URL}?userID=${userID}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchPreviousOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const userResponse = await axios.get(
        "http://localhost:3000/api/auth/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userID = userResponse.data._id;
      const response = await axios.get(
        `http://localhost:3000/api/delivery?userId=${userID}`
      );
      setPreviousOrders(response.data);
    } catch (error) {
      console.error("Error fetching previous orders:", error);
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
    const token = localStorage.getItem("token");

    try {
      const userResponse = await axios.get(
        "http://localhost:3000/api/auth/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userId = userResponse.data._id;
      const userAddress = userResponse.data.address;
      const userName = userResponse.data.name;

      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      await axios.post("http://localhost:3000/api/delivery", {
        orderId: userId,
        deliveryPerson: "Assigned Soon",
        deliveryAddress: userAddress,
        estimatedDeliveryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        items: cartItems,
        total: totalPrice,
        name: userName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Order placed successfully!");
      setCartItems([]);

      try {
        await axios.delete("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (deleteError) {
        console.error("Failed to clear cart:", deleteError);
      }

      navigate("/OrderConfirmation", {
        state: {
          trackingNo: userId,
          items: cartItems,
          total: totalPrice,
        },
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed!");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleReorder = async (orderItems) => {
    const token = localStorage.getItem("token");

    try {
      const userResponse = await axios.get(
        "http://localhost:3000/api/auth/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userID = userResponse.data._id;

      const reorderedItems = orderItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const total = reorderedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const response = await axios.post(
        "http://localhost:3000/api/delivery",
        {
          orderId: userID,
          deliveryPerson: "Assigned Soon",
          deliveryAddress: userResponse.data.address,
          estimatedDeliveryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
          items: reorderedItems,
          total: total,
        }
      );

      const newOrder = response.data;
      alert("Order placed successfully!");

      navigate("/OrderConfirmation", {
        state: {
          trackingNo: newOrder._id,
          items: reorderedItems,
          total: total,
        },
      });
    } catch (error) {
      console.error("Error reordering items:", error.message || error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      alert("Error reordering items!");
    }
  };

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
                    justifyContent="center"
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
            <Typography
              variant="h5"
              sx={{
                mt: 2,
                fontWeight: "600",
                fontFamily: "'Poppins', sans-serif",
                textAlign: "right",
                ml: 1,
                color: "#333",
              }}
            >
              Total: Rs. {totalPrice}/=
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

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            fontWeight: "bold",
            color: "#2a2a2a",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "30px",
            marginTop: "50px",
          }}
        >
          Previous Orders
        </Typography>

        {previousOrders.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            No previous orders found.
          </Typography>
        ) : (
          previousOrders.map((order) => {
            const orderTotal = order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );

            return (
              <Card
                key={order._id}
                sx={{
                  display: "flex",
                  mb: 2,
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Order ID: {order._id}
                  </Typography>
                  {order.items.map((item, index) => (
                    <Typography key={index} color="text.secondary">
                      {item.name} - {item.quantity} x Rs. {item.price}
                    </Typography>
                  ))}
                  <Typography variant="h6" sx={{ fontWeight: 600, marginTop: "10px" }}>
                    Total: Rs. {orderTotal}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReorder(order.items)}
                    sx={{ mt: 2, borderRadius: "20px" }}
                  >
                    Reorder
                  </Button>
                </Box>
              </Card>
            );
          })
        )}
      </Container>
    </div>
  );
}
