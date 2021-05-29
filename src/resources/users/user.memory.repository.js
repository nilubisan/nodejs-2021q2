const User = require('./user.model');

const USERS = [];

const getAll = async () => USERS;

const getUserById = async (userId) => {
  const foundUser = USERS.find((user) => user.id === userId);
  return foundUser;
};

const createUser = async (user) => {
  USERS.push(user);
  return user;
};

const updateUser = async (userId, updatedUser) => {
  const ind = USERS.findIndex((user) => user.id === userId);
  USERS[ind].updateUser(updatedUser);
  return User.toResponse(USERS[ind]);
};

const deleteUser = async (userId) => {
  const ind = USERS.findIndex((user) => user.id === userId);
  if (ind === -1) return false;
  USERS.splice(ind, 1);
  return true;
};
module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
