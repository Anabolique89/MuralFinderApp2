import React, { useState, useEffect } from "react";
import {
  MdMenu,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdVisibility,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import GroupIcon from '@mui/icons-material/Group';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import moment from "moment";
import clsx from "clsx";
import { BGS, PRIOTITYSTYLES } from "../utils/index.js";
import { Outlet, Link } from "react-router-dom";
import styles from '../style';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import DashboardService from '../services/DashboardService.js';
import Chart from '../components/Chart'; // Make sure you have the correct path for Chart component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';

const ArtworksTable = ({ artworks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Artwork Title</th>
        <th className='py-2'>Likes</th>
        <th className='py-2'>User</th>
        <th className='py-2'>Created At</th>
        <th className='py-2'>Description</th>
        <th className='py-2 hidden md:block'>Category</th>
        <th className='py-2'>Action</th>
      </tr>
    </thead>
  );

  const TableRow = ({ artwork }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            // className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='text-base text-black'>{artwork.title}</p>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYLES[artwork.description])}>
            {ICONS[artwork.priority]}
          </span>
          <span className='capitalize'>{artwork.likes_count}</span>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex'>
          <div
            className={clsx(
              "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
              BGS[artwork.user.id % BGS.length]
            )}
          >
            {artwork.user ? artwork.user.username : "faSpineer"}
          </div>
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(artwork?.created_at).fromNow()}
        </span>
      </td>

      <td className='py-2'>
        <span className='text-base text-gray-600'>
          {artwork.description} 
        </span>
      </td>

      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {artwork.category?.name}
        </span>
      </td>

      <td className='py-2'>
        <div className='flex gap-2'>
          <Link to={`/artworks/${artwork.id}`} className='text-blue-500 hover:text-blue-700'>
            <MdVisibility size={20} />
          </Link>
          <Link  to={`/artwork/edit/${artwork.id}`} className='text-green-500 hover:text-green-700'>
            <MdEdit size={20} />
          </Link>
          <button className='text-red-500 hover:text-red-700'>
            <MdDelete size={20} onClick={console.log("You clicked me")} />
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
          {artworks?.map((artwork, id) => (
            <TableRow key={id} artwork={artwork} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ArtworksDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        const statistics = await DashboardService.getArtworksStatistics();
        const { artworks, deletedArtworks, artworksCount, wallsCount, likesCount, commentsCount } = statistics;

        setStats([
          {
            _id: "1",
            label: "ARTWORKS",
            total: artworksCount || 0,
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
            total: deletedArtworks || 0,
            icon: <GroupIcon />,
            bg: "bg-[#be185d]" || 0,
          },
        ]);

        setChartData([
          {
            name: 'Walls',
            total: wallsCount,
            color: '#1d4ed8',
          },
          {
            name: 'Artworks',
            total: artworksCount,
            color: '#b444d0',
          },
          {
            name: 'Likes',
            total: likesCount,
            color: '#f59e0b',
          },
          {
            name: 'Comments',
            total: commentsCount,
            color: '#be185d',
          },
        ]);

        setArtworks(artworks);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching statistics: ", error);
        setIsLoading(false);
      }
    };

    fetchStatistics();

  }, []);

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 backdrop-filter backdrop-blur-lg md:p-8 sm:p-10 ss:p-30 bg-white border-solid border-2 border-indigo-600 p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className={`text-black text-base font-semibold`}>{label}</p>
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
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-4'>
              {stats.map(({ icon, bg, label, total }, index) => (
                <Card key={index} icon={icon} bg={bg} label={label} count={total} />
              ))}
            </div>
            <div className='w-full backdrop-filter backdrop-blur-lg md:p-8 sm:p-10 ss:p-30 bg-white border-solid border-2 border-indigo-600 my-16 p-4 rounded shadow-sm'>
              <h4 className='text-xl text-black font-semibold font-raleway'>
                Artwork Visualization
              </h4>
              {isLoading ? (
                <div className="text-center py-4">
                  <span className="text-indigo-600 text-3xl"><FontAwesomeIcon icon={faSpinner} spin /></span>
                </div>
              ) : (
                <div className='h-64 w-full'>
                <Chart chartData={chartData} />
                <Link to="/admin/artworks" className="text-white hover:underline mt-4 inline-block">
                  View all artworks
                </Link>
                </div>
              )}



            </div>
            <div className='flex-1'>
              {isLoading ? (
                <div className="text-center py-4">
                  <span className="text-indigo-600 text-3xl"><FontAwesomeIcon icon={faSpinner} spin /></span>
                </div>
              ) : (
                <div className='bg-indigo-600 p-6'>
                  <ArtworksTable artworks={artworks} /> {/* Pass artworks data */}
                </div>
              )}
            </div>
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

export default ArtworksDashboard;
