import { v4 as uuidv4 } from 'uuid';
/**
 * Class representing a User model
 */
export class User {
  /**
   * Creates User object
   * @param {object} User object
   */
  id: string
  name: string
  login: string
  password: string
  constructor(user: User) {
    this.id = uuidv4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }

  /**
   * Returns user version of User object by hiding special properties
   * @param {object} User object to make "response-ready"
   * @returns {object} User object after hiding necessary properties
   */

  static toResponse(user: User): IUserToResponse {
    const { id, name, login } = user;
    const userToResponse: IUserToResponse = {
      id: id,
      name: name,
      login: login
    }
    return userToResponse;
  }

  /**
   * Checks if passed User object contains all required properties
   * @param {object} User object
   * @returns {boolean} Return true if User object contains all required properties. Otherwise, return false
   */
  static validateUser(user: User): boolean {
    let isValidUser: boolean;
    if(
      user.name &&
      typeof user.name === 'string' &&
      user.login &&
      typeof user.login === 'string' &&
      user.password &&
      typeof user.password === 'string'
    ) isValidUser = true;
    else isValidUser = false;
    return isValidUser
  }

  /**
   * Updates User object with new property(ies) passed inside object
   * @param {object} updated user property(ies)
   */

  updateUser(updatedUser: IUserUpdated): void {
    this.name = updatedUser.name ? updatedUser.name : this.name;
    this.login = updatedUser.login ? updatedUser.login : this.login;
    this.password = updatedUser.password ? updatedUser.password : this.password;
  }
}

export interface IUserUpdated {
  name ?: string,
  login ?: string,
  password ?: string
}

export interface IUserToResponse {
  id: string,
  name: string,
  login: string
}
