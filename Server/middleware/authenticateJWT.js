const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Extract JWT from 'Authorization' header
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    // Attach the decoded user data to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  });
};


module.exports = authenticateJWT;  

