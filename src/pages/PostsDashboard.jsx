import React, { useState, useEffect } from "react";
import {
  MdMenu,
  MdVisibility,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import ArticleIcon from '@mui/icons-material/Article';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import moment from "moment";
import clsx from "clsx";
import UserInfo from "../components/dashboard/UserInfo";
import { Outlet, useNavigate } from "react-router-dom";
import styles from '../style';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import DashboardService from "../services/DashboardService.js";
import BlogService from '../services/BlogService.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const PostTable = ({ posts }) => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const deleteHandler = async (postId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this post? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await BlogService.deleteBlogPost(postId);
          if (response?.response?.data?.success) {
            toast.success("Post deleted successfully");
            // Optionally, refresh the posts list here by re-fetching the data or removing the post from the state
            navigate('/post-dashboard');
          } else {
            toast.error("Failed to delete the post: " + (response?.response?.data?.message));
          }
        } catch (error) {
          const errorMessage = error;
          toast.error("Error occurred while deleting post: " + errorMessage);
        } finally {
          setLoading(false);
        }
      }
    });
  };
  
  
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Post Title</th>
        <th className='py-2'>Likes</th>
        <th className="py-2">Comments</th>
        <th className='py-2'>User</th>
        <th className='py-2'>Created At</th>
        <th className='py-2'>Action</th>
      </tr>
    </thead>
  );

  const TableRow = ({ post }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <p className='text-base text-black'>{post.title}</p>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className='capitalize'>{post.likes_count}</span>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className='capitalize'>{post.comments_count}</span>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex'>
          <UserInfo user={post.user} />
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(post?.created_at).fromNow()}
        </span>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {post.totalComments}
        </span>
      </td>
      <td className='py-2'>
        <div className='flex gap-2'>
          <button className='text-blue-500 hover:text-blue-700' onClick={() => navigate('/blog/' + post.id)}>
            <MdVisibility size={20} />
          </button>
          <button className='text-green-500 hover:text-green-700' onClick={() => navigate('/blog/edit/' + post.id )} >
            <MdEdit size={20} />
          </button>
          <button className='text-red-500 hover:text-red-700' onClick={() => deleteHandler(post.id)}>
            <MdDelete size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
  

  return (
    <div className='w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader />
        <tbody>
          {posts?.map((post, id) => (
            <TableRow key={id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PostsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postStats, setPostStats] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postStatsData = await DashboardService.getPostsStatisticsData();
        const postsData = await BlogService.getAllBlogPosts();
        setPostStats(postStatsData);
        setPosts(postsData);
      } catch (error) {
        toast.error("Something went wrong")
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { postsCount, commentsCount, likesCount, deletedPosts } = postStats;

  const stats = [
    {
      _id: "1",
      label: "POSTS",
      total: postsCount || 0,
      icon: <InsertPhotoIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "LIKES",
      total: likesCount || 0,
      icon: <ThumbUpIcon/>,
      bg: "bg-[#b444d0]",
    },
    {
      _id: "3",
      label: "COMMENTS",
      total: commentsCount || 0,
      icon: <ChatIcon />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "DELETED",
      total: deletedPosts || 0,
      icon: <ArticleIcon />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 backdrop-filter backdrop-blur-lg md:p-8 sm:p-10 ss:p-30 bg-white border-solid border-2 border-indigo-600 p-5 shadow-md rounded-md flex items-center justify-between'>
         <div className='h-full flex flex-1 flex-col justify-between'>
         <p className={` text-black text-base font-semibold`}>{label}</p>
         <span className='text-2xl font-regular text-gray-800 font-raleway'>{count}</span>
         <span className='text-sm text-gray-400'>{"110 last month"}</span>
         </div>
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <section className='flex flex-col min-h-screen'>
      <ToastContainer />
      <div className='w-full flex flex-col md:flex-row flex-1'>
        <div className='w-1/5 bg-indigo-600 sticky top-0 hidden md:block'>
          <Sidebar />
        </div>
        {/* Mobile Sidebar */}
        <MobileSidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className='flex-1 flex flex-col py-4 px-2 md:px-6'>
          <header className='w-full flex justify-between items-center p-4 bg-white shadow-md md:hidden'>
            <button onClick={() => setIsSidebarOpen(true)} className='text-2xl'>
              <MdMenu />
            </button>
          </header>
          <div className='flex-1 flex flex-col py-4 px-2 md:px-6'>
              <>
                {isLoading ? (
                  <div className="">
                    <FontAwesomeIcon icon={faSpinner} spin  className="text-2xl text-white"/>
                  </div>
                ) : (
  
                <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-4'>
                  {stats.map(({ icon, bg, label, total }, index) => (
                    <Card key={index} icon={icon} bg={bg} label={label} count={total} />
                  ))}
                </div>
                )}

                <div className=' p-4 mb-4 rounded'>
                  <input
                    type='text'
                    placeholder='Search posts...'
                    value={searchQuery}
                    onChange={handleSearch}
                    className='w-full px-4 py-2 border border-gray-300 rounded'
                  />
                </div>
                <div className='bg-indigo-600 p-6'>
                  {isLoading ? (
                    <div className="">
                      <FontAwesomeIcon icon={faSpinner} spin />
                    </div>
                  ) : (
                    <PostTable posts={filteredPosts} />
                  )}
                </div>
              </>
          </div>
        </div>
      </div>
      <BackToTopButton />
      <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
        <Footer />
      </div>
    </section>
  );
};

export default PostsDashboard;