import { IUserToResponse, IUserUpdated, User } from './user.model';

/**
 * Simulation of Users DB {Array}
 */
const USERS: Array<User> = [];

/**
 * Returns ALL users from Users DB
 * @returns  {Array} Array of users. If there are no users in DB, the function will return empty array
 */
export const getAllUsers = async (): Promise<Array<User> | []> => USERS;

/**
 * Returns user with specified ID from Users DB
 * @param {string} The ID of the user to get
 * @returns {object | undefined} User object with specified ID. If there is no user in DB with specified ID, the function will return undefined
 */
export const getUserById = async (userId: string): Promise<User | boolean> => {
  const user = USERS.find((user) => user.id === userId);
  if(!user) return false;
  return user;
};

/**
 * Creates new user and adds it to Users DB
 * @param {object} a User object with all required properties
 * @returns {object} created User object with all required properties
 */
export const createUser = async (user: User): Promise<User> => {
  USERS.push(user);
  return user;
};

/**
 * Updates the user with specified ID in Users DB
 * @param {string} The ID of the user to update
 * @param {object} The object with new user property(ies)
 * @returns {object} User object with updated properties
 */

export const updateUser = async (userId: string, updatedUser: IUserUpdated): Promise<IUserToResponse | boolean> => {
  const ind = USERS.findIndex((user) => user.id === userId);
  if(ind === -1) return false;
  const user = USERS[ind] as User;
  user.updateUser(updatedUser);
  return User.toResponse(user);
};

/**
 * Deletes the user with specified ID from Users DB
 * @param {string} The ID of the user to delete
 * @returns {object | boolean} If there is no User object with specified ID in DB, the function will return false. Otherwise, it will return true.
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  const ind = USERS.findIndex((user) => user.id === userId);
  if (ind === -1) return false;
  USERS.splice(ind, 1);
  return true;
};

