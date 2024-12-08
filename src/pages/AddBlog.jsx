import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { layout } from '../style';
import BlogService from '../services/BlogService'; // Assuming you have a service for creating blog posts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFeaturedImage(file);
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

            const response = await BlogService.createBlogPost(formData);
            // setSuccessMessage(response);
            console.log(response);
            // setSuccessMessage(response.message);


            setTitle('');
            setDescription('');
            setFeaturedImage(null);
            toast.success(response.message); 
            setTimeout(()=>{
                navigate(`/blog/${response.data.id}`);

            }, 4000)
           

        } catch (error) {
            setError('Failed to create blog post');
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
                <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidde shadow-lg mt-5">
                <ToastContainer />
                    <h2 className="text-2xl font-bold text-center py-4 bg-indigo-800 text-white rounded-md">Add Blog</h2>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>}
                    {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success:</strong>
                        <span className="block sm:inline"> {successMessage}</span>
                    </div>}
                    <p className="text-sm text-center text-gray-600 px-4 py-2">Share your thoughts and ideas with the world!</p>
                    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4 w-full">
                        <div>
                            <label className="block">Title:</label>
                            <input type="text" value={title} onChange={handleTitleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block">Description:</label>
                            <ReactQuill theme="snow" value={description} onChange={handleDescriptionChange} className="border border-gray-300 rounded-md" required />
                        </div>
                        <div className="">
                            <label className="block w-full ">Featured Image:</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="border border-gray-500 rounded-md p-2 w-full hover:bg-gray-100 hover:cursor" required />
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
                            {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" style={{ fontSize: '1rem' }} /> : 'Submit'}
                        </button>
                    </form>
                </div>
            <Footer />

            </div>
        </>
    );
};

export default AddBlog;