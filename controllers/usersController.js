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

module.exports = {
  getAllUsers,
  getUsersFiltered 
};