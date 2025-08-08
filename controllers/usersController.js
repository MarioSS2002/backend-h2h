const usersService = require("../services/usersService");

const getAllUsers = async (request, response) => {
  try {
    const users = await usersService.getUsers();
    response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsersFiltered = async (request, response) => {
  try {
    let users = await usersService.getUsers();

    const email = request.query.email;
    const city = request.query.city;
    const id = request.query.id;


    if (email) {
      users = users.filter(user => user.email.toLowerCase() === email.toLowerCase());
    }
    
    if (city) {
      users = users.filter(user => user.address.city.toLowerCase() === city.toLowerCase());
    }
    if (id !== undefined && id !== null && id !== '') {
      const idNumber = parseInt(id, 10);
      if (!isNaN(idNumber)) {
        users = users.filter(user => user.id === idNumber);
      }
    }

    response.json(users);
  } catch (error) {
    console.error("Error fetching filtered users:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const congelarUsuario = (request, response) => {
  try {
    const { id } = request.body;
    if (!id) {
      return response.status(400).json({ error: 'ID is required' });
    }
    usersService.congelarUsuario(id);
    response.status(200).json({ message: `User ${id} frozen` });
  } catch (error) {
    console.error("Error freezing user:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsuariosCongelados = (request, response) => {
  try {
    const frozenUsers = usersService.getUsuariosCongelados();
    response.json(frozenUsers);
  } catch (error) {
    console.error("Error fetching frozen users:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUsersFiltered,
  congelarUsuario,
  getUsuariosCongelados
};