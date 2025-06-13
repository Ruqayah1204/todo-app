import axios from "./axiosInstance";

export const getAllTask = async () => {
  try {
    const response = await axios.get(`/tasks?all=true`);
    const tasks = response.data ?? [];
    return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Error fetching task list:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await axios.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task list:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

export const updateTask = async (id, data) => {
  try {
    const response = await axios.patch(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error updating data", error);
    throw new Error(error.response?.data?.message || "Failed to update data");
  }
};

export const deleteTaskById = async (id) => {
  try {
    const response = await axios.delete(`/tasks/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error deleting data", error);
    throw new Error(error.response?.data?.message || "Failed to delete data");
  }
};

export const createTask = async (data) => {
  try {
    const response = await axios.post("/tasks", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error creating data", error);
    throw new Error(error.response?.data?.message || "Failed to add task");
  }
};

