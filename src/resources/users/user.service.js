const usersRepo = require('./user.memory.repository');

const User = require('./user.model');

const getAll = async () => usersRepo.getAll();
const createUser = async (user) => (User.validateUser(user)) ? usersRepo.createUser(new User(user)) : false;
const updateUser = async (userId, updatedUserData) => usersRepo.updateUser(userId, updatedUserData);
const deleteUser = async (userId) => usersRepo.deleteUser(userId)

const getUserById = async (userId) => usersRepo.getUserById(userId)
module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
