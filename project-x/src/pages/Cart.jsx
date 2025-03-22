
import { Container, List, ListItem, ListItemText, Typography, Button, Box } from "@mui/material";
import  { useState } from "react";
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

    const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)

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
                <Typography variant="h6">Total: Rs{totalPrice}</Typography>
                <Button variant="contained" color="primary" className="mt-2">Checkout</Button>
            </Box>
        </Container> 
        </div>
      )
    };


