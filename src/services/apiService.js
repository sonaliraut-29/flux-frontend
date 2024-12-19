import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

const token = getAuthToken();

export const getTodoLists = async (filterText, sortBy, orderby) => {
  const response = await axios.get(`${API_URL}todo-lists`, {
    params: {
      search: filterText,
      sortBy: sortBy,
      orderby: orderby
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTodoList = async (newTodoList) => {
  try {
    const response = await axios.post(
      `${API_URL}todo-lists`,
      { name: newTodoList },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodoList = async (todoListId, updatedTodoList) => {
  try {
    const response = await axios.put(
      `${API_URL}todo-lists/${todoListId}`,
      { name: updatedTodoList },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoList = async (todoListId) => {
  try {
    const response = await axios.delete(
      `${API_URL}todo-lists/${todoListId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getTasks = async (todoListId,filterText, sortBy, orderby) => {
  try {
    const response = await axios.get(
      `${API_URL}todo-lists/${todoListId}/tasks`,
      {
        params: {
          search: filterText,
          sortBy: sortBy,
          orderby: orderby
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (todoListId, newTask) => {
  try {
    const response = await axios.post(
      `${API_URL}todo-lists/${todoListId}/tasks`,
      { title: newTask, description: "Task Description" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (todoListId, taskId, updatedTask) => {
  try {
    const response = await axios.put(
      `${API_URL}todo-lists/${todoListId}/tasks/${taskId}`,
      { title: updatedTask },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (todoListId, taskId) => {
  try {
    const response = await axios.delete(
      `${API_URL}todo-lists/${todoListId}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markCompletedTask = async (todoListId, taskId) => {
  try {
    const response = await axios.put(
      `${API_URL}todo-lists/${todoListId}/tasks/${taskId}/mark-complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};