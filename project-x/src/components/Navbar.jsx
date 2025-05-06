import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Box, Button, Tooltip, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../UserContext";


export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase();
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Store", to: "/Store" },
    { label: "E-Channeling", to: "/SelectAppointment" },
    { label: "Contact", to: "/Contact" },
    { label: "Delivery", to: "/TrackOrder" }
  ];

  return (
    <>
      <AppBar position="static" color="primary" elevation={4}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)} sx={{ mr: 2, display: { md: "none" } }}>
              <MenuIcon />
            </IconButton>
            <image src="/Plogo.png" alt="Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
            <Typography variant="h6" sx={{ 
              textDecoration: "none", 
              color: "inherit", 
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              }}>
              Rajapakse Pharmacy
            </Typography>
          </Box>

          {/* Center - Nav Links */}
          <Box sx={{ 
            display: { xs: "none", md: "flex" }, 
            gap: 3,
            marginRight: "175px",
            }}>
            {navItems.map((item) => (
              <Button
              key={item.label}
              component={Link}
              to={item.to}
              color="inherit"
              sx={{
                textTransform: "none",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  color: '#ffffff', 
                  borderRadius: "35px",
                }
              }}
            >
              {item.label}
            </Button>
            ))}
          </Box>

          {/* Right - Auth + Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user ? (
              <>
                <Tooltip title={user.name}>
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "#ffffff", color: "primary.main" }}>
                      {getInitials(user.name)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/SignIn" color="inherit">Log In</Button>
                <Button component={Link} to="/SignUp" variant="outlined" color="inherit">Sign Up</Button>
              </>
            )}
            <IconButton component={Link} to="/Cart" color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} component={Link} to={item.to}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
