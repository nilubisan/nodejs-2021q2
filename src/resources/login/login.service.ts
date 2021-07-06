import jwt from 'jsonwebtoken';
import { userExistsService } from '../users/user.service';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
});

export const signToken = async (
  login: string,
  password: string
): Promise<string | null> => {
  const user = await userExistsService(login, password);
  if (!user) {
    return null;
  } else {
    const { id } = user;
    const token = jwt.sign({ id, login }, process.env['SECRET_KEY'] as string);
    return token;
  }
};
