# Zarezar - MERN E-Commerce Website

A complete MERN stack e-commerce website for selling women's skincare products (face scrubs & face masks).

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `zarezar` (or your preferred database name)

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
```

**Important:** Replace `your_mongodb_atlas_connection_string_here` with your actual MongoDB Atlas connection string.

Start the backend server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
Zarezar/
├── backend/          # Node.js + Express + MongoDB
│   ├── config/      # Database configuration
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── controllers/ # Route controllers
│   └── server.js    # Express server
├── frontend/        # React.js
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context providers
│   │   └── App.jsx      # Main app component
│   └── public/
└── README.md
```

## Features

- ✅ Product CRUD operations (Admin)
- ✅ Product catalog with filters (skin type, price range, category, search)
- ✅ Shopping cart functionality
- ✅ Checkout process
- ✅ SEO Description Generator (dummy AI)
- ✅ MongoDB integration
- ✅ React Context for state management

## API Endpoints

### Products
- `POST /api/products` - Create product
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### AI
- `POST /api/ai/generate-description` - Generate SEO description

## Admin Access

Navigate to `/admin` to access the admin dashboard for managing products.

## Running the Full Project

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm install
   # Update .env with your MongoDB URI
   npm start
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Notes

- Make sure MongoDB Atlas connection string is correctly set in `backend/.env`
- Backend must be running before frontend can fetch data
- The SEO Description Generator is a dummy implementation (returns mock text)
- No authentication is implemented (admin access is open)

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, React Router, Axios, React Context API
- **Database:** MongoDB Atlas

