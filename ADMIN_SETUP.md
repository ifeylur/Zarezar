# Admin Panel Setup & Access Guide

## 📋 Overview

The Zarezar admin panel allows administrators to manage products, view users, and perform CRUD operations. This guide explains how to create an admin account and access the admin panel.

---

## 🔐 Method 1: Create Admin via API (Recommended)

### Step 1: Create Admin User

Use the backend API to create an admin user. You can use **Postman**, **curl**, or any API client.

#### Using Postman/API Client:

**Endpoint:** `POST http://localhost:5000/api/users`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@zarezar.com",
  "password": "admin123456",
  "isAdmin": true,
  "role": "admin"
}
```

#### Using curl (Command Line):

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@zarezar.com",
    "password": "admin123456",
    "isAdmin": true,
    "role": "admin"
  }'
```

#### Using PowerShell (Windows):

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/users" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "name": "Admin User",
    "email": "admin@zarezar.com",
    "password": "admin123456",
    "isAdmin": true,
    "role": "admin"
  }'
```

**Response:**
```json
{
  "_id": "...",
  "name": "Admin User",
  "email": "admin@zarezar.com",
  "role": "admin",
  "isAdmin": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Step 2: Login as Admin

1. **Start the frontend application:**
   ```bash
   cd frontend
   npm start
   ```

2. **Navigate to login page:**
   - Open `http://localhost:3000/login`
   - Or the website will automatically redirect you to login

3. **Enter admin credentials:**
   - **Email:** `admin@zarezar.com`
   - **Password:** `admin123456`

4. **Click "Login"**

5. **Access Admin Panel:**
   - After login, you'll see the **"Admin"** link in the navbar (only visible to admin users)
   - Click on **"Admin"** to access the admin dashboard
   - Or navigate directly to: `http://localhost:3000/admin`

---

## 🔐 Method 2: Create Admin via MongoDB (Alternative)

If you prefer to create an admin directly in MongoDB:

### Step 1: Connect to MongoDB

Open MongoDB Compass or MongoDB Shell and connect to your database (`zarezar`).

### Step 2: Insert Admin Document

In the `users` collection, insert this document:

```javascript
{
  "name": "Admin User",
  "email": "admin@zarezar.com",
  "password": "$2a$10$...", // Hashed password (use bcrypt)
  "role": "admin",
  "isAdmin": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

**⚠️ Note:** You need to hash the password using bcrypt. It's easier to use Method 1 (API) which handles password hashing automatically.

---

## 🔐 Method 3: Update Existing User to Admin

If you already have a regular user account, you can update it to admin:

### Using API:

**Endpoint:** `PUT http://localhost:5000/api/users/:userId`

**Request Body:**
```json
{
  "isAdmin": true,
  "role": "admin"
}
```

**Example:**
```bash
curl -X PUT http://localhost:5000/api/users/USER_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "isAdmin": true,
    "role": "admin"
  }'
```

---

## 🎯 Admin Panel Features

Once logged in as admin, you can:

1. **View Admin Dashboard** (`/admin`)
   - Overview of admin functions
   - Quick links to manage products

2. **Manage Products** (`/admin/products`)
   - View all products in a table
   - Edit products
   - Delete products
   - Add new products

3. **Add Product** (`/admin/products/add`)
   - Create new products
   - Generate SEO descriptions using AI
   - Set product details (name, price, category, etc.)

4. **Edit Product** (`/admin/products/edit/:id`)
   - Update existing products
   - Modify all product fields

---

## 🔍 Verify Admin Status

### Check in MongoDB:

1. Open MongoDB Compass
2. Connect to your database
3. Go to `users` collection
4. Find your user document
5. Verify:
   - `isAdmin: true`
   - `role: "admin"`

### Check via API:

**Endpoint:** `GET http://localhost:5000/api/users/admins`

This will return all admin users.

---

## 🚨 Troubleshooting

### Issue: "Admin" link not showing in navbar

**Solution:**
- Make sure `isAdmin: true` and `role: "admin"` in the user document
- Logout and login again
- Clear browser cache/localStorage

### Issue: Cannot access `/admin` routes

**Solution:**
- Verify you're logged in
- Check that your user has `isAdmin: true`
- Check browser console for errors

### Issue: Password not working

**Solution:**
- Make sure password is at least 6 characters
- If created via MongoDB directly, ensure password is properly hashed with bcrypt
- Use Method 1 (API) to create admin - it handles password hashing automatically

---

## 📝 Quick Start Summary

1. **Create Admin User:**
   ```bash
   POST http://localhost:5000/api/users
   Body: {
     "name": "Admin",
     "email": "admin@zarezar.com",
     "password": "admin123456",
     "isAdmin": true,
     "role": "admin"
   }
   ```

2. **Login:**
   - Go to `http://localhost:3000/login`
   - Use admin email and password

3. **Access Admin Panel:**
   - Click "Admin" in navbar
   - Or go to `http://localhost:3000/admin`

---

## 🔒 Security Notes

- **Change default password:** After first login, consider updating the admin password
- **Use strong passwords:** Minimum 6 characters, but use longer, complex passwords in production
- **Protect admin accounts:** In production, implement additional security measures
- **JWT Tokens:** Admin status is stored in JWT token, so logout/login after changing admin status

---

## 📞 Support

If you encounter any issues:
1. Check backend server is running (`npm start` in `backend` folder)
2. Check frontend server is running (`npm start` in `frontend` folder)
3. Verify MongoDB connection
4. Check browser console for errors
5. Verify user document in MongoDB has correct admin fields

---

**Last Updated:** 2024

