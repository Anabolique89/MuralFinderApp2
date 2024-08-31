import React from 'react';
import {
  MdDashboard,
  MdOutlineAddTask,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const linkData = [
  {
    label: "Dashboard",
    link: "/Dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Walls",
    link: "/WallsDashboard",
    icon: <FaTasks />,
  },
  {
    label: "Artworks",
    link: "/ArtworksDashboard",
    icon: <MdTaskAlt />,
  },
  {
    label: "Posts",
    link: "/PostsDashboard",
    icon: <FaUsers />,
  },
  {
    label: "Users",
    link: "/Users",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "/Trash",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const path = location.pathname;

  const sidebarLinks = !user?.isAdmin ? linkData : linkData.slice(0, 5);

  // Close the sidebar on a mobile (if you have a function to do this, otherwise remove this function)
  const closeSidebar = () => {
    // dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    const isActive = path === el.link;
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-base hover:bg-[#9c3abfa7]",
          isActive ? "bg-purple-700 text-neutral-100" : "text-white"
        )}
      >
        {el.icon}
        <span className={isActive ? 'text-neutral-100' : 'hover:text-[#b444d0]'}>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center font-raleway'>
        <p className='bg-purple-400 p-2 rounded-full'>
          <MdOutlineAddTask className='text-white text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-white font-raleway'>Admin Panel</span>
      </h1>
      <div className='flex-1 flex flex-col gap-y-5 py-8 font-raleway'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
      <div>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-white'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
