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
  // Verificar si el ID ya está en la lista para evitar duplicados
  if (!congelados.includes(id)) {
    congelados.push(id);
  }
}

const getUsuariosCongelados = async () => {
  try {
    // Obtener todos los usuarios
    const todosLosUsuarios = await getUsers();
    
    // Filtrar solo los usuarios cuyo ID está en la lista de congelados
    const usuariosCongelados = todosLosUsuarios.filter(usuario => 
      congelados.includes(usuario.id)
    );
    
    return usuariosCongelados;
  } catch (error) {
    throw new Error(`Error al obtener usuarios congelados: ${error.message}`);
  }
};

let usuariosSeparados = [];

const separarUsuario = (id) => {
  if (!usuariosSeparados.includes(id)) {
    usuariosSeparados.push(id);
  }
}

const getUsuariosSeparados = async () => {
  try{
    const todosLosUsuariosSeparados = await getUsers();

// Filtrar solo los usuarios cuyo ID está en la lista de separados
    const usuariosFiltrados = todosLosUsuariosSeparados.filter(usuario => usuariosSeparados.includes(usuario.id));
    return usuariosFiltrados;

  }catch(error){
    throw new Error(`Error al obtener usuarios separados: ${error.message}`);
  }
}

/*
const getIdsCongelados = () => {
  return [...congelados]; // Devuelve ids congelados
};
*/

module.exports = {
  getUsers,
  congelarUsuario,
  getUsuariosCongelados,
  separarUsuario,
  getUsuariosSeparados
}



