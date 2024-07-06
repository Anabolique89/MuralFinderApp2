import axios from "axios";
import { BASE_URL, artworkEndpoints } from "../constants/ApiEndpoints";

const ArtworkService = {
  loadArtworks: async () => {
    try {
      const response = await fetch(`${BASE_URL}${artworkEndpoints.getAllArtworks}`);
      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getUserArtworks: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}artworks/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      return data.data;
    } catch (error) {
      console.error('Error fetching user artworks:', error);
      throw error;
    }
  },

  loadCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}${artworkEndpoints.getCategoires}`);
      console.log(response.data)
      return response.data.data;


    }catch(error){
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error)
        return error.response.data.message;
      } else {
        console.log(error)
        return error.response.data.error
      }
    }
  },

  getArtworkById: async (artworkId) => {
      try {
        const url = `${BASE_URL}${artworkEndpoints.artworkById(artworkId)}`;
        console.log(url)
        const response = await axios.get(url);
        console.log(response.data)
        return response.data;
  
      }catch (error) {
        console.error('Error getting artwork:', error);
        if (error.response && error.response.data && error.response.data.message) {
          console.log(error)
          return error.response.data.message;
        } else {
          console.log(error)
          return error.response.data.error
        }
      }
  },

  // searchArtworks: (artworks, searchText) => {
  //   return artworks.filter(artwork =>
  //     artwork.title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // },

  searchArtworksOnBackend: async (searchText, pageSize = 10) => {
    try {
      const response = await fetch(`${BASE_URL}${artworkEndpoints.searchArtworks}?query=${searchText}&pageSize=${pageSize}`);
      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  },


  uploadArtwork: async (formData) => {
    try {

      const token = localStorage.getItem('token')
      const response = await axios.post(`${BASE_URL}${artworkEndpoints.uploadArtwork}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        console.log('Artwork uploaded successfully');
        return response.data.message;
      } else {
        return response.data.message || 'Failed to upload artwork';
      }
    } catch (error) {
      console.error('Error uploading artwork:', error);
      return error.response.data.message;
    }
  },
  editArtwork: async (artworkId, formData) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${BASE_URL}${artworkEndpoints.artworkById(artworkId)}`;
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        console.log('Artwork edited successfully');
        return response.data.message || 'Artwork edited successfully';
      } else {
        return response.data.message || 'Failed to edit artwork';
      }
    } catch (error) {
      console.error('Error editing artwork:', error);
      return error.response ? error.response.data.message : 'Unknown error';
    }
  },

  deleteArtwork: async (artworkId) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${BASE_URL}${artworkEndpoints.artworkById(artworkId)}`;
      const response = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        console.log('Artwork deleted successfully');
        return response.data.success;
      } else {
        return response.data.message || 'Failed to delete artwork';
      }
    } catch (error) {
      console.error('Error deleting artwork:', error);
      return error.response ? error.response.data.message : 'Unknown error';
    }
  }

};

export default ArtworkService;