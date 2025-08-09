API de Usuarios:

Esta es la documentación de la API RESTful para la gestión de usuarios, con funcionalidades de filtrado, congelamiento y separación de usuarios.

Endpoints
GET /api/users
  Obtiene todos los usuarios.

GET /api/users?email={email}
  Obtiene usuarios filtrados por email.

GET /api/users?city={city}
  Obtiene usuarios filtrados por ciudad.

GET /api/users?id={id}
  Obtiene un usuario específico por ID.

POST /api/users/congelar
  Marca un usuario como "congelado". Requiere un body con el formato { "id": numero }.

GET /api/users/congelados
  Obtiene la lista completa de usuarios congelados con toda su información.

POST /api/users/separar
  Marca un usuario como "separado". Requiere un body con el formato { "id": numero }.

GET /api/users/separados
  Obtiene la lista completa de usuarios separados con toda su información.

Ejemplos de Request/Response
Obtener todos los usuarios
Request: GET http://localhost:3000/api/users

Response (200 OK):

JSON

[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
]
Filtrar usuarios por email
Request: GET http://localhost:3000/api/users?email=Sincere@april.biz

Response (200 OK):

JSON

[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
  }
]
Congelar un usuario
Request:

Bash

POST http://localhost:3000/api/users/congelar
Content-Type: application/json

{
  "id": 3
}
Response (200 OK):

JSON

{
  "message": "User 3 frozen"
}
Obtener usuarios congelados
Request: GET http://localhost:3000/api/users/congelados

Response (200 OK):

JSON

[
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net"
  }
]
Separar un usuario
Request:

Bash

POST http://localhost:3000/api/users/separar
Content-Type: application/json

{
  "id": 2
}
Response (200 OK):

JSON

{
  "message": "User 2 Separado"
}
Obtener usuarios separados
Request: GET http://localhost:3000/api/users/separados

Response (200 OK):

JSON

[
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv"
  }
]
Posibles Errores
400 Bad Request
Causa: Datos de entrada inválidos o faltantes.

Ejemplo:

JSON

{
  "error": "ID is required"
}
404 Not Found
Causa: Se intenta acceder a un endpoint que no existe.

Ejemplo:

JSON

{
  "error": "Can't find /api/ruta/inexistente on this server!"
}
500 Internal Server Error
Causa: Error interno del servidor.

Ejemplo:

JSON

{
  "error": "Internal Server Error"
}