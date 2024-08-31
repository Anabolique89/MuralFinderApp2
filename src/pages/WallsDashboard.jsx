import React, { useState } from "react";
import {
  MdMenu,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import GroupIcon from '@mui/icons-material/Group';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import RoomIcon from '@mui/icons-material/Room';
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import { BGS, PRIOTITYSTYLES, TASK_TYPE, getInitials } from "../utils/index.js";
import UserInfo from "../components/dashboard/UserInfo";
import { Outlet } from "react-router-dom";
import styles from '../style';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Wall Title</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>User</th>
        <th className='py-2'>Location</th>
        <th className='py-2'>Description</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYLES[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>
      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <div className='w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WallsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "WALLS",
      total: summary?.totalTasks || 0,
      icon: <RoomIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "LEGAL",
      total: totals["completed"] || 0,
      icon: <InsertPhotoIcon />,
      bg: "bg-[#b444d0]",
    },
    {
      _id: "3",
      label: "ILLEGAL",
      total: totals["in progress"] || 0,
      icon: <ArticleIcon />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "DELETED",
      total: totals["todo"],
      icon: <GroupIcon />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 backdrop-filter backdrop-blur-lg md:p-8 sm:p-10 ss:p-30 cta-block border-solid border-2 border-indigo-600 p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className={` ${styles.paragraph} text-base font-semibold`}>{label}</p>
          <span className='text-2xl font-regular text-white font-raleway'>{count}</span>
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
          <div className='flex-1'>
            <Outlet />
          </div>
          <div className='bg-indigo-700 p-6'>
            <TaskTable tasks={summary.last10Task} />
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
