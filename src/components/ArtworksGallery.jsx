import styles from '../style';
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPencil, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback } from 'react';
import AuthService from '../services/AuthService';
import ArtworkService from '../services/ArtworkService';
import { Link, useNavigate } from 'react-router-dom';

const ArtworksGallery = ({ artwork, onDelete }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const user = AuthService.getUser() ?? null;
  const userImage = artwork.user?.profile?.profile_image_url || '';
  const defaultImage = 'https://example.com/default-image.jpg';
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (artworkId) => {
    navigate(`/artwork/edit/${artworkId}`);
  };

  const handleDelete = useCallback(async (artworkId) => {
    setLoading(true);
    try {
      const deleteResponse = await ArtworkService.deleteArtwork(artworkId);
      if (deleteResponse) {
        setSuccessMessage('Artwork deleted successfully');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
        onDelete(artworkId);
      } else {
        setErrorMessage('Failed to delete artwork');
        setSuccessMessage('');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    } catch (error) {
      setErrorMessage('Error deleting artwork');
      setSuccessMessage('');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  }, [onDelete]);

  return (
    <div className='rounded-xl overflow-hidden shadow-lg w-50 relative cta-block box-shadow p-2 sm:p-0 xs:m-2 sm:w-full'>
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
      <Link to={`/artworks/${artwork.id}`}>
        <img
          className='w-full h-48 object-cover p-2'
          src={artwork.image_path ? `https://api.muralfinder.net${artwork.image_path}` : defaultImage}
          alt={artwork.title || 'Artwork'}
        />
        </Link>
        <div className='px-6 py-4'>
          <div className='flex items-center'>
            <Link to={`/profile/${artwork.user?.id}`} className="flex items-center">
              {userImage ? (
                <img src={`https://api.muralfinder.net${userImage}`} alt={artwork.user?.username} className='w-8 h-8 rounded-full mr-2 object-cover' />
              ) : (
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 rounded-full mr-2 bg-gray-200 p-1" />
              )}
              <div className='font-raleway font-bold text-purple-400 text-sm mb-2'>
                {artwork.user?.username || 'Unknown'}
              </div>
            </Link>
          </div>
          <div className='font-bold text-white text-xl mb-2'>
            <Link to={`/artworks/${artwork.id}`}>
              {artwork.title}
            </Link>
          </div>
          <ul className='flex'>
            <li className='flex'><FcLike /> <span className='ml-2 mr-2'><strong> {artwork.likes_count}</strong></span></li>
            <li className='flex'><FaComments className=' text-white' /><span className='ml-2'><strong>{artwork.comments_count}</strong></span></li>
          </ul>
          {isAuthenticated && user.id === artwork.user_id && (
            <div className="absolute bottom-5 right-10 mt-2 mr-2 text-white flex space-x-4">
              <Link to={`/artwork/edit/${artwork.id}`}>
                <FontAwesomeIcon
                  icon={faPencil}
                />
              </Link>

              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer text-red-700"
                onClick={() => handleDelete(artwork.id)}
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
