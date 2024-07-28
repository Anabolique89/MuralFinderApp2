import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "sonner";
import { getInitials } from "../utils";
import { Link, useNavigate } from 'react-router-dom';
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import ChangePassword from "./ChangePassword";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const userImage = user?.profile_image_url  || 'https://example.com/default-image.jpg';

  const navigate = useNavigate();

  return (
    <>
      <div className=''>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <MenuButton className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
              <span className='text-white font-semibold'>
                <img src={`https://api.muralfinder.net${userImage}`}
                 alt={user?.userImage} className='w-10 h-10 rounded-full object-cover' />
                {user.userImage}
              </span>
            </MenuButton>
          </div>



          {/* <Link to={`/profile/${user?.id}`} className="flex items-center">
              {userImage ? (
                <img src={`https://api.muralfinder.net${userImage}`} alt={artwork.user?.username} className='w-8 h-8 rounded-full mr-2 object-cover' />
              ) : (
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 rounded-full mr-2 bg-gray-200 p-1" />
              )}
              <div className='font-raleway font-bold text-purple-400 text-sm mb-2'>
                {user?.username || 'Unknown'}
              </div>
            </Link> */}

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <MenuItems className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-[#1f1f1f] shadow-2xl ring-1 ring-black/5 focus:outline-none'>
              <div className='p-4'>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/profile')}
                      className={`text-gray-700 dark:text-gray-300  group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUser className='mr-2' aria-hidden='true' />
                      Profile
                    </button>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`text-gray-700 dark:text-gray-300  group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUserLock className='mr-2' aria-hidden='true' />
                      Change Password
                    </button>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ active }) => (
                    <button
                    //   onClick={logoutHandler}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Logout
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;