const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');
const User = require('./user.model');

const getAll = async () => usersRepo.getAll();
const getUserById = async (userId) => usersRepo.getUserById(userId);
const createUser = async (user) => (User.validateUser(user)) ? usersRepo.createUser(new User(user)) : false;
const updateUser = async (userId, updatedUserData) => usersRepo.updateUser(userId, updatedUserData);
const deleteUser = async (userId) => {
    const deletedUser = usersRepo.deleteUser(userId);
    if(deletedUser) {
        taskService.unassignUser(userId);
    }
    return deletedUser;
}

module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
