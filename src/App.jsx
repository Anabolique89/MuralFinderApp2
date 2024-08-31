import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from "./style";
import { Billing, Business, CardDeal, CTA, Navbar, Stats, Testimonials, Hero, ArtworksGallery, ImageSearch, DragDropImageUploader, SingleArtwork, Carousel,  MuiBottomNavigation, BackToTopButton } from "./components";
import About from './pages/About';
import Community from './pages/Community';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Map from './pages/Map';
import Walls from './pages/Walls';
import IndexLogin from './pages/IndexLogin';
import IndexSignup from './pages/IndexSignup';
import Onboarding1 from './pages/Onboarding1';
import Onboarding2 from './pages/Onboarding2';
import Onboarding3 from './pages/Onboarding3';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import ArtworkService from './services/ArtworkService';
import SingleBlogPost from './pages/SingleBlogPost';
import ProfileSettings from './pages/ProfileSettings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQS from './pages/FAQS';
import TermsConditions from './pages/TermsConditions';
import ViewWall from './pages/ViewWall';
import AddBlog from './pages/AddBlog';
import PrivateRoute from './utils/PrivateRoute';
import Footer from './components/Footer';
import EditBlog from './pages/EditBlog';
import EditArtworkUploader from './pages/EditArtworkUploader';
import ArtworkFeed from './pages/ArtworkFeed';
// import BlogPosts from './pages/BlogPosts';
import AddWall from './components/AddWall';
import { WallsDashboard, Dashboard, ArtworksDashboard, PostsDashboard, ArtworkDetails, Trash, Users } from './pages';


const App = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    ArtworkService.loadArtworks()
      .then(data => {
        setImages(data);
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

  // Add functions to handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset page when page size changes
  };

  return (
    <Router>
      <div className="bg-indigo-700 w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <ToastContainer className='w-[20px] center-align'></ToastContainer>
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
                  <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-2">
                    <Carousel />
                    <button type="button" className={`py-2 px-4 bg-blue-gradient font-raleway font-bold text-[18px] text-primary outline-none uppercase rounded-full ${styles}`}><a href='/ArtworkFeed' >See All</a></button>
                  </div>

                  <DragDropImageUploader />

                  <CardDeal />
                  <Testimonials />
                 
                  <CTA />
                  <BackToTopButton />
                  <Footer />
                </div>
              </div>
            </>
          } />
          <Route path="/About" element={<About />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/profile/:userId" element={<PublicProfile />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Walls" element={<Walls />} />
          <Route path="/Login" element={<IndexLogin />} />
          <Route path="/IndexSignup" element={<IndexSignup />} />
          <Route path="/Onboarding1" element={<Onboarding1 />} />
          <Route path="/Onboarding2" element={<Onboarding2 />} />
          <Route path="/Onboarding3" element={<Onboarding3 />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/blog/:postId" element={<SingleBlogPost />} />
          <Route path="/ProfileSettings" element={<ProfileSettings />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsConditions" element={<TermsConditions />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/WallsDashboard" element={<WallsDashboard />} />
          <Route path="/ArtworksDashboard" element={<ArtworksDashboard/>} />
          <Route path="/PostsDashboard" element={<PostsDashboard/>} />
          <Route path="/ArtworkDetails" element={<ArtworkDetails />} />
          <Route path="/Trash" element={<Trash />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/FAQS" element={<FAQS />} />
          <Route path="/addWall" element={<AddWall />} />
          <Route path="/ArtworkFeed" element={<ArtworkFeed />} />
          {/* <Route path="/BlogPosts" element={<BlogPosts />} /> */}
          <Route path="/wall/:wallId" element={<ViewWall />} />
          <Route path="/artworks/:artworkId" element={<SingleArtwork />} />

          <Route path="/blog/create" element={
            <PrivateRoute>
              <AddBlog />
            </PrivateRoute>
          } />
          <Route path="/blog/edit/:blogId" element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          } />
          <Route path="/artwork/edit/:artworkId" element={
            <PrivateRoute>
              <EditArtworkUploader />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/ProfileSettings" element={
            <PrivateRoute>
              <ProfileSettings />
            </PrivateRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
};

export default App;