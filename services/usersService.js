const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users'

const getUsers = async () => {
  try {
    const response = await axios.get(url)
    return response.data;
}
  catch(error){
    throw new Error(`Error al consumir la API ${error}`);
    
  }
}

let congelados = [];

const congelarUsuario = (id) => {
  congelados.push(id);
}

const getUsuariosCongelados = () => {
  return congelados;
}

module.exports = {
  getUsers,
  congelarUsuario,
  getUsuariosCongelados
}



