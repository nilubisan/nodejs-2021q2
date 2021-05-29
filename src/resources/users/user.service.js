const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');
const User = require('./user.model');

/**
 * Gets all users from user repository
 * @returns {Array} {Array} Array of users. If there are no users in DB, the function will return empty array
 */
const getAll = async () => usersRepo.getAll();

/**
 * Passes the ID of the user to User repository to get it
 * @param {string} The ID of the user to get
 * @returns {object | undefined} User object with specified ID. If there is no user in DB with specified ID, the function will return undefined
 */
const getUserById = async (userId) => usersRepo.getUserById(userId);

/**
 * Checks if passed User object correct and transmits it to User repository for adding to DB
 * @param {object} User object
 * @returns {object | boolean} If passed User object is not valid, the function will return false value. Otherwise, it will return created User object
 */
const createUser = async (user) =>
  User.validateUser(user) ? usersRepo.createUser(new User(user)) : false;

/**
 * Passes ID of the user to update and new user property(ies) to User repository
 * @param {string} The ID of the user to update
 * @param {object} The object with new user property(ies)
 * @returns {object} User object with updated properties
 */
const updateUser = async (userId, updatedUserData) =>
  usersRepo.updateUser(userId, updatedUserData);

/**
 * Passes ID of the user to delete to User repository. After user removing it also unassign the user from all tasks where the user is assigned to
 * @param {string} The ID of the user to delete
 * @returns {object | boolean} If there is no User object with specified ID in DB, the function will return false. Otherwise, it will return true.
 */
const deleteUser = async (userId) => {
  const deletedUser = usersRepo.deleteUser(userId);
  if (deletedUser) {
    taskService.unassignUser(userId);
  }
  return deletedUser;
};

module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
