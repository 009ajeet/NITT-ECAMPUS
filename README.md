# NIT Trichy Ecampus

## Overview
NIT Trichy Ecampus is a web-based platform built using the MERN (MongoDB, Express, React, Node.js) stack. It provides a seamless and efficient way for students and administrators to manage campus activities. The platform includes authenticated login and registration, an admin dashboard, a student dashboard, and a homepage.

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Admin Dashboard**: Manage users, view statistics, and handle system settings.
- **Student Dashboard**: View courses, manage profile, and access relevant campus information.
- **Homepage**: A landing page with information about the platform.

## Technologies Used
- **Frontend**: React.js (with Redux for state management)
- **Backend**: Node.js and Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS / Material-UI (optional)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/067prabhat/NITT_M-tech.git
   cd NIT-Trichy
   ```

2. Install dependencies:
   ```sh
   # Install backend dependencies
   cd backend
   npm install
   ```
   ```sh
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory and configure your database URL and secret keys.

4. Run the project:
   ```sh
   # Start backend
   cd backend
   npm start
   ```

   ```sh
   # Start frontend
   cd frontend
   npm start
   ```

## API Endpoints
- **Auth Routes**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login user and return JWT token

- **User Routes**
  - `GET /api/users/me` - Fetch user details (protected route)

- **Admin Routes**
  - `GET /api/admin/dashboard` - Fetch admin-specific data

## Contributing
Feel free to contribute by forking the repository and submitting pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any queries or contributions, contact [as7641012@gmail.com] or open an issue in the repository.