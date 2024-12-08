import React, { useState, useEffect } from 'react';
import {
  MdMenu
} from 'react-icons/md';
import GroupIcon from '@mui/icons-material/Group';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import RoomIcon from '@mui/icons-material/Room';
import moment from 'moment';
import clsx from 'clsx';
import UserInfo from '../components/dashboard/UserInfo';
import { Outlet } from 'react-router-dom';
import styles from '../style';
import Footer from '../components/Footer.jsx';
import Chart from '../components/Chart.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import DashboardService from '../services/DashboardService.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getInitials } from '../utils/index.js';

const ArtworksTable = ({ artworks }) => {

  const TableHeader = () => (
    <thead className='border-b border-gray-300 p-8'>
      <tr className='text-black text-left p-2'>
        <th className='py-2 px-2'>Title</th>
        <th className='py-2 px-2'>Description</th>
        <th className='py-2 px-2'>Category</th>
        <th className='py-2 px-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ artwork }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2 px-2'>
        <div className='flex items-center gap-2'>
          <p className='text-base text-black'>{artwork.title}</p>
        </div>
      </td>
      <td className='py-2 px-2'>
        <div className='flex gap-1 items-center'>
          <span className='capitalize'>{artwork.description}</span>
        </div>
      </td>
      <td className='py-2 px-2'>
        <div className='flex bg-gray-200 p-1 rounded'>
          {artwork.category?artwork.category.name:""}
        </div>
      </td>
      <td className='py-2 px-2 hidden md:block'>
        <span className='text-base text-gray-600 '>
          {moment(artwork?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <div className='w-full md:w-2/3 bg-white px-2 md:px-4 p-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader />
        <tbody>
          {artworks?.map((artwork, id) => (
            <TableRow key={id} artwork={artwork} />
          ))}
          {artworks?.length === 0 && (
            <tr>
              <td className='py-2'>
                <p className='text-base text-gray-600 '>
                  No Artworks
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
  
      <div className='flex justify-between items-center mt-4 px-2 py-2'>
        <a href='/admin/artworks' className='text-blue-500 hover:text-blue-700'>
          View All Artworks
        </a>
        <nav aria-label='Page navigation px-2 py-2'>
          <ul className='inline-flex -space-x-px'>
            <li>
              <a href='#' className='px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'>
                Previous
              </a>
            </li>
            <li>
              <a href='#' className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>
                1
              </a>
            </li>
            <li>
              <a href='#' className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>
                2
              </a>
            </li>
            <li>
              <a href='#' className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>
                3
              </a>
            </li>
            <li>
              <a href='#' className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
};

const UserTable = ({ users }) => {
  console.log(users)
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2 px-2'>Username</th>
        <th className='py-2 px-2'>Role (User or Admin?)</th>
        <th className='py-2 px-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2 '>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.username)}</span>
          </div>
          <div>
            <p >{user.username}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>
      <td>
        <p
          className={clsx(
            'w-fit px-2 py-1 rounded-full text-sm',
            user?.isActive ? 'bg-blue-200' : 'bg-yellow-100'
          )}
        >
          {user?.role}
        </p>
      </td>
      <td className='py-2 px-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-4 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users.data?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [statistics, setStatistics] = useState({
    artworkCount: 0,
    postCount: 0,
    userCount: 0,
    wallsCount: 0,
    recentArtworks: [],
    users: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data = await DashboardService.getDashboardData();
        setStatistics(data);
        setIsLoading(false);
      } catch (error) {
        console.error('There was an error fetching the statistics!', error);
        setIsLoading(false);
      }
    };

    loadStatistics();
  }, []);

  const stats = [
    {
      label: 'WALLS',
      total: statistics.wallsCount,
      icon: <RoomIcon />,
      bg: 'bg-[#1d4ed8]',
    },
    {
      label: 'ARTWORKS',
      total: statistics.artworkCount,
      icon: <InsertPhotoIcon />,
      bg: 'bg-[#b444d0]',
    },
    {
      label: 'POSTS',
      total: statistics.postCount,
      icon: <ArticleIcon />,
      bg: 'bg-[#f59e0b]',
    },
    {
      label: 'USERS',
      total: statistics.userCount,
      icon: <GroupIcon />,
      bg: 'bg-[#be185d]',
    },
  ];

  const chartData = [
    {
      name: 'Walls',
      total: statistics.wallsCount,
    },
    {
      name: 'Artworks',
      total: statistics.artworkCount,
    },
    {
      name: 'Posts',
      total: statistics.postCount,
    },
    {
      name: 'Users',
      total: statistics.userCount,
    },
  ];


  const Card = ({ label, total, bg, icon }) => {
    return (
      <div className='w-full h-32 backdrop-filter backdrop-blur-lg md:p-8 sm:p-10 ss:p-30 bg-white border-solid border-2 border-indigo-600 p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className={`text-base text-black font-semibold`}>{label}</p>
          <span className='text-2xl font-regular text-gray-600 font-raleway'>{total}</span>
          <span className='text-sm text-gray-400'> {isLoading ? 
            <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : moment(statistics?.recentArtworks[0]?.created_at).fromNow() }</span>
        </div>
        <div
          className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center text-white',
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
      <div className='flex-1 flex flex-col md:flex-row'>
        <div className='w-1/5 h-screen bg-indigo-600 sticky top-0 hidden md:block'>
          <Sidebar />
        </div>
        <MobileSidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
        <div className='flex-1 flex flex-col'>
          <header className='w-full flex justify-between items-center p-4 bg-white shadow-md md:hidden'>
            <button onClick={() => setIsSidebarOpen(true)} className='text-2xl'>
              <MdMenu />
            </button>
          </header>
          <div className='h-full py-2 w-full'>
              <div className='h-full py-4 w-full pl-2 pr-6'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                  {stats.map(({ icon, bg, label, total }, index) => (
                    <Card key={index} icon={icon} bg={bg} label={label} total={total} />
                  ))}
                </div>
                <div className='w-full backdrop-filter backdrop-blur-lg md:p-4 sm:p-6 ss:p-10 bg-white border-solid border-2 border-indigo-600 my-4 p-4 rounded shadow-sm'>
                  <h4 className='text-xl text-black font-semibold font-raleway'>
                    Chart by Priority
                  </h4>
                  {isLoading ? (
                    <div className="text-center py-4">
                      <span className="text-indigo-600 text-3xl"><FontAwesomeIcon icon={faSpinner} spin /></span>
                    </div>
                  ) : (
                    <Chart chartData={chartData} />
                  )}
                </div>

              </div>
          </div>
          <div className='bg-indigo-600 pl-5 pr-6'>
            <div className='w-full flex flex-col md:flex-row gap-2 2xl:gap-4 py-'>
              {isLoading ? (
                <div className="text-center py-4">
                  <span className="text-indigo-600 text-3xl"><FontAwesomeIcon icon={faSpinner} spin /></span>
                </div>
              ) : (
                <><ArtworksTable artworks={statistics.recentArtworks} />
                <UserTable users={statistics.users} /></>
                
              )}
             
            </div>
          </div>
        </div>

      </div>
      <div className='p-4 2xl:px-10'>
        <Outlet />
      </div>

      <BackToTopButton />
      <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
        <Footer />
      </div>

    </section>
  );
};

export default Dashboard;
