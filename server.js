// `` 
const express = require('express');

const app = express();

const puerto = 3000;

app.use(express.json());

const usersRouter = require('./routes/users.js');
app.use('/api/usuarios', usersRouter)

app.get("/", (request, response) => {
  response.send('Hola')
})






app.listen(puerto, () => {
  console.log(`servidor levantado en el puerto ${puerto}...`)
})
