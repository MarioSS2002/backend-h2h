// `` 
require('dotenv').config();
const express = require('express');

const app = express();

const puerto = 3000;

app.use(express.json());

const { globalErrorHandler } = require('./utils/errorHandler');

const usersRouter = require('./routes/users.js');
app.use('/api/users', usersRouter)

app.get("/", (request, response) => {
  response.send('Hola')
})

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err);
})

app.use(globalErrorHandler);

app.listen(puerto, () => {
  console.log(`servidor levantado en el puerto ${puerto}...`)
})
