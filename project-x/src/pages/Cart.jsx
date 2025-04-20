import React, {useState} from 'react'
import { Container, List, ListItem, ListItemText, Typography, Button, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const addCartItem = [
    {id: 1, name:"Pro1", Price: 200, quantity: 1},
    {id: 2, name:"Pro2", Price: 300, quantity: 1},
];

export default function Cart() {
    const [cartItems, setCartItems] = useState (addCartItem)
    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item))
    }

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item))
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id))
    }

<<<<<<< Updated upstream
    const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)
=======
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
>>>>>>> Stashed changes

    const handleCheckout = async () => {
        try {
            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const payload = {
                userId: "guest", // Replace with actual user ID if available
                items: cartItems,
                total,
            };

            await axios.post("http://localhost:3000/api/cart/checkout", payload);
            alert("Order placed successfully!");

            setCartItems([]);
            await axios.delete("http://localhost:3000/api/cart"); // Clear cart in DB
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed!");
        }
    };

    return (
        <div>
         <Container className="mt-4">
            <Typography variant="h4" className="text-center mb 4">Shopping Cart</Typography>
            <List>
                {cartItems.map((item) => (
                    <ListItem key={item.id} divider>
                       <ListItemText primary={item.name} secondary={`Price: Rs.${item.Price} | Quantity: ${item.quantity}`} />
                       <Button variant="contained" color="primary" onClick={() => decreaseQuantity(item.id)}>-</Button>
                       <Typography variant="body1" style={{margin:"0 10px"}}>{item.quantity}</Typography>
                       <Button variant="contained" color="secondary" onClick={() => increaseQuantity(item.id)}>+</Button>
                       <Button variant="contained" color="secondary" onClick={() => removeItem(item.id)} style={{ marginLeft: "10px" }}>Remove</Button>
                    </ListItem>
                ))}
            </List>
            <Box textAlign="right" mt={3}>
<<<<<<< Updated upstream
                <Typography variant="h6">Total: Rs{totalPrice}</Typography>
                <Button variant="contained" color="primary" className="mt-2">Checkout</Button>
=======
                <Button variant="contained" color="primary" className="mt-2" onClick={handleCheckout}>Checkout</Button>
>>>>>>> Stashed changes
            </Box>
        </Container> 
        </div>
      )
    };


