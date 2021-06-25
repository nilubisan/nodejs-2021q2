import { User } from '../../entities/User';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
const SALT = 10;

export const getAllUsers = async (): Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find({ where: {}});
}

export const getUserByID = async (userID: string): Promise<User | 'NOT FOUND'> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userID);
  if(user === undefined) return 'NOT FOUND'
  return user;
};

export const createUser = async (user: User): Promise<User> => {
  const userRepository = getRepository(User);
  const hashedPassword = await bcrypt.hash(user.password, SALT);
  user.password = hashedPassword;
  const newUser = await userRepository.create(user);
  const savedUser = await userRepository.save(newUser);
  return await getUserByID(savedUser.id) as User;
};

export const updateUser = async (userID: string, user: User): Promise<User | 'NOT FOUND'> => {
  const userRepository = getRepository(User);
  const userToUpdate = await userRepository.findOne(userID);
  if(userToUpdate === undefined) return 'NOT FOUND';
  const updatedUser =   await userRepository.update(userID, user);
  return updatedUser.raw;
};

export const deleteUser = async (userID: string): Promise<'NOT FOUND' | 'DELETED'> => {
  const userRepository = getRepository(User);
  const deletionRes = await userRepository.delete(userID);
  if(deletionRes.affected) return 'DELETED'
  return 'NOT FOUND'
};

