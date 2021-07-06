import { User } from '../../entities/User';
import { getRepository } from 'typeorm';
import path from 'path';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
});

export const getAllUsers = async (): Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find({ where: {} });
};

export const getUserByID = async (
  userID: string
): Promise<User | 'NOT FOUND'> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userID);
  if (user === undefined) return 'NOT FOUND';
  return user;
};

export const userExists = async (
  login: string,
  password: string
): Promise<User | null> => {
  const userRepository = getRepository(User);
  await bcrypt.hash(password, Number(process.env['SALT']));
  const user = await userRepository.findOne({
    login: login,
  });
  if (user === undefined) return null;
  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
};

export const createUser = async (user: User): Promise<Partial<User>> => {
  const userRepository = getRepository(User);
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(process.env['SALT'])
  );
  user.password = hashedPassword;
  const newUser = await userRepository.create(user);
  const savedUser = await userRepository.save(newUser);
  const { name, login, id } = savedUser;
  return { name, login, id };
};

export const updateUser = async (
  userID: string,
  user: User
): Promise<User | 'NOT FOUND'> => {
  const userRepository = getRepository(User);
  const userToUpdate = await userRepository.findOne(userID);
  if (userToUpdate === undefined) return 'NOT FOUND';
  const updatedUser = await userRepository.update(userID, user);
  return updatedUser.raw;
};

export const deleteUser = async (
  userID: string
): Promise<'NOT FOUND' | 'DELETED'> => {
  const userRepository = getRepository(User);
  const deletionRes = await userRepository.delete(userID);
  if (deletionRes.affected) return 'DELETED';
  return 'NOT FOUND';
};
