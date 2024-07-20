import React, { useState, useEffect } from "react";
import {
  MdMenu,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import GroupIcon from '@mui/icons-material/Group';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ArticleIcon from '@mui/icons-material/Article';
import RoomIcon from '@mui/icons-material/Room';
import moment from "moment";
import clsx from "clsx";
import UserInfo from "../components/dashboard/UserInfo";
import { Outlet } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../style';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import WallService from "../services/WallService.js"; // Import your wall service
import DashboardService from "../services/DashboardService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const WallsTable = ({ walls, onEdit, onDelete, onView }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2 px-2'>Wall Title</th>
        <th className='py-2 px-2'>Status</th>
        <th className='py-2 px-2'>User</th>
        <th className='py-2 px-2'>Location</th>
        <th className='py-2 px-2'>Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ wall }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2 px-2'>
        <div className='flex items-center gap-2'>
          <p className='text-base text-black'>{wall.title ?? "Anonymous"}</p>
        </div>
      </td>
      <td className='py-2 px-2'>
        <div className='flex gap-1 items-center'>
          <span className='capitalize'>{wall.is_verified ? "Verified" : "Unverified"}</span>
        </div>
      </td>
      <td className='py-2 px-2'>
        <div className='flex'>
          <UserInfo user={wall.added_by} />
        </div>
      </td>
      <td className='py-2 px-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {wall.location_text}
        </span>
      </td>
      <td className='py-2 px-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(wall.created_at).fromNow()}
        </span>
      </td>
      <td className='py-2'>
        <button onClick={() => onView(wall)}>
          <span className='text-base text-gray-600'> <FontAwesomeIcon icon={faEye} /></span>
        </button>
        <button onClick={() => onEdit(wall)}>
          <span className='text-base text-blue-600 ml-2 mr-2'> <FontAwesomeIcon icon={faPencil} /></span>
        </button>
        <button onClick={() => onDelete(wall)}>
          <span className='text-base text-red-600'> <FontAwesomeIcon icon={faTrash} /></span>
        </button>
      </td>
    </tr>
  );

  return (
    <div className='w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader />
        <tbody>
          {walls?.map((wall, id) => (
            <TableRow key={id} wall={wall} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WallsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [walls, setWalls] = useState([]);
  const [wallsStats, setWallStats] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWalls = async () => {
      const wallsData = await WallService.getAllWalls()
      wallsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      console.log(wallsData)
      const wallsStat = await DashboardService.getWallsStatisticsData()
      setWalls(wallsData);
      setWallStats(wallsStat);
    };
    fetchWalls();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (wall) => {
    // Edit functionality here
  };

  const handleDelete = (wall) => {
    // Delete functionality here
  };

  const handleView = (wall) => {
    // View functionality here
  };

  const filteredWalls = walls.filter(wall => 
    wall.location_text.toLowerCase().includes(search.toLowerCase())
  );

  

  const {wallsCount, verified, unverified, deletedCount} = wallsStats
  const stats = [
    {
      _id: "1",
      label: "WALLS",
      total: wallsCount,
      icon: <RoomIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "VERIFIED",
      total: verified,
      icon: <CheckCircleIcon />,
      bg: "bg-[#00b55e]",
    },
    {
      _id: "3",
      label: "UNVERIFIED",
      total: unverified,
      icon: <DangerousIcon />,
      bg: "bg-[#e50338]",
    },
    {
      _id: "4",
      label: "DELETED",
      total: deletedCount,
      icon: <GroupIcon />,
      bg: "bg-[#be185d]",
    },
  ];

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
        <div className='w-1/5 bg-indigo-700 sticky top-0 hidden md:block'>
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
            <div className='flex justify-between items-center mb-4 font-raleway'>
              <input 
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search Walls"
                className="p-2 border border-gray-300 rounded w-full "
              />
            </div>
            <div className='flex-1'>
              <WallsTable 
                walls={filteredWalls} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                onView={handleView} 
              />
            </div>
          </div>
        </div>
      </div>
      <BackToTopButton />
      <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
        <Footer />
      </div>
    </section>
  );
};

export default WallsDashboard;
