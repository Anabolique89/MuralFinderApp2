import React, { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Sidebar from "./Sidebar";

const MobileSidebar = ({ isSidebarOpen, closeSidebar }) => {
  const mobileMenuRef = useRef(null);

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        ref={mobileMenuRef}
        className={clsx(
          "fixed inset-0 z-50 bg-black/40 transition-transform transform",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={closeSidebar}
      >
        <div className=" bg-indigo-600 w-3/4 h-full" onClick={(e) => e.stopPropagation()}>
          <div className="w-full flex justify-end px-5 mt-5">
            <button
              onClick={closeSidebar}
              className="flex justify-end items-end"
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className="-mt-10">
            <Sidebar />
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default MobileSidebar;
