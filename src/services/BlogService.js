import axios from "axios";
import { BASE_URL, blogEndpoints } from "../constants/ApiEndpoints";

const BlogService = {
  getAllBlogPosts: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}${blogEndpoints.getAllBlogPosts}`
      ); // Adding BASE_URL to the endpoint
      console.log(response.data.data.data);
      return response.data.data.data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw new Error("Failed to fetch blog posts");
    }
  },

  getBlogPostById: async (postId) => {
    try {
      console.log(`${BASE_URL}${blogEndpoints.getBlogPostById(postId)}`);
      const response = await axios.get(
        `${BASE_URL}${blogEndpoints.getBlogPostById(postId)}`
      ); // Adding BASE_URL to the endpoint
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw new Error("Failed to fetch blog post");
    }
  },

  getBlogPostByUserId: async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${blogEndpoints.getBlogPostByUserId(userId)}`
      ); // Adding BASE_URL to the endpoint
      return response.data.data;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw new Error("Failed to fetch blog post");
    }
  },

  createBlogPost: async (postData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}${blogEndpoints.createBlogPost}`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      return response.data.message;
    } catch (error) {
      console.error("Error creating blog post:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error);
        return error.response.data.message;
      } else {
        console.log(error);
        return error.response.data.error;
      }
    }
  },

  updateBlogPost: async (postId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}${blogEndpoints.updateBlogPost(postId)}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Adding BASE_URL to the endpoint
      return response.data.message;
    } catch (error) {
      console.error("Error updating blog post:", error);
      throw new Error("Failed to update blog post");
    }
  },

  deleteBlogPost: async (postId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${BASE_URL}${blogEndpoints.deleteBlogPost(postId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Adding BASE_URL to the endpoint
      return response.data;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return error.data;
    }
  },
  getCommentsForBlogPost: async (postId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${blogEndpoints.getCommentsForBlogPost(postId)}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching comments for blog post:", error);
      throw new Error("Failed to fetch comments for blog post");
    }
  },

  commentOnBlogPost: async (postId, commentData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}${blogEndpoints.commentOnBlogPost(postId)}`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error commenting on blog post:", error);
      throw new Error("Failed to comment on blog post");
    }
  },

  likeBlogPost: async (postId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        `${BASE_URL}${blogEndpoints.likeBlogPost(postId)}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error liking blog post:", error);
      throw new Error("Failed to like blog post");
    }
  },
};

export default BlogService;
