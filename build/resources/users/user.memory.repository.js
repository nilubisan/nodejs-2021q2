"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const user_model_1 = require("./user.model");
/**
 * Simulation of Users DB {Array}
 */
const USERS = [];
/**
 * Returns ALL users from Users DB
 * @returns  {Array} Array of users. If there are no users in DB, the function will return empty array
 */
const getAllUsers = async () => USERS;
exports.getAllUsers = getAllUsers;
/**
 * Returns user with specified ID from Users DB
 * @param {string} The ID of the user to get
 * @returns {object | undefined} User object with specified ID. If there is no user in DB with specified ID, the function will return undefined
 */
const getUserById = async (userId) => {
    const user = USERS.find((user) => user.id === userId);
    if (!user)
        return false;
    return user;
};
exports.getUserById = getUserById;
/**
 * Creates new user and adds it to Users DB
 * @param {object} a User object with all required properties
 * @returns {object} created User object with all required properties
 */
const createUser = async (user) => {
    USERS.push(user);
    return user;
};
exports.createUser = createUser;
/**
 * Updates the user with specified ID in Users DB
 * @param {string} The ID of the user to update
 * @param {object} The object with new user property(ies)
 * @returns {object} User object with updated properties
 */
const updateUser = async (userId, updatedUser) => {
    const ind = USERS.findIndex((user) => user.id === userId);
    if (ind === -1)
        return false;
    const user = USERS[ind];
    user.updateUser(updatedUser);
    return user_model_1.User.toResponse(user);
};
exports.updateUser = updateUser;
/**
 * Deletes the user with specified ID from Users DB
 * @param {string} The ID of the user to delete
 * @returns {object | boolean} If there is no User object with specified ID in DB, the function will return false. Otherwise, it will return true.
 */
const deleteUser = async (userId) => {
    const ind = USERS.findIndex((user) => user.id === userId);
    if (ind === -1)
        return false;
    USERS.splice(ind, 1);
    return true;
};
exports.deleteUser = deleteUser;
