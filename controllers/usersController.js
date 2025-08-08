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

module.exports = {
  getAllUsers
}