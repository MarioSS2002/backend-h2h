const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');


router.get('/', usersController.getUsersFiltered);

router.post('/congelar', usersController.congelarUsuario);
router.get('/congelados', usersController.getUsuariosCongelados);

router.post('/separar', usersController.separarUsuario); 
router.get('/separados', usersController.getUsuariosSeparados)

module.exports = router;