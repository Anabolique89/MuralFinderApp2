import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles, { layout } from '../style';
import BlogService from '../services/BlogService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { BackToTopButton } from '../components';

const EditBlog = () => {
     const {blogId } = useParams()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {

            console.log(blogId)
            try {
                const blogDetails = await BlogService.getBlogPostById(blogId); 
                setTitle(blogDetails.title);
                setDescription(blogDetails.content);
                setImagePreview(blogDetails.featuredImage);
            } catch (error) {
                setError('Failed to fetch blog details');
            }
        };
        fetchBlogDetails();
    }, [blogId]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFeaturedImage(file);
        // Display image preview
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleImageRemove = () => {
        setFeaturedImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', description);
            formData.append('feature_image', featuredImage);

            const response = await BlogService.updateBlogPost(blogId, formData);
            setSuccessMessage(response);
        } catch (error) {
            setError('Failed to update blog post');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSuccessMessage(null);
                setError(null);
            }, 5000); // Remove success and error messages after 5 seconds


        }
    };

    return (
        <>
            <div className={`${layout.sectionImg} min-h-screen flex flex-col items-center justify-center `}>
                <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidde shadow-lg mt-5">
                    <h2 className="text-2xl font-bold text-center py-4 bg-indigo-800 text-white rounded-md">Edit Blog</h2>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>}
                    {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success:</strong>
                        <span className="block sm:inline"> {successMessage}</span>
                    </div>}
                    <p className="text-sm text-center text-gray-600 px-4 py-2">Update your blog post</p>
                    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4 w-full">
                        <div>
                            <label className="block">Title:</label>
                            <input type="text" value={title} onChange={handleTitleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block">Description:</label>
                            <ReactQuill theme="snow" value={description} onChange={handleDescriptionChange} className="border border-gray-300 rounded-md" required />
                        </div>
                        <div className="flex items-center">
                            <label className="block w-full ">Featured Image:</label>
                            {imagePreview && (
                                <div className="flex items-center">
                                    <img src={imagePreview} alt="Featured" className="w-20 h-20 object-cover rounded-md mr-2" />
                                    <button type="button" onClick={handleImageRemove} className="text-red-600 hover:text-red-800 focus:outline-none">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="border border-gray-500 rounded-md p-2 w-full hover:bg-gray-100 hover:cursor" />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
                            {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" style={{ fontSize: '1rem' }} /> : 'Update'}
                        </button>
                    </form>
                </div>
                <BackToTopButton />
    <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
                <Footer />
            </div>

            </div>
        </>
    );
};

export default EditBlog;
