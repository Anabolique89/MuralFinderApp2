import React, { useState } from "react";
import Title from "../components/dashboard/Title";
import Button from "../components/dashboard/Button.jsx";
import { IoMdAdd } from "react-icons/io";
import {MdMenu} from "react-icons/md";
import { summary } from "../assets/data";
import clsx from "clsx";
import moment from "moment";
import { BGS, PRIOTITYSTYLES, TASK_TYPE, getInitials } from "../utils/index.js";
// import UserInfo from "../components/dashboard/UserInfo";
import { Outlet } from "react-router-dom";
import styles from '../style';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';


const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  // Table header row
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
        <th className='py-2'></th>
      </tr>
    </thead>
  );

  // User row table
  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-purple-700'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email || "user.email.com"}</td>
      <td className='p-2'>{user.role}</td>

      <td className='p-2'>
        <button
          onClick={() => userActionHandler(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-purple-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-purple-600 hover:text-purple-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
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
     
          <div className='flex-1'>
            <Outlet />
          </div>
     
      </div>

        <div className='w-full md:px-1 px-0 mb-6'>
          <div className='flex items-center justify-between mb-8'>
            <Title title='Team Members' />
          </div>
          {/* Table */}
          <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
            <div className='overflow-x-auto'>
              <table className='w-full mb-5'>
                <TableHeader />
                <tbody>
                  {summary.users?.map((user, index) => (
                    <TableRow key={index} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BackToTopButton />
          <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;