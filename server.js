// `` 

const express = require('express');

const app = express();

const puerto = 3000;

app.get("/", (request, response) => {
  response.send('Hola')
})

app.listen(puerto, () => {
  console.log(`servidor levantado en el puerto ${puerto}...`)
})
