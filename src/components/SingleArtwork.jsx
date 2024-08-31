import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faComments, faHeart, faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from './WebFooter';
import AuthService from '../services/AuthService';
import ArtworkService from '../services/ArtworkService';
import styles from '../style';
import BackToTopButton from './BackToTopButton';

const SingleArtwork = () => {
    const { artworkId } = useParams();
    const [artwork, setArtwork] = useState('');
    const user = AuthService.getUser() ?? null;
    const defaultImage = 'https://example.com/default-image.jpg';
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArtwork();
    }, [artworkId]);

    const fetchArtwork = async () => {
        try {
            const response = await ArtworkService.getArtworkById(artworkId);
            if (response.success) {
                console.log('Fetched artwork:', response.data); // Log the artwork data
                setArtwork(response.data);
            } else {
                console.error('Error fetching artwork:', response.message);
            }
        } catch (error) {
            console.error('Error fetching artwork:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const userImage = artwork.user?.profile?.profile_image_url 
        ? `https://api.muralfinder.net/profile/${artwork.user?.id}` 
        : '';

    console.log('User image URL:', userImage); // Log the user image URL

    return (
        <section className={`rounded-xl overflow-hidden shadow-md p-4 ${styles}`}>
            <div className="mx-auto px-4 py-8 max-w-4xl my-20">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-purple-950 text-4xl" />
                    </div>
                ) : (
                    <div className="backdrop-filter backdrop-blur-lg shadow-2xl rounded-lg mb-6 tracking-wide">
                        {/* Image */}
                        <div className="md:flex-shrink-0">
                            <img 
                                src={artwork.image_path ? `https://api.muralfinder.net${artwork.image_path}` : 'https://example.com/default-image.jpg'}
                                alt={artwork.title || 'Artwork'}
                                className="w-full h-100 rounded-lg rounded-b-none"
                            />
                        </div>
                        {/* Author */}
                        <div className="flex items-center justify-end mt-2 mr-3">
                            <a href="#" className="flex text-gray-700">
                                <FontAwesomeIcon icon={faEllipsisVertical} className="text-purple-950 mr-2 ml-4" />
                            </a>
                        </div>
                        <div className="author flex items-center -ml-3 px-2">
                        <Link to={`/profile/${artwork.user?.id}`} className="flex items-center">
              {userImage ? (
                <img src={`https://api.muralfinder.net${userImage}`} alt={artwork.user?.username} className='w-8 h-8 rounded-full mr-2' />
              ) : (
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 rounded-full mr-2 bg-gray-200 p-1" />
              )}
              <div className='font-raleway font-bold text-purple-400 text-sm mb-2'>
                {artwork.user?.username || 'Unknown'}
              </div>
            </Link>
                            <h2 className="tracking-tighter font-raleway font-bold text-purple-500 text-l mb-2">
                                <span className={`${styles.paragraph} text-sm float-right ml-80`}>{artwork.date}</span>
                            </h2>
                        </div>
                        {/* Artwork Content */}
                        <div className="px-4 py-2 mt-2">
                            <h2 className={`text-xl tracking-normal font-raleway font-semibold xs:text-[28px] text-[30px] text-white xs:leading-[46.8px] leading-[30.8px] w-full px-2`}>
                                {artwork.title}
                            </h2>
                            <p className={`text-sm px-2 pb-2 mr-1 ${styles.paragraph}`}>{artwork.description}</p>
                            {/* Likes and Comments */}
                            <div className="flex items-center justify-start mt-2 mx-2">
                                <a href="#" className="flex text-gray-700">
                                    <FontAwesomeIcon icon={faHeart} className="text-purple-950 mr-2" />
                                    <span>{artwork.likes}</span>
                                </a>
                                <a href="#" className="flex text-gray-700">
                                    <FontAwesomeIcon icon={faComments} className="text-purple-950 mr-2 ml-4" />
                                    <span>{artwork.comments}</span>
                                </a>
                            </div>
                            {/* Expand Button */}
                            <div className="flex items-center justify-end mt-2 mx-2">
                                <a href="#" className="text-blue-500 text-xs -ml-3">Expand</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            < BackToTopButton />
      <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
                <Footer />
            </div>
        </section>
    );
}

export default SingleArtwork;
