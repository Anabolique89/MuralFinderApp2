import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import styles from "./style";
import { Billing, Business, CardDeal, SearchBar, CTA, Navbar, Stats, Testimonials, Hero, DragDropImageUploader, SingleArtwork, Carousel,  MuiBottomNavigation, BackToTopButton, Adverts } from "./components";
import { ArtSupplies, Books, Materials, PosterPrints, Wallpapers } from './components/ShopCategories';
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
import BlogPosts from './pages/BlogPosts';
import Feed from './pages/Feed';
import Shop from './pages/Shop';
import AddWall from './components/AddWall';
import { WallsDashboard, Dashboard, ArtworksDashboard, PostsDashboard, ArtworkDetails, Trash, Users } from './pages';
import EditUser from './pages/EditUser';
import EditWall from './components/EditWall';



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

  const showSearchBarRoutes = ['/', '/About']; // set the pages where the searchbar should be included.

  return (
    <Router>
      <div className="bg-indigo-600 w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        {/* conditionally render the searchbar based on the searbhar enabled routes */}
         {showSearchBarRoutes.includes(location.pathname) && <SearchBar />}
        <ToastContainer className='w-[20px] center-align'></ToastContainer>
        <Routes>
          <Route path="/" element={
            <>
              <div className={`bg-indigo-600 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                  <Hero />
                </div>
              </div>
              <div className={`bg-indigo-600 ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                  <Stats />
                  <Business />
                  <Billing />
                  <Adverts />
                  <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-2">
                    <Carousel />
                    <button type="button" className={`py-2 px-4 bg-blue-gradient font-raleway font-bold text-[18px] text-primary outline-none uppercase rounded-full ${styles}`}><Link to={'/ArtworkFeed'} >See All</Link></button>
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
          <Route path="/ArtworkDetails" element={<ArtworkDetails />} />
          <Route path="/Trash" element={<Trash />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/FAQS" element={<FAQS />} />
          <Route path="/addWall" element={<AddWall />} />
          <Route path="/ArtworkFeed" element={<ArtworkFeed />} />
          <Route path="/BlogPosts" element={<BlogPosts />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Wallpapers" element={<Wallpapers />} />
          <Route path="/PosterPrints" element={<PosterPrints />} />
          <Route path="/Materials" element={<Materials />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/ArtSupplies" element={<ArtSupplies />} />
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

          <Route path="/walls/edit/:wallId" element={
            <PrivateRoute>
              <EditWall />
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

          <Route path="/edit-user/:id" element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          } />

          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>

          <Route path='/walls-dashboard' element={
            <PrivateRoute>
              <WallsDashboard />
            </PrivateRoute>
          }/>

          <Route path='/artworks-dashboard' element={
            <PrivateRoute>
              <ArtworksDashboard />
            </PrivateRoute>
          }/>

          <Route path='/post-dashboard' element={
            <PrivateRoute>
              <PostsDashboard />
            </PrivateRoute>
          }/>

          <Route path='/artworks-dashboard' element={
            <PrivateRoute>
              <ArtworksDashboard />
            </PrivateRoute>
          }/>

<Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/walls-dashboard" element={<WallsDashboard />} />
          <Route path="/artworks-dashboard" element={<ArtworksDashboard/>} />
          <Route path="/post-dashboard" element={<PostsDashboard/>} />
          <Route path="/admin/artworks" element={<ArtworksDashboard/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;