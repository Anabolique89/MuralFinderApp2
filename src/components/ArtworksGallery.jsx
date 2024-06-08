import styles from '../style';
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPencil, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import AuthService from '../services/AuthService';
import ArtworkService from '../services/ArtworkService';
import { Link, useNavigate } from 'react-router-dom';

const ArtworksGallery = ({ image }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const user = AuthService.getUser() ?? null;
  console.log(user)
  const userImage = image.user?.profile?.profile_image_url || '';
  const defaultImage = 'https://example.com/default-image.jpg';
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleEdit = (artworkId) => {
    navigate(`/artwork/edit/${artworkId}`);
  };

  const handleDelete = async (artworkId) => {
    setLoading(true); // Set loading state to true
    try {
      const deleteResponse = await ArtworkService.deleteArtwork(artworkId);
      if (deleteResponse) {
        setSuccessMessage('Artwork deleted successfully');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); // Clear success message after 5 seconds
      } else {
        setErrorMessage('Failed to delete artwork');
        setSuccessMessage('');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000); // Clear error message after 5 seconds
      }
    } catch (error) {
      setErrorMessage('Error deleting artwork');
      setSuccessMessage('');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Clear error message after 5 seconds
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className='max-w-xs rounded-xl overflow-hidden shadow-lg w-50 relative bg-indigo-800 p-2'>
      {successMessage && (
        <div className="absolute top-0 right-0 m-4 bg-green-500 text-white p-2 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-0 right-0 m-4 bg-red-500 text-white p-2 rounded">
          {errorMessage}
        </div>
      )}
      <div className='w-full'>
        <img
          className='w-full h-48 object-cover p-2'
          src={image.image_path ? `https://api.muralfinder.net${image.image_path}` : defaultImage}
          alt={image.title || 'Artwork'}
        />
        <div className='px-6 py-4'>
          <div className='flex items-center'>
            {userImage ? (
              <img src={`https://api.muralfinder.net${userImage}`} alt={image.user?.username} className='w-8 h-8 rounded-full mr-2' />
            ) : (
              <FontAwesomeIcon icon={faUser} className="h-5 w-5 rounded-full mr-2 bg-gray-200 p-1" />
            )}
            <div className='font-raleway font-bold text-purple-400 text-sm mb-2'>
              {image.user?.username || 'Unknown'}
            </div>
          </div>
          <div className='font-bold text-white text-xl mb-2'>
            <Link to={`/artworks/${image.id}`}>
              {image.title}
            </Link>
          </div>
          <ul className='flex'>
            <li className='flex'><FcLike /> <span className='ml-2 mr-2'><strong> {image.likes_count}</strong></span></li>
            <li className='flex'><FaComments className=' text-blue-500' /><span className='ml-2'><strong>{image.comments_count}</strong></span></li>
          </ul>
          {isAuthenticated && user.id === image.user_id && (
            <div className="absolute bottom-5 right-10 mt-2 mr-2 text-white flex space-x-4">
              <Link to={`/artwork/edit/${image.id}`}> 
              <FontAwesomeIcon
                icon={faPencil}
              />
              </Link>

              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer text-red-700"
                onClick={() => handleDelete(image.id)}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="loader">  <FontAwesomeIcon
                    icon={faSpinner}
                    className="cursor-pointer text-red-100"
                  />.</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtworksGallery;
