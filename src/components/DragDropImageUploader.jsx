import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/AuthService';
import ArtworkService from '../services/ArtworkService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../style';

const DragDropImageUploader = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [responseMessage, setResponseMessage] = useState(null);

  const isAuthenticated = AuthService.isAuthenticated();

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;

    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      setImages((prevImages) => [
        ...prevImages,
        {
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
          file: files[i],
        },
      ]);
    }
  }

  useEffect(() => {
    setLoading(true);
    ArtworkService.loadCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = 'copy';
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      setImages((prevImages) => [
        ...prevImages,
        {
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
          file: files[i],
        },
      ]);
    }
  }

  async function uploadImages() {
    setLoading(true); // Start loading indicator
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('artwork_category_id', category);
  
      // Append images to the form data
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image.file);
      });
  
      const message = await ArtworkService.uploadArtwork(formData);
      setResponseMessage(message);
      console.log(responseMessage)
      if (message.includes('successfully')) {
        setImages([]);
        setTitle('');
        setDescription('');
        setCategory('');
      }
      setTimeout(() => {
        setResponseMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error uploading images:', error);
      setResponseMessage('An error occurred while uploading images');
    } finally {
      setLoading(false); 
    }
  }
  

  return (
    <div className="flex flex-col w-full border border-gray-600 rounded-md mt-3">
      <div className="w-full p-4 text-center text-white">
        <h2 className="font-bold text-lg mb-2">Have an artwork you'd like to show to the world?</h2>

        {responseMessage && (
          <div className="absolute top-0 right-0 m-8 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
            {responseMessage}
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row">
        {isAuthenticated ? (
          <>
               
            <section className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-300">
              <div className="flex justify-center items-center h-full text-center">
                <div className="w-full p-2 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-purple-400 focus:outline-none cta-block">
                  <p className="font-raleway font-normal text-[18px] leading-[32px] text-white my-5 p-4">
                    Click or drag & drop to upload artwork
                  </p>
                  <div
                    className="drag-area p-2"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    {isDragging ? (
                      <span className="max-w-[470px] m-4 select">Drop image here</span>
                    ) : (
                      <>
                        Click or drag & drop image here
                      </>
                    )}

                    <input name="file" type="file" multiple ref={fileInputRef} onChange={onFileSelect} className="file" />
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full md:w-1/2 px-4">
              <div className="flex flex-col justify-center items-center mt-5">
                <input
                  name="title"
                  type="text"
                  placeholder="Artwork Title..."
                  className="w-full p-4 rounded-md mb-4 border border-gray-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  name="description"
                  type="text"
                  placeholder="Artwork Description..."
                  className="w-full p-4 rounded-md border border-gray-300"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <select
                  name="category"
                  className="w-full p-4 rounded-md mb-4 border border-gray-300"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                
                <button onClick={uploadImages} type="submit" className="my-7 py-2 px-4 text-white w-full p-4 rounded border border-blue-300">
                  {loading ? <FontAwesomeIcon icon={faSpinner} spin size="1x" className="mr-2" /> : 'Submit'}
                </button>
              </div>
            </section>
          </>
        ) : (
          <div className="w-full p-4 text-center text-white">
            <p>Login to add your artworks.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
              <a href="/login">Login</a>
            </button>
          </div>
        )}
      </div>
      <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
      <div className="test-image-container">
        {images.map((image, index) => (
          <div className="image" key={index}>
            <span className="delete" onClick={() => deleteImage(index)}>
              &times;
            </span>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DragDropImageUploader;
