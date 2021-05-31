"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const user_memory_repository_1 = require("./user.memory.repository");
const user_model_1 = require("./user.model");
const task_service_1 = require("../tasks/task.service");
/**
 * Gets all users from user repository
 * @returns {Array} {Array} Array of users. If there are no users in DB, the function will return empty array
 */
const getAllUsersService = async () => user_memory_repository_1.getAllUsers();
exports.getAllUsersService = getAllUsersService;
/**
 * Passes the ID of the user to User repository to get it
 * @param {string} The ID of the user to get
 * @returns {object | undefined} User object with specified ID. If there is no user in DB with specified ID, the function will return undefined
 */
const getUserByIdService = async (userId) => user_memory_repository_1.getUserById(userId);
exports.getUserByIdService = getUserByIdService;
/**
 * Checks if passed User object correct and transmits it to User repository for adding to DB
 * @param {object} User object
 * @returns {object | boolean} If passed User object is not valid, the function will return false value. Otherwise, it will return created User object
 */
const createUserService = async (user) => user_model_1.User.validateUser(user) ? user_memory_repository_1.createUser(new user_model_1.User(user)) : false;
exports.createUserService = createUserService;
/**
 * Passes ID of the user to update and new user property(ies) to User repository
 * @param {string} The ID of the user to update
 * @param {object} The object with new user property(ies)
 * @returns {object} User object with updated properties
 */
const updateUserService = async (userId, updatedUserData) => user_memory_repository_1.updateUser(userId, updatedUserData);
exports.updateUserService = updateUserService;
/**
 * Passes ID of the user to delete to User repository. After user removing it also unassign the user from all tasks where the user is assigned to
 * @param {string} The ID of the user to delete
 * @returns {object | boolean} If there is no User object with specified ID in DB, the function will return false. Otherwise, it will return true.
 */
const deleteUserService = async (userId) => {
    const deletedUser = await user_memory_repository_1.deleteUser(userId);
    if (deletedUser)
        task_service_1.unassignUser(userId);
    return deletedUser;
};
exports.deleteUserService = deleteUserService;
