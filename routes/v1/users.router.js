const express = require('express');

const {
  createUserHandler,
} = require('../../controllers/user.controller');

const router = express.Router();

router.post('/signup', createUserHandler);

router.get('/:userId', (req, res) => {
  res.status(200).json({
    message: 'User details',
  });
});

router.patch('/:userId', (req, res) => {
  res.status(200).json({
    message: 'User updated',
  });
});

router.post('/:userId', (req, res) => {
  res.status(200).json({
    message: 'User created',
  });
});

router.delete('/:userId', (req, res) => {
  res.status(200).json({
    message: 'User deleted',
  });
});

router.post('/lostPassword', (req, res) => {
  res.status(200).json({
    message: 'Request pw reset',
  });
});

module.exports = router;
