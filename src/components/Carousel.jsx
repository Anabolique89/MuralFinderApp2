import { useState, useRef, useEffect } from 'react';
import styles from '../style';
import ArtworkService from '../services/ArtworkService';
import AuthService from '../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEye, faThumbsUp, faComment, faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const defaultImage = 'https://example.com/default-image.jpg';

  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = AuthService.getUser();

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    ArtworkService.loadArtworks()
      .then(data => {
        setArtworks(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section>
      <h2 className={`${styles.heading2} ${styles.flexCenter} py-8`}>Artworks Feed</h2>
      <div className="carousel my-2 mx-2 w-full overflow-x-auto">
        {isLoading ? (
          <h1 className='text-2xl sm:text-2xl text-center mx-auto mt-32 text-gray-800'>Loading...</h1>
        ) : (
          artworks.map(categoryData => (
            <div key={categoryData.category} className="mb-8">
              <h2 className={`${styles.paragraph} text-2xl mb-2 font-bold text-white`}>{categoryData.category}</h2>
              <hr className='p-5 mt-1 mb-2' />
              <div className="flex items-center space-x-4">
                <div className="overflow-x-auto flex-1 scrollbar-thin scrollbar-webkit">
                  <div ref={carousel} className="flex space-x-4">
                    {categoryData.artworks.map(artwork => (
                      <div key={artwork.id} className="w-64 flex-shrink-0 relative">
                        <a href={`/artworks/${artwork.id}`} className="block rounded-lg overflow-hidden">
                          <img src={artwork.image_path ? `https://api.muralfinder.net${artwork.image_path}` : defaultImage} alt={artwork.title || 'Artwork'} className="w-full h-40 object-cover" />
                          <div className="absolute inset-0 flex items-start justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 pl-2">
                            <div className="flex items-center mt-4 w-full text-white justify-between">
                              <div className="flex items-center">
                                <Link to={`/profile/${artwork.user.id}`} className="flex items-center">
                                  {artwork.user.profile.profile_image_url ? (
                                    <img src={`https://api.muralfinder.net${artwork.user.profile.profile_image_url}`} alt={artwork.user.username} className='w-8 h-8 rounded-full mr-2 object-cover' />
                                  ) : (
                                    <FontAwesomeIcon icon={faUser} className="h-5 w-5 rounded-full mr-2 bg-gray-200 p-1" />
                                  )}
                                  <div>
                                    <p className="font-semibold font-raleway">{artwork.user.username.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                                  </div>
                                </Link>
                              </div>
                              {currentUser && currentUser.id === artwork.user.id && (
                                <div className="flex space-x-2 ml-20">
                                  <Link to={`/artwork/edit/${artwork.id}`}>
                                    <button className="text-blue-500 hover:text-blue-700">
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                  </Link>
                                  <button onClick={() => handleDelete(artwork.id)} className="text-red-500 hover:text-red-700">
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Carousel;
