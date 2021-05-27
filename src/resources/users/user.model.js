const { v4: uuidv4 } = require('uuid');

class User {
  constructor(user) {
    this.id = uuidv4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static validateUser(user) {
    return ((user.name && typeof user.name === 'string')
    &&
    (user.login && typeof user.login === 'string')
    &&
    (user.password && typeof user.password === 'string')
    )
  }

  updateUser(updatedUser) {
    this.name = updatedUser.name ? updatedUser.name : this.name;
    this.login = updatedUser.login ? updatedUser.login : this.login;
    this.password = updatedUser.password ? updatedUser.password : this.password;
  }
}

module.exports = User;
