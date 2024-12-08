import React, { useState, useEffect } from 'react';
import { Navbar, ArtworksGallery, ImageSearch, DragDropImageUploader } from "../components";
import ArtworkService from '../services/ArtworkService';
import Footer from '../components/Footer';
import styles from "../style";

const ArtworkFeed = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      ArtworkService.loadArtworks(),
      ArtworkService.loadCategories()
    ])
      .then(([artworksData, categoriesData]) => {
        setImages(artworksData);
        setFilteredImages(artworksData);
        setCategories([{ id: 'all', name: 'All' }, ...categoriesData]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const searchText = async (text) => {
    setIsLoading(true);
    try {
      const filtered = await ArtworkService.searchArtworksOnBackend(text, page, pageSize);
      setFilteredImages(filtered);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
    if (newValue === 'All') {
      setFilteredImages(images);
    } else {
      const filtered = images.filter(img => img.category === newValue);
      setFilteredImages(filtered);
    }
  };

  return (
    <div className="bg-indigo-600 w-full overflow-hidden">
      <h2 className={`${styles.heading2} ${styles.flexCenter} py-8 text-white`}>Artworks Feed</h2>

      <div className="flex flex-wrap justify-center mb-8 px-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`
        m-1 px-3 py-2 text-sm sm:text-base md:px-4 md:py-2
        rounded-md text-white transition-all duration-300
        ${filter === category.name
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-400 hover:bg-blue-500'}
        whitespace-nowrap
      `}
            onClick={() => handleFilterChange(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <ImageSearch
        searchText={searchText}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {isLoading ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
        <div className='container mx-auto py-2'>
          {filteredImages.map(categoryData => (
            <div key={categoryData.category}>
              <h2 className="text-3xl font-bold mb-4 text-white">{categoryData.category}</h2>
              <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 ss:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categoryData.artworks.map(artwork => (
                  <ArtworksGallery key={artwork.id} artwork={artwork} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <DragDropImageUploader />
      <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
        <Footer />
      </div>
    </div>
  );
}

export default ArtworkFeed;