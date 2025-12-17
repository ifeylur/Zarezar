const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllAdmins,
  signup,
  login
} = require('../controllers/userController');

// Auth Routes
router.post('/auth/signup', signup);
router.post('/auth/login', login);

// User CRUD Routes
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/admins', getAllAdmins);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;

