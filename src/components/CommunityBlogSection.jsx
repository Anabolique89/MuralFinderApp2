
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEye, faThumbsUp, faComment, faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import BlogService from '../services/BlogService';
import { cleanHTML, trimContent } from '../utils/blogUtils';
import AuthService from '../services/AuthService';
import styles, { layout } from '../style';

// import Button from './Button';

const CommunityBlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const user = AuthService.getUser() ?? null;

  const currentUser = AuthService.getUser();
  const userImage = blogPosts.user?.profile?.profile_image_url || '';

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await BlogService.getAllBlogPosts();
        setBlogPosts(response);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await BlogService.deleteBlogPost(blogId);
        setBlogPosts(blogPosts.filter(blog => blog.id !== blogId));
        setAlertMessage('Blog post deleted successfully');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000); // Remove the alert message after 3 seconds
      } catch (error) {
        console.error('Error deleting blog post:', error);
        setAlertMessage('Failed to delete blog post');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000); // Remove the alert message after 3 seconds
      }
    }
  };

  return (
    <div className="bg-indigo-700 py-10 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {alertMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Message:</strong>
            <span className="block sm:inline"> {alertMessage}</span>
          </div>
        )}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className={styles.heading2}>From the blog</h2>
          <p className={`${styles.paragraph}`}>
            Explore our latest blog posts covering a variety of artistic topics. Please feel free to submit your article if you are interested in
            helping our community to expand. Please be mindful with the type of content you wish to post, otherwise we will block and delete your account. Thanks!
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {loading ? (
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-white" />
              <p className="mt-4 text-white">Loading...</p>
            </div>
          ) : (
            blogPosts.map(blogPost => (
              <div key={blogPost.id} className="flex flex-col items-start justify-between backdrop-filter backdrop-blur-lg rounded-md shadow-md p-6 hover:bg-indigo-800  transition duration-300 border-solid border-2 border-indigo-600 sm:mt-10 sm:mb-10">
                {blogPost.feature_image ? (
                  <img
                    src={`https://api.muralfinder.net/${blogPost.feature_image}`}
                    alt={blogPost.title}
                    className=" object-cover w-full h-48 mb-4 rounded-md "
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-32 mb-4 rounded-md"></div>
                )}
                <div className="w-full">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white font-raleway">
                    <Link to={`/blog/${blogPost.id}`} className="hover:text-blue-500">{blogPost.title}</Link>
                  </h3>
                  <p className={`${styles.paragraph} mt-2 `}>
                    <div dangerouslySetInnerHTML={{ __html: cleanHTML(trimContent(blogPost.content, 200)) }} />
                  </p>
                </div>
                <div className="flex items-center mt-4 w-full">
                  <div className="flex items-center mr-4 text-white">
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    <span>{blogPost.views}</span>
                  </div>
                  <div className="flex items-center mr-4 text-white">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                    <span>{blogPost.likes_count}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    <span>{blogPost.comments_count}</span>
                  </div>
                </div>
                <div className="flex items-center mt-4 w-full text-white justify-between">
                  <div className="flex items-center">

                    <a href={`/profile/${blogPost.user.id}`}>
                      <img src={`https://api.muralfinder.net${blogPost.user.profile?.profile_image_url}`} alt={blogPost.user?.username} className='h-12 w-12 rounded-full mr-2 bg-purple-500 p-1' />
                    </a>

                    <div>
                      <p className="font-semibold font-raleway">{blogPost.user.username.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      <p className={`${styles.paragraph}`}>{blogPost.user.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                    </div>
                  </div>
                  {currentUser && currentUser.id === blogPost.user.id && (
                    <div className="flex space-x-2">
                      <Link to={`/blog/edit/${blogPost.id}`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(blogPost.id)} className="text-red-500 hover:text-red-700">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityBlogSection;