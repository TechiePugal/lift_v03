import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanupUserSettings,
  closeProfileModal,
  openProfileModal,
} from "../../../store/slice/auth-slice";
import ProfileModal from "../../../pages/Profile";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import logo from "../../ui/Customers/pages/CustomerDetails/icon/logocebgr.png";

const Header = ({ handleMobSideBar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);

  const [showLogout, setShowLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoutButtonRef = useRef(null);

  const handleProfileToggle = () => {
    if (currentUser.isOpen) {
      dispatch(closeProfileModal());
    } else {
      dispatch(openProfileModal());
    }
  };

  const handleLogout = () => {
    dispatch(cleanupUserSettings());
    navigate("/login");
  };

  // Close logout dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        logoutButtonRef.current &&
        !logoutButtonRef.current.contains(event.target)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll event for background change
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollTop > 10);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? "bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-800" 
            : "g-black/40 backdrop-blur-md shadow-lg border-b border-gray-800"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Left Section - Mobile Menu & Logo */}
            <div className="flex items-center space-x-4">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={handleMobSideBar}
                className="lg:hidden p-2 rounded-md text-white hover:text-orange-400 hover:bg-white/10 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                <RxHamburgerMenu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            </div>

            {/* Right Section - User Info & Profile */}
            <div className="flex items-center space-x-4">
              {/* User Information - Hidden on mobile */}
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-white">
                  {currentUser?.userName || "User"}
                </span>
                <span className="text-xs text-gray-300">
                  {currentUser?.role || "Guest"}
                </span>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={logoutButtonRef}>
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-orange-400 bg-gray-800/80 hover:bg-gray-700 transition-all duration-300 hover:border-orange-300"
                  aria-label="User menu"
                >
                  <CgProfile className="w-5 h-5 text-white" />
                </button>

                {/* Dropdown Menu */}
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    {/* User Info Section */}
                    <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
                      <p className="text-sm font-semibold text-white truncate">
                        {currentUser?.displayName || currentUser?.userName || "User"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {currentUser?.email || currentUser?.role || "Role"}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleProfileToggle();
                          setShowLogout(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                      >
                        <CgProfile className="w-4 h-4 mr-3 text-gray-400" />
                        View Profile
                      </button>

                      <div className="border-t border-gray-700 my-1"></div>

                      <button
                        onClick={() => {
                          handleLogout();
                          setShowLogout(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors duration-200"
                      >
                        <FiLogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Profile Modal */}
      {currentUser?.isOpen && <ProfileModal />}
    </>
  );
};

export default Header;