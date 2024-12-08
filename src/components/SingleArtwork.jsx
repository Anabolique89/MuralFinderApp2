import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faComments, faHeart, faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './WebFooter';
import AuthService from '../services/AuthService';
import ArtworkService from '../services/ArtworkService';
import styles from '../style';
import BackToTopButton from './BackToTopButton';
import {ShareSocial} from 'react-share-social';


const stylez = {
  root: {
    width: '100%',
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: 'white',

  },
  copyContainer: {
    border: '1px solid blue',
    background: 'rgb(0,0,0,0.7)',
    display: 'none'
  },
};

const SingleArtwork = () => {
    const { artworkId } = useParams();
    const [artwork, setArtwork] = useState('');
    const user = AuthService.getUser() ?? null;
    const defaultImage = 'https://example.com/default-image.jpg';
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [likedComments, setLikedComments] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchArtwork();
        fetchComments();
    }, [artworkId]);

    const fetchArtwork = async () => {
        try {
            const response = await ArtworkService.getArtworkById(artworkId);
            if (response.success) {
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

    const fetchComments = async () => {
        try {
            const response = await ArtworkService.loadComments(artworkId);
            if (response.success) {
                setComments(response.data);
            } else {
                console.error('Error fetching comments:', response.message);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const formData = new FormData();
                formData.append('content', newComment);
                const response = await ArtworkService.addComment(artworkId, formData);
                if (response.success) {
                    setComments([...comments, response.data]);
                    setNewComment('');
                    toast.success('Comment added successfully!');
                } else {
                    toast.error('Failed to add comment.');
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                toast.error('An error occurred while adding the comment.');
            }
        } else {
            toast.error('Comment cannot be empty.');
        }
    };

    const handleLikeComment = async (commentId, index) => {
        try {
            const response = await ArtworkService.likeComment(commentId);
            if (response.success) {
                const updatedComments = comments.map((comment, idx) => {
                    if (idx === index) {
                        return { ...comment, likes: comment.likes + 1 };
                    }
                    return comment;
                });
                setComments(updatedComments);
                setLikedComments({ ...likedComments, [commentId]: true });
                toast.info('Comment liked!');
            } else {
                toast.error('Failed to like comment.');
            }
        } catch (error) {
            console.error('Error liking comment:', error);
            toast.error('An error occurred while liking the comment.');
        }
    };

    const userImage = artwork.user?.profile?.profile_image_url 
        ? `https://api.muralfinder.net/${artwork.user?.profile?.profile_image_url}` 
        : '';

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
                                src={artwork.image_path ? `${'https://api.muralfinder.net'}${artwork.image_path}` : 'https://example.com/default-image.jpg'}
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
                        <div className="author flex items-center px-2">
                            <Link to={`/profile/${artwork.user?.id}`} className="flex items-center ml-4">
                                {userImage ? (
                                    <img src={userImage} alt={artwork.user?.username} className='max-w-none w-[50px] h-[50px] object-cover rounded-full mr-2 ' />
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
                                    <span>{comments.length}</span>
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
            <div className="comments-section px-4 py-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Comments</h3>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={comment.id} className="mb-4 p-4 border rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                                <span className="font-semibold">{comment.user.username}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.content}</p>
                            <div className="flex items-center">
                                <button 
                                    onClick={() => handleLikeComment(comment.id, index)} 
                                    className="flex items-center text-gray-700 mr-4"
                                >
                                    <FontAwesomeIcon 
                                        icon={faHeart} 
                                        className={likedComments[comment.id] ? "text-red-500 mr-1" : "text-purple-950 mr-1"} 
                                    />
                                    <span>{comment.likes}</span>
                                </button>
                 
                            </div>
                
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700">No comments yet. Be the first to comment!</p>
                )}
                {/* Add Comment */}
                {user && (
                    <div className="mt-4">
                        <textarea
                            className="w-full p-2 border rounded-lg"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                        ></textarea>
                        <button onClick={handleAddComment} className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg">
                            Add Comment
                        </button>
                    </div>
                )}
            </div>

{/* share your artwork */}
<div className='px-4 py-2 max-w-4xl mx-auto'>
            <div className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col cta-block rounded-[20px] box-shadow `}>
            <h2 className={styles.heading2}>Share your artwork!</h2>  

            <ShareSocial url={`https://api.muralfinder.net${artwork.image_path}`} socialTypes={["whatsapp", "facebook", "email", "reddit"]} 
                   style={stylez}
                  />
                  </div></div>
            <BackToTopButton />
            <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
                <Footer />
            </div>
            <ToastContainer />
        </section>
    );
}

export default SingleArtwork;
