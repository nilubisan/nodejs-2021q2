import { createUserService } from "../resources/users/user.service";
import { User } from '../entities/User'

export const addAdminToDB = async(): Promise<void> => {
    await createUserService({'login': 'admin', 'password': 'admin'} as User);
}
