const usersService = require("../services/usersService");
const { AppError } = require("../utils/errorHandler");

const getAllUsers = async (request, response) => {
  try {
    const users = await usersService.getUsers();
    response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsersFiltered = async (request, response, next) => { // Agregar 'next'
  try {
    let users = await usersService.getUsers();

    const email = request.query.email;
    const city = request.query.city;
    const id = request.query.id;

    const idNumber = id ? parseInt(id, 10) : null;

    if (email) {
      users = users.filter(user => 
        user.email && user.email.toLowerCase() === email.toLowerCase()
      );
    }
    
    if (city) {
      users = users.filter(user => 
        user.address && user.address.city &&
        user.address.city.toLowerCase() === city.toLowerCase()
      );
    }

    if(idNumber && !isNaN(idNumber)) {
      const userFound = users.find(user => user.id === idNumber);
      if (!userFound) {
        return next(new AppError('User not found with that ID', 404)); // Usar AppError
      }
      users = [userFound]; // Devolver solo el usuario encontrado
    }

    response.json(users);
  } catch (error) {
    next(error); // Pasar el error al manejador global
  }
};

const congelarUsuario = (request, response) => {
  try {
    const { id } = request.body;
    if (!id) {
      return response.status(400).json({ error: "ID is required" });
    }
    // Validar que el ID sea un número válido
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      return response.status(400).json({ error: "ID must be a valid number" });
    }
    usersService.congelarUsuario(idNumber); // Pasar el número validado
    response.status(200).json({ message: `User ${idNumber} frozen` });
  } catch (error) {
    console.error("Error freezing user:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsuariosCongelados = async (request, response) => {
  try {
    const frozenUsers = await usersService.getUsuariosCongelados();
    response.json(frozenUsers);
  } catch (error) {
    console.error("Error fetching frozen users:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const separarUsuario = (request, response) => {
  try {
    const { id } = request.body;
    if (!id) {
      return response.status(400).json({ error: "ID is required" });
    }
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      return response.status(400).json({ error: "ID must be a valid number" });
    }
    usersService.separarUsuario(idNumber); // Pasar el número validado
    response.status(200).json({ message: `User ${idNumber} Separado` });
  } catch (error) {
    console.error("Error separating user:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsuariosSeparados = async (request, response) => {
  try {
    const separatedUsers = await usersService.getUsuariosSeparados();
    response.json(separatedUsers);
  } catch (error) {
    console.error("Error fetching splitting users:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUsersFiltered,
  congelarUsuario,
  getUsuariosCongelados,
  separarUsuario,
  getUsuariosSeparados
};


