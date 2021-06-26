import { getAllUsers, getUserByID, createUser, updateUser, deleteUser, userExists } from './user.memory.repository';
import { User } from '../../entities/User';
import { unassignUserService } from '../tasks/task.service'

export const getAllUsersService = async (): Promise<Array<User>> => getAllUsers();

export const getUserByIdService = async (userID: string): Promise<User | 'NOT FOUND'> => getUserByID(userID);

export const userExistsService = async (login: string, password: string):Promise<User | null> => userExists(login, password)

export const createUserService = async (user: User): Promise<User> =>
  await createUser(user);

export const updateUserService = async (userID: string, user: User):  Promise<User | 'NOT FOUND'> =>
  updateUser(userID, user);

export const deleteUserService = async (userID: string): Promise<'NOT FOUND' | 'DELETED'> => {
  const deletedUser = await deleteUser(userID);
  if (deletedUser) unassignUserService(userID);
  return deletedUser;
};