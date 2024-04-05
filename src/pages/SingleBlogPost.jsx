import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogService from '../services/BlogService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';


const SingleBlogPost = () => {
  const { postId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [liking, setLiking] = useState(false);
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await BlogService.getBlogPostById(postId);
        setBlogPost(response);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const response = await BlogService.getCommentsForBlogPost(postId);
        setComments(response);
        setLoadingComments(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoadingComments(false);
      }
    };

    fetchBlogPost();
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    try {
      setCommenting(true);
      console.log('Comment submitted:', comment);
      await BlogService.commentOnBlogPost(postId, { content: comment, post_id: postId });
      setComment('');
      setShowCommentBox(false);
      setComments([...comments, { id: comments.length + 1, content: comment }]);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setCommenting(false);
    }
  };

  const handleLike = async () => {
    try {
      setLiking(true);
      await BlogService.likeBlogPost(postId);
      const updatedBlogPost = await BlogService.getBlogPostById(postId);
      setBlogPost(updatedBlogPost);
    } catch (error) {
      console.error('Error liking blog post:', error);
    } finally {
      setLiking(false);
    }
  };

  if (!blogPost) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-200 text-4xl mr-2" style={{ fontSize: '4rem' }} />
        <span className="text-gray-200 text-xl">Please wait ...</span>
      </div>

    );
  }
  return (
    <div className="bg-indigo-700 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Blog Post Details</h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            View the details of the blog post and add your comments.
          </p>
        </div>
        <div className="mt-10 grid max-w-2xl grid-cols-1 gap-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col">
            <img src={`https://api.muralfinder.net/${blogPost.feature_image}`}
              alt={blogPost.title} className="w-full h-auto mb-4" />
            <h3 className="text-xl text-gray-200 font-semibold mb-2">{blogPost.title}</h3>
            <p className="text-gray-300 mb-4">{blogPost.content}</p>
            <div className="flex items-center mb-4">
              <img src={blogPost.user.imageUrl} alt={blogPost.user.username} className="h-8 w-8 rounded-full bg-gray-50 mr-2" />
              <div>
                <p className="font-semibold">{blogPost.user.name}</p>
                <p>{blogPost.user.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-4">{blogPost.date}</span>
              <span>Likes: {blogPost.likes_count}</span>
              <button onClick={handleLike} className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                {liking ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faThumbsUp} />} Like
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            {loadingComments ? (
              <div className="flex items-center justify-center text-gray-500">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                Loading comments...
              </div>
            ) : (
              <>
                {comments.map(comment => (
                  <div key={comment.id} className="bg-gray-100 p-4 mb-4 rounded-lg flex items-center">
                    <div className="flex items-center justify-center h-8 w-8 bg-gray-50 rounded-full mr-2">
                      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold">{comment.user.username}</p>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            <button onClick={() => setShowCommentBox(!showCommentBox)} className="bg-blue-500 text-white py-2 px-4 rounded-md self-start">
              {showCommentBox ? 'Hide Comment Box' : 'Add Comment'}
            </button>
            {showCommentBox && (
              <div className="mt-4">
                <textarea
                  rows="4"
                  placeholder="Enter your comment..."
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button onClick={handleCommentSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2">
                  {commenting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleBlogPost;
