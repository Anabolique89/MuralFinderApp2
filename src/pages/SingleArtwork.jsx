import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../style';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import ArtworkService from '../services/ArtworkService';
import { useParams } from 'react-router-dom';
import { BackToTopButton, Footer } from '../components';
import { Link } from 'react-router-dom';

const SingleArtwork = () => {

   const artworkId = useParams();

    const [wall, setWall] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArtwork();
    }, [artworkId]);

    const fetchArtwork = async () => {
        try {
            const response = await ArtworkService.getArtworkById(artworkId);
            if (response.success) {
                setWall(response.data);
            } else {
                console.error('Error fetching wall:', response.message);
            }
        } catch (error) {
            console.error('Error fetching wall:', error);
        } finally {
            setIsLoading(false);
        }
    };

    <section className={`rounded-xl overflow-hidden shadow-md p-4 ${styles}`}>
        <div className="mx-auto px-4 py-8 max-w-2xl my-20">
        <div className="backdrop-filter backdrop-blur-lg shadow-2xl rounded-lg mb-6 tracking-wide" >
            <div className="md:flex-shrink-0">
                <img src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg" alt="singleArtwork" className="w-full h-100 rounded-lg rounded-b-none"/>
            </div>
            <div className="flex items-center justify-end mt-2 mr-3">
                <a href="#" className="flex text-gray-700">
                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-purple-950 mr-2 ml-4" />
                
                   </a>
                   </div>
            <div className="author flex items-center px-2">
                  
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
                        <a href="#">Mohammed Ibrahim</a> <span className={`${styles.paragraph} text-sm float-right ml-80`}>21 SEP 2015.</span>
                    </h2>
                    
                </div>
             
            <div className="px-4 py-2 mt-2">
                <h2 className={`text-xl tracking-normal font-raleway font-semibold xs:text-[28px] text-[30px] text-white xs:leading-[46.8px] leading-[30.8px] w-full px-2`}>My Amazing Journey to the Mountains.</h2>
                    <p className={`text-sm px-2 pb-2 mr-1 ${styles.paragraph}`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora reiciendis ad architecto at aut placeat quia, minus dolor praesentium officia maxime deserunt porro amet ab debitis deleniti modi soluta similique...
                    </p>
                    <div className="flex items-center justify-start mt-2 mx-2">
                    <a href="#" className="flex text-gray-700">
                        
                             <FontAwesomeIcon icon={faHeart} className="text-purple-950 mr-2" />
                           <span>5</span> 
                        </a>
                        <a href="#" className="flex text-gray-700">
                        <FontAwesomeIcon icon={faComments} className="text-purple-950 mr-2 ml-4" />
                        <span>5</span>
                   </a>
                  
                    </div>
                    <div className="flex items-center justify-end mt-2 mx-2">
                        <a href="#" className="text-blue-500 text-xs -ml-3 ">Expand</a>
                        </div>
            </div>
        </div>
    </div>
    <BackToTopButton />
    <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
                <Footer />
            </div>
    </section>

    
 };


export default SingleArtwork