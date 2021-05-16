
const users = []

const getAll = () => 
  // TODO: mock implementation. should be replaced during task development
   users
;

const getUserById = (userId) => users.find((user) => user.id === userId)


const createUser = (user) => {
  users.push(user)
  return user;
}

const updateUser = (userId, updatedUserData) => {
  const ind = users.findIndex((user) => user.id === userId);
  users[ind] = updatedUserData;
  users[ind].id = userId
  return users[ind];
}

const deleteUser = (userId) => {
  const ind = users.findIndex((user) => user.id === userId);
  if(ind === -1) return false;
  users.splice(ind, 1);
  return true
}
module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
