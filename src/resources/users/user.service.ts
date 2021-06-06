import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user.memory.repository';
import { IUserToResponse, IUserUpdated, User } from './user.model';
import { unassignUserService } from '../tasks/task.service'
/**
 * Gets all users from user repository
 * @returns {Array} {Array} Array of users. If there are no users in DB, the function will return empty array
 */
export const getAllUsersService = async (): Promise<Array<User>> => getAllUsers();

/**
 * Passes the ID of the user to User repository to get it
 * @param {string} The ID of the user to get
 * @returns {object | undefined} User object with specified ID. If there is no user in DB with specified ID, the function will return undefined
 */
export const getUserByIdService = async (userId: string): Promise<User | boolean> => getUserById(userId);

/**
 * Checks if passed User object correct and transmits it to User repository for adding to DB
 * @param {object} User object
 * @returns {object | boolean} If passed User object is not valid, the function will return false value. Otherwise, it will return created User object
 */
export const createUserService = async (user: User): Promise<User | boolean> =>
  User.validateUser(user) ? createUser(new User(user)) : false;

/**
 * Passes ID of the user to update and new user property(ies) to User repository
 * @param {string} The ID of the user to update
 * @param {object} The object with new user property(ies)
 * @returns {object} User object with updated properties
 */
export const updateUserService = async (userId: string, updatedUserData: IUserUpdated):  Promise<IUserToResponse | boolean> =>
  updateUser(userId, updatedUserData);

/**
 * Passes ID of the user to delete to User repository. After user removing it also unassign the user from all tasks where the user is assigned to
 * @param {string} The ID of the user to delete
 * @returns {object | boolean} If there is no User object with specified ID in DB, the function will return false. Otherwise, it will return true.
 */
export const deleteUserService = async (userId: string): Promise<boolean> => {
  const deletedUser = await deleteUser(userId);
  if (deletedUser) unassignUserService(userId);
  return deletedUser;
};