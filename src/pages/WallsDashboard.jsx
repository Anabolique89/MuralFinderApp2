import React, { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import DangerousIcon from '@mui/icons-material/Dangerous';
import RoomIcon from '@mui/icons-material/Room';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/InsertPhoto';
import moment from "moment";
import clsx from "clsx";
import UserInfo from "../components/dashboard/UserInfo";
import { Link, useNavigate } from "react-router-dom";
import styles from '../style';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import WallService from "../services/WallService.js";
import DashboardService from "../services/DashboardService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner.jsx";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const WallsTable = ({ walls, onEdit, onView, isLoading }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteHandler = async (wallId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this wall? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await WallService.deleteWall(wallId);
          if (response?.success) {
            toast.success("Wall deleted successfully");
            await refreshWalls();
          } else {
            toast.error("Failed to delete the wall: " + response?.message);
          }
        } catch (error) {
          toast.error("Error occurred while deleting wall: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };


  const refreshWalls = async () => {
    setLoading(true);
    try {
      const wallsData = await WallService.getAllWalls(currentPage);
      const wallsArray = wallsData.data.data;
      setTotalPages(wallsData.data.last_page);
      if (Array.isArray(wallsArray)) {
        wallsArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const wallsStat = await DashboardService.getWallsStatisticsData();
        setWalls(wallsArray);
        setWallStats(wallsStat);
      } else {
        console.error("Error: 'data' is not an array", wallsData);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const TableHeader = () => (
    <thead className="bg-gray-100 border-b border-gray-300">
      <tr className="text-gray-600 text-left">
        <th className="py-2 px-4">Wall Title</th>
        <th className="py-2 px-4">Status</th>
        <th className="py-2 px-4">User</th>
        <th className="py-2 px-4 hidden md:table-cell">Location</th>
        <th className="py-2 px-4 hidden md:table-cell">Created At</th>
        <th className="py-2 px-4">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ wall }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-100">
      <td className="py-2 px-4">
        <div className="flex items-center gap-2">
          <p className="text-base text-black">{wall.title ?? wall.location_text}</p>
        </div>
      </td>
      <td className="py-2 px-4">
        <div className="flex gap-1 items-center">
          <span className={`capitalize ${wall.is_verified ? 'text-green-600' : 'text-red-600'}`}>
            {wall.is_verified ? "Verified" : "Unverified"}
          </span>
        </div>
      </td>
      <td className="py-2 px-4">
        <div className="flex">
          <UserInfo user={wall.added_by} />
        </div>
      </td>
      <td className="py-2 px-4 hidden md:table-cell">
        <span className="text-gray-600">{wall.location_text}</span>
      </td>
      <td className="py-2 px-4 hidden md:table-cell">
        <span className="text-gray-600">{moment(wall.created_at).fromNow()}</span>
      </td>
      <td className="py-2 px-4 flex items-center gap-2">
        <Link to={'/walls/'+wall.id} className="text-gray-600 hover:text-blue-600">
          <FontAwesomeIcon icon={faEye} />
        </Link>
        <Link to={'/walls/edit/'+wall.id} className="text-blue-600 hover:text-blue-800">
          <FontAwesomeIcon icon={faPencil} />
        </Link>
        <button onClick={() => deleteHandler(wall.id)} className="text-red-600 hover:text-red-800">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                <Spinner />
              </td>
            </tr>
          ) : (
            walls?.map((wall, id) => (
              <TableRow key={id} wall={wall} />
            ))
          )}
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
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWalls = async () => {
      try {
        const wallsData = await WallService.getAllWalls(currentPage);
        const wallsArray = wallsData.data.data;
        setTotalPages(wallsData.data.last_page);
        if (Array.isArray(wallsArray)) {
          wallsArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          const wallsStat = await DashboardService.getWallsStatisticsData();
          setWalls(wallsArray);
          setWallStats(wallsStat);
        } else {
          console.error("Error: 'data' is not an array", wallsData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalls();
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (wall) => {
    // Edit functionality here
  };


  const handleView = (wall) => {
    // View functionality here
  };

  const filteredWalls = walls.filter(wall =>
    wall.location_text.toLowerCase().includes(search.toLowerCase())
  );

  const { wallsCount, verified, unverified, deletedCount } = wallsStats;
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
          {isLoading ? <Spinner /> : <span className='text-2xl font-regular text-gray-800 font-raleway'>{count}</span>}
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
        <MobileSidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

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
            <div className='flex justify-between items-center mb-4'>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search Walls"
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className='flex-1'>
              <WallsTable
                walls={filteredWalls}
                onEdit={handleEdit}
                onView={handleView}
                isLoading={isLoading}
              />
            </div>
            <div className='flex justify-center mt-4 bg-gray-100 p-2'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-4 py-2 border border-gray-300 rounded-md'
              >
                Previous
              </button>
              <span className='mx-4'>{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 border border-gray-300 rounded-md'
              >
                Next
              </button>
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

export default WallsDashboard;
