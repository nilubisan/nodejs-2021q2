const TASKS = [];

const getTasksByBoardId = async (boardId) => TASKS.filter((task) => task.boardId === boardId);

const createTask = async (task) => {
  TASKS.push(task)
  return task;
};

const getTask = async (boardId, taskId) => {
  const selectedBoardTasks = await getTasksByBoardId(boardId);
  return selectedBoardTasks.find((task) => task.id === taskId)
};

const updateTask = async (updatedTask, boardId, taskId) => {
  const selectedTask = TASKS.find((task) => task.boardId === boardId && task.id === taskId);
  if(!selectedTask) {
      return false;
  }
  selectedTask.updateTask(updatedTask);
  return selectedTask;
};

const deleteTask = async (boardId, taskId) => {
    const ind = TASKS.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (ind === -1) return false;
    TASKS.splice(ind, 1);
    return true;
}

const unassignUser = async (userId) => TASKS.map((task, ind) => {
  const resultTask = {...task};
  resultTask.userId = (resultTask.userId === userId ? null : resultTask.userId);
  TASKS[ind] = resultTask;
  return resultTask;
});



module.exports = { createTask, getTasksByBoardId, getTask, updateTask, deleteTask, unassignUser};