
const tasks = []

const getTasksByBoardId = (boardId) => {
  const res = tasks.filter((task) => task.boardId === boardId)
  return res;
}

const createTask = (task) => {
  tasks.push(task)
  return task;
}

const getTask = (boardId, taskId) => {
  const selectedBoardTasks = getTasksByBoardId(boardId);
  return selectedBoardTasks.find((task) => task.id === taskId)
}

const updateTask = (updatedTask, boardId, taskId) => {
  const selectedBoardTasks = getTasksByBoardId(boardId);
  const ind = selectedBoardTasks.findIndex((task) => task.id === taskId);
  if(ind === -1) {
      return false;
    }
  const taskInd = tasks.findIndex((task) => task.id === taskId)
  Object.assign(tasks[taskInd], updatedTask)
  tasks[taskInd].id = taskId;
  return tasks[ind]
}

const deleteTask = (boardId, taskId) => {
    const ind = tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (ind === -1) return false;
    tasks.splice(ind, 1);
    return true;
}

module.exports = { createTask, getTasksByBoardId, getTask, updateTask,  deleteTask};
