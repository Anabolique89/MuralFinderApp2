import React, { useState, useEffect } from "react";
import {
  MdDelete,
  MdOutlineRestore,
  MdMenu,
} from "react-icons/md";
import Title from "../components/dashboard/Title";
import Button from "../components/dashboard/Button";
import ConfirmationDialog from "../components/dashboard/Dialogs.jsx";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
import styles from '../style';
import Footer from '../components/Footer.jsx';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import TrashService from '../services/TrashService'; // Import your TrashService
import { ToastContainer, toast } from "react-toastify";

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [trashedItems, setTrashedItems] = useState({}); // State to hold trashed items by model
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    fetchTrashedItems();
  }, []);

  const fetchTrashedItems = async () => {
    try {
      const response = await TrashService.getAll(); // Call the TrashService to get all trashed items
      setTrashedItems(response.data); // Assuming response.data contains the trashed items
    } catch (error) {
      console.error("Error fetching trashed items:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteClick = (model, id) => {
    setType("delete");
    setSelected({ model, id });
    setOpenDialog(true);
  };

  const restoreClick = (model, id) => {
    setSelected({ model, id });
    setType("restore");
    setMsg("Restore item?");
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true)
      const { model, id } = selected;
      await TrashService.delete(model, id);
      toast.success("Item Deleted permanently")
      await fetchTrashedItems(); // Refresh the list after deletion

    } catch (error) {
      setMsg("Error deleting item.");
      console.error("Error deleting item:", error);
    } finally {
      setOpenDialog(false);
      setLoading(false)
    }
  };

  const handleRestore = async () => {
    try {
      const { model, id } = selected;
      console.log(selected)
      setLoading(true)
      await TrashService.restore(model, id);
      toast.success("Item Restored")
    } catch (error) {
      toast.error("Error restoring item.");
      console.error("Error restoring item:", error);
    } finally {
      setOpenDialog(false);
      setLoading(false)
    }
  };

  // Header row for Artworks
  const ArtworkTableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2 text-yellow-600'>Title</th>
        <th className='py-2 text-yellow-600'>Description</th>
        <th className='py-2 text-yellow-600'>Created By</th>
        <th className='py-2 text-yellow-600'>Date Trashed</th>
        <th className='py-2 text-yellow-600'>Actions</th>
      </tr>
    </thead>
  );

  // Header row for Users
  const UserTableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2 text-yellow-600'>Name</th>
        <th className='py-2 text-yellow-600'>Email</th>
        <th className='py-2 text-yellow-600'>Date Trashed</th>
        <th className='py-2 text-yellow-600'>Actions</th>
      </tr>
    </thead>
  );

  // Header row for Walls
  const WallTableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2 text-yellow-600'>Title</th>
        <th className='py-2 text-yellow-600'>Location</th>
        <th className='py-2 text-yellow-600'>Date Trashed</th>
        <th className='py-2 text-yellow-600'>Actions</th>
      </tr>
    </thead>
  );

  // Header row for Posts
  const PostTableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2 text-yellow-600'>Title</th>
        <th className='py-2 text-yellow-600'>Content</th>
        <th className='py-2 text-yellow-600'>Author</th>
        <th className='py-2 text-yellow-600'>Date Trashed</th>
        <th className='py-2 text-yellow-600'>Actions</th>
      </tr>
    </thead>
  );

  // Rows for Artworks
  const ArtworkTableRow = ({ artwork }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2 text-yellow-600'>{artwork.title}</td>
      <td className='py-2 text-yellow-600'>{artwork.description}</td>
      <td className='py-2 text-yellow-600'>{artwork.createdBy?.name}</td>
      <td className='py-2 text-yellow-600'>{new Date(artwork.deleted_at).toDateString()}</td>
      <td className='py-2 text-yellow-600 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-yellow-700' />}
          onClick={() => restoreClick('artwork', artwork.id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-700' />}
          onClick={() => deleteClick('artwork', artwork.id)}
        />
      </td>
    </tr>
  );

  // Rows for Users
  const UserTableRow = ({ user }) => (
    <tr className='border-b border-gray-900 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2 text-yellow-600'>{user.username}</td>
      <td className='py-2 text-yellow-600'>{user.email}</td>
      <td className='py-2 text-yellow-600'>{new Date(user.deleted_at).toDateString()}</td>
      <td className='py-2 text-yellow-600 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-yellow-700' />}
          onClick={() => restoreClick('user', user.id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick('user', user.id)}
        />
      </td>
    </tr>
  );

  // Rows for Walls
  const WallTableRow = ({ wall }) => (
    <tr className='border-b border-gray-900 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2 text-yellow-600'>{wall.title}</td>
      <td className='py-2 text-yellow-600'>{wall.location}</td>
      <td className='py-2 text-yellow-600'>{new Date(wall.deleted_at).toDateString()}</td>
      <td className='py-2 text-yellow-600 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick('wall', wall.id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick('wall', wall.id)}
        />
      </td>
    </tr>
  );

  // Rows for Posts
  const PostTableRow = ({ post }) => (
    <tr className='border-b border-gray-900 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2 text-yellow-600'>{post.title}</td>
      <td className='py-2 text-yellow-600'>{post.content}</td>
      <td className='py-2 text-yellow-600'>{post.author?.name}</td>
      <td className='py-2 text-yellow-600'>{new Date(post.deleted_at).toDateString()}</td>
      <td className='py-2 text-yellow-600 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick('post', post.id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick('post', post.id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full flex flex-col md:flex-row flex-1'>
        <ToastContainer />
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

          <div className='flex-1'>
            <Outlet />
          </div>

          <div className='w-full md:px-1 px-0 mb-6'>
            <div className='mb-8 text-white'>
              <Title title='Trashed Items' />
            </div>

            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <>
                {/* Table for Artworks */}
                <div className="mb-6">
                  <h2 className="text-xl text-white font-semibold mb-2">Artworks</h2>
                  <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                      <table className='w-full mb-5'>
                        <ArtworkTableHeader />
                        <tbody>
                          {trashedItems.artworks?.map((artwork) => (
                            <ArtworkTableRow key={artwork.id} artwork={artwork} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Table for Users */}
                <div className="mb-6">
                  <h2 className="text-xl text-white font-semibold mb-2">Users</h2>
                  <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                      <table className='w-full mb-5'>
                        <UserTableHeader />
                        <tbody>
                          {trashedItems.users?.map((user) => (
                            <UserTableRow key={user.id} user={user} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Table for Walls */}
                <div className="mb-6">
                  <h2 className="text-xl text-white text-white font-semibold mb-2">Walls</h2>
                  <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                      <table className='w-full mb-5'>
                        <WallTableHeader />
                        <tbody>
                          {trashedItems.walls?.map((wall) => (
                            <WallTableRow key={wall.id} wall={wall} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Table for Posts */}
                <div className="mb-6">
                  <h2 className="text-xl text-white font-semibold mb-2">Posts</h2>
                  <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                      <table className='w-full mb-5'>
                        <PostTableHeader />
                        <tbody>
                          {trashedItems.posts?.map((post) => (
                            <PostTableRow key={post.id} post={post} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <BackToTopButton />
      <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
        <Footer />
      </div>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => {
          if (type === "delete") {
            handleDelete();
          } else if (type === "restore") {
            handleRestore();
          }
        }}
      />

    </>
  );
};

export default Trash;