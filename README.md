# Presented By Snack Overflow
# Rajapakshe Pharmacy Web Application 🏥

A full-stack web application for pharmacy management and e-channeling services built with the MERN stack.

## Features ✨

- Online medicine ordering system
- E-channeling service with doctor appointments
- Prescription management
- Real-time inventory tracking
- Secure payment processing
- User authentication and authorization
- Responsive design for all devices

## Tech Stack 🛠️

- **Frontend:** React.js, Material Ui, BootStrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Integration:** (Payment gateway to be decided)

## Prerequisites 📋

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation 💻

1. Clone the repository
```bash
git clone https://github.com/your-username/Snack-Overflow.git
cd Snack-Overflow
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd frontend
npm install
```

4. Create .env file in backend directory
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend in new terminal
cd frontend
npm start
```

## Project Structure 📁

```
rajapakshe-pharmacy/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints 🔌

### Auth Routes
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Appointment Routes
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get user appointments
- `GET /api/appointments/:id` - Get single appointment
- `PUT /api/appointments/:id` - Update appointment status

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Team Members 👥

- Team Lead / Dev-Ops Engineer - Yasas Arandara
- Main Dev  - Dulitha Rajapakse
- Ui/Ux Designer - Ridmi Kaveesha
- QA Tester - Shehan Vishwajith
- Network Admin - Sachintha Rajapaksha
- Database Admin - Chenitha Nethvin 



## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments 🙏

- Thanks to all contributors who helped in building this project
- Special thanks to Rajapakshe Pharmacy for their support and collaboration

---
Made with ❤️ by Team Snack Overflow
