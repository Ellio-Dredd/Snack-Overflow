import { Container, List, ListItem, ListItemText, Typography, Button, Box } from "@mui/material";
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
        try {
            await axios.put(`${API_URL}/increase/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const decreaseQuantity = async (id) => {
        try {
            await axios.put(`${API_URL}/decrease/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <Container className="mt-4">
            <Typography variant="h4" className="text-center mb-4">Shopping Cart</Typography>
            <List>
                {cartItems.map((item) => (
                    <ListItem key={item._id} divider>
                        <ListItemText primary={item.name} secondary={`Price: Rs.${item.price} | Quantity: ${item.quantity}`} />
                        <Button variant="contained" color="primary" onClick={() => decreaseQuantity(item._id)}>-</Button>
                        <Typography variant="body1" style={{ margin: "0 10px" }}>{item.quantity}</Typography>
                        <Button variant="contained" color="secondary" onClick={() => increaseQuantity(item._id)}>+</Button>
                        <Button variant="contained" color="secondary" onClick={() => removeItem(item._id)} style={{ marginLeft: "10px" }}>Remove</Button>
                    </ListItem>
                ))}
            </List>
            <Box textAlign="right" mt={3}>
                <Button variant="contained" color="primary" className="mt-2">Checkout</Button>
            </Box>
        </Container>
    );
}
