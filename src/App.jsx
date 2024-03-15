import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from "./style";
import { Billing, Business, CardDeal, CTA, Footer, Navbar, Stats, Testimonials, Hero, ArtworksGallery, ImageSearch } from "./components";
import About from './pages/About';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Map from './pages/Map';
import Walls from './pages/Walls';
import IndexLogin from './pages/IndexLogin';
import IndexSignup from './pages/IndexSignup';
import Onboarding1 from './pages/Onboarding1';
import Onboarding2 from './pages/Onboarding2';
import Onboarding3 from './pages/Onboarding3';
import Contact from './pages/Contact';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredImages, setFilteredImages] = useState([]); 
  console.log(filteredImages)

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.muralfinder.net/api/artworks`)
      .then(res => res.json())
      .then(data => {
      
        if (data.success && data.data) {
          setImages(data.data.data); // Adjusted for the new API response structure
          console.log(data.data.data)
        } else {
          setImages([]); 
          setFilteredImages([]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  const searchText=(text)=>{
    const filtered=images.filter(image=>image.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredImages(filtered);
  }

  return (
    <Router>
      <div className="bg-indigo-700 w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <Routes>
          <Route path="/" element={
            <>
              <div className={`bg-indigo-700 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                  <Hero />
                </div>
              </div>
              <div className={`bg-indigo-700 ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                  <Stats />
                  <Business />
                  <Billing />
                  <h2 className={`${styles.heading2} ${styles.flexCenter} py-8`}>Artworks Feed</h2>
                  <ImageSearch searchText={searchText} />

                  {!isLoading && images.length === 0 && <h1 className='text-5xl text-center mx-auto mt-32'>No Images Found</h1>}
                  {isLoading ? (
                    <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
                      ) : (
                           <div className='container mx-auto py-4'>
                           <div className="flex flex-wrap gap-4">
                          {(filteredImages.length > 0 ? filteredImages : images).map(image => (
                               <ArtworksGallery key={image.id} image={image} />
                          ))}
                       </div>
                      </div>
                      )}

                 
                  <CardDeal />
                  <Testimonials />
                  <CTA />
                  <Footer />
                </div>
              </div>
            </>
          } />
          <Route path="/About" element={<About />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Walls" element={<Walls />} />
          <Route path="/Login" element={<IndexLogin />} />
          <Route path="/IndexSignup" element={<IndexSignup />} />
          <Route path="/Onboarding1" element={<Onboarding1 />} />
          <Route path="/Onboarding2" element={<Onboarding2 />} />
          <Route path="/Onboarding3" element={<Onboarding3 />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
