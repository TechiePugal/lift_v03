import { useState, useSyncExternalStore } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import Header from "../header/Header";

const BasicLayout = ({ children }) => {
  const [collapse, setCollapse] = useState(true);

  /* Collapse function */
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const [mobileSidebarOpen, setMobileSideBarOpen] = useState(false);

  const handleMobSideBar = () => {
    setMobileSideBarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-x-hidden scrollbar-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}

        {/* Mobile View */}
        <div
          onClick={handleMobSideBar}
          className={`fixed z-50 overflow-y-auto topindex scrollbar-hidden h-full duration-200 bg-darkgrey bg-opacity-30 w-full md:hidden
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div
            className={` shadow-card h-screen`}
          >
            <SideBar collapse={false} />
          </div>
        </div>
        {/* Mobile View End */}

        {/* Desktop view */}
        <div className="hidden md:block">
          <SideBar collapse={collapse} />
        </div>
        <div className="relative hidden md:block">
          {/* <!-- ===== Collapse Button ===== --> */}
          <button
            onClick={() => handleCollapse()}
            aria-controls="sidebar"
            style={{zIndex:999}}
            className="absolute md:-right-4  md:top-3 lg:bottom-20 w-[43px] h-[44px] rounded-full bg-[#219FD9] flex justify-center items-center "
          >
            <div className={`${collapse ? "rotate-180" : ""} duration-300`}>
              <img src="/icons/arrow.svg" className="" alt="" />
            </div>
          </button>
        </div>
        {/* Desktop view End*/}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden main-content">
          {/* <!-- ===== Header Start ===== --> */}
          <Header handleMobSideBar={handleMobSideBar} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div >
              <Outlet />
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default BasicLayout;
