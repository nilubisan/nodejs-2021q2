const usersRepo = require('./user.memory.repository');

const User = require('./user.model');

const getAll = () => usersRepo.getAll();
const createUser = (user) => (User.validateUser(user)) ? usersRepo.createUser(new User(user)) : false;
const updateUser = (userId, updatedUserData) => (User.validateUser(updatedUserData)) ? usersRepo.updateUser(userId, updatedUserData) : false;
const deleteUser = (userId) => usersRepo.deleteUser(userId)

const getUserById = (userId) => usersRepo.getUserById(userId)
module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
