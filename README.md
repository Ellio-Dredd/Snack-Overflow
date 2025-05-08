# 🍿 Snack Overflow

<div align="center">
  
  ![Snack Overflow Logo](https://via.placeholder.com/200x200?text=Snack+Overflow)
  
  **An interactive web application for exploring, rating, and ordering snacks online.**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
</div>

## 🚀 Features

- **🔐 User Authentication**
  - Secure login and signup functionality
  - JWT-based authentication

- **🍪 Snack Exploration**
  - Browse snacks by categories
  - Search functionality
  - Detailed snack information pages

- **🛒 Shopping Experience**
  - Add snacks to cart
  - Adjust quantities
  - Place and track orders

- **🧑‍💼 Admin Dashboard**
  - Product management (add, edit, remove)
  - User management
  - Order tracking and fulfillment

## 🛠️ Tech Stack

| Frontend | Backend | Database | Authentication |
|----------|---------|----------|----------------|
| React    | Node.js | MongoDB  | JWT            |
| Material UI | Express | Mongoose | -              |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (local or Atlas)

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ellio-Dredd/Snack-Overflow.git
   cd Snack-Overflow
   ```

2. **Environment Setup**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```

5. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api`

## 📱 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/400x200?text=Homepage" alt="Homepage" width="45%">
  <img src="https://via.placeholder.com/400x200?text=Product+Page" alt="Product Page" width="45%">
</div>

<div align="center">
  <img src="https://via.placeholder.com/400x200?text=Shopping+Cart" alt="Shopping Cart" width="45%">
  <img src="https://via.placeholder.com/400x200?text=Admin+Dashboard" alt="Admin Dashboard" width="45%">
</div>

## 🗂️ Project Structure

```
Snack-Overflow/
├── client/              # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
├── server/              # Backend Node.js application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env                 # Environment variables
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

For any queries or suggestions, feel free to:
- Open an issue on GitHub
- Contact the team via GitHub

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by the Snack Overflow Team
</div>
