import axios from "axios";
import { BASE_URL } from "../constants/ApiEndpoints";

const token = localStorage.getItem("token");
const TrashService = {
  // Fetch all trashed items across different models
  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/trash`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching trashed items:", error);
      throw error;
    }
  },

  // Restore a soft-deleted item
  restore: async (model, id) => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/trash/${model}/${id}/restore`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error restoring item:", error);
      throw error;
    }
  },

  // Permanently delete a soft-deleted item
  delete: async (model, id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/trash/${model}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  },

  // Restore all trashed items (if you implement this functionality)
  restoreAll: async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/trash/restoreAll`, // Adjust this if you have a specific endpoint for restoring all
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error restoring all items:", error);
      throw error;
    }
  },

  // Permanently delete all trashed items (if you implement this functionality)
  deleteAll: async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/trash/deleteAll`, // Adjust this if you have a specific endpoint for deleting all
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting all items:", error);
      throw error;
    }
  },
};

export default TrashService;