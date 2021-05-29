const User = require('./user.model');

/**
 * Simulation of Users DB {Array}
 */
const USERS = [];

/**
 * Returns ALL users from Users DB
 * @returns  {Array} Array of users. If there are no users in DB, the function will return empty array
 */
const getAll = async () => USERS;

/**
 * Returns user with specified ID from Users DB
 * @param {string} The ID of the user to get
 * @returns {object | undefined} User object with specified ID. If there is no user in DB with specified ID, the function will return undefined
 */
const getUserById = async (userId) => {
  const foundUser = USERS.find((user) => user.id === userId);
  return foundUser;
};

/**
 * Creates new user and adds it to Users DB
 * @param {object} a User object with all required properties
 * @returns {object} created User object with all required properties
 */
const createUser = async (user) => {
  USERS.push(user);
  return user;
};

/**
 * Updates the user with specified ID in Users DB
 * @param {string} The ID of the user to update
 * @param {object} The object with new user property(ies)
 * @returns {object} User object with updated properties
 */

const updateUser = async (userId, updatedUser) => {
  const ind = USERS.findIndex((user) => user.id === userId);
  USERS[ind].updateUser(updatedUser);
  return User.toResponse(USERS[ind]);
};

/**
 * Deletes the user with specified ID from Users DB
 * @param {string} The ID of the user to delete
 * @returns {object | boolean} If there is no User object with specified ID in DB, the function will return false. Otherwise, it will return true.
 */
const deleteUser = async (userId) => {
  const ind = USERS.findIndex((user) => user.id === userId);
  if (ind === -1) return false;
  USERS.splice(ind, 1);
  return true;
};
module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
