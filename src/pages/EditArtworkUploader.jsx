import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import ArtworkService from '../services/ArtworkService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import styles from '../style';
import { BackToTopButton } from '../components';

const EditArtworkUploader = () => {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const isAuthenticated = AuthService.isAuthenticated();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const fetchedArtwork = await ArtworkService.getArtworkById(artworkId);
        setArtwork(fetchedArtwork.data);
        setTitle(fetchedArtwork.data.title);
        setDescription(fetchedArtwork.data.description);
        if (fetchedArtwork.data.image_path) {
          setImages([{
            name: fetchedArtwork.data.title,
            url: `https://api.muralfinder.net${fetchedArtwork.data.image_path}`,
            file: null
          }]);
        }
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId]);

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

  async function editArtwork() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      const firstImage = images.find(image => image.file);
      if (firstImage) {
        formData.append('image', firstImage.file);
      }

      const message = await ArtworkService.editArtwork(artworkId, formData);
      setResponseMessage(message);
      setImages([]);
      setTitle('');
      setDescription('');
      setTimeout(() => {
        setResponseMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Error editing artwork:', error);
      setResponseMessage(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-200 text-4xl mr-2" style={{ fontSize: '2rem' }} />
        <span className="text-gray-200 text-xl">...</span>
      </div>
    );
  }

  if (!artwork) {
    return <div>Error loading artwork</div>;
  }

  return (
    <>
      <div className="flex flex-col w-75 border border-gray-600 rounded-md mt-3">
        <div className="w-75 p-4 text-center text-white">
          <h2 className="font-bold text-lg mb-2">Edit your artwork</h2>
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
                  <button onClick={editArtwork} type="submit" className="my-7 py-2 px-4 text-white w-full p-4 rounded border border-blue-300">
                    {loading ? <FontAwesomeIcon icon={faSpinner} spin size="1x" className="mr-2" /> : 'Submit'}
                  </button>
                </div>
              </section>
            </>
          ) : (
            <div className="w-full p-4 text-center text-white">
              <p>Login to edit your artworks.</p>
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
              <img className='object-cover' src={image.url} alt={image.name} />
            </div>
          ))}
        </div>
      </div>
      <BackToTopButton />
      
      <Footer />
      </div>
    </>
  );
};

export default EditArtworkUploader;
