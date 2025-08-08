const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

//router.get('/', usersController.getAllUsers);
router.get('/', usersController.getUsersFiltered);

router.post('/congelar', usersController.congelarUsuario);
router.get('/congelados', usersController.getUsuariosCongelados);

module.exports = router;