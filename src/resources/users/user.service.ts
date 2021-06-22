import { getAllUsers, getUserByID, createUser, updateUser, deleteUser } from './user.memory.repository';
import { User } from '../../entities/User';
import { unassignUserService } from '../tasks/task.service'

export const getAllUsersService = async (): Promise<Array<User>> => getAllUsers();

export const getUserByIdService = async (userID: string): Promise<User | 'NOT FOUND'> => getUserByID(userID);

export const createUserService = async (user: User): Promise<User> =>
  createUser(user);

export const updateUserService = async (userID: string, user: User):  Promise<User | 'NOT FOUND'> =>
  updateUser(userID, user);

export const deleteUserService = async (userID: string): Promise<'NOT FOUND' | 'DELETED'> => {
  const deletedUser = await deleteUser(userID);
  if (deletedUser) unassignUserService(userID);
  return deletedUser;
};