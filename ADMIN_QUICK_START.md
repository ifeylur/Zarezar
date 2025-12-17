# 🚀 Admin Panel - Quick Start Guide

## ⚡ Fast Setup (3 Steps)

### Step 1: Create Admin Account

**Using Postman/API Client:**

```
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@zarezar.com",
  "password": "admin123456",
  "isAdmin": true,
  "role": "admin"
}
```

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@zarezar.com","password":"admin123456","isAdmin":true,"role":"admin"}'
```

### Step 2: Login

1. Go to: `http://localhost:3000/login`
2. Enter:
   - **Email:** `admin@zarezar.com`
   - **Password:** `admin123456`
3. Click **Login**

### Step 3: Access Admin Panel

- Click **"Admin"** link in navbar (appears after login)
- Or go to: `http://localhost:3000/admin`

---

## 📍 Admin Panel URLs

- **Dashboard:** `/admin`
- **Product List:** `/admin/products`
- **Add Product:** `/admin/products/add`
- **Edit Product:** `/admin/products/edit/:id`

---

## ✅ Verify Admin Status

**Check via API:**
```
GET http://localhost:5000/api/users/admins
```

**Check in MongoDB:**
- Collection: `users`
- Look for: `isAdmin: true` and `role: "admin"`

---

## 🔄 Convert Regular User to Admin

```
PUT http://localhost:5000/api/users/:userId
Content-Type: application/json

{
  "isAdmin": true,
  "role": "admin"
}
```

---

## ⚠️ Important Notes

- Regular signup creates **user** accounts (not admin)
- Admin accounts must be created via API or MongoDB
- Password must be at least 6 characters
- After creating admin, logout/login to see admin link

---

For detailed documentation, see `ADMIN_SETUP.md`

