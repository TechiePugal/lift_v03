import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import routes from "../../../routes";
import LogoutIcon from "../../icons/Logout";
import ExitIcon from "../../icons/ExitIcon";
import { cleanupUserSettings } from "../../../store/slice/auth-slice";

const SideBar = ({ sidebarOpen = true, setSidebarOpen, collapse }) => {
  const location = useLocation();
  const { pathname } = location;
  const childrenPath = pathname;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(cleanupUserSettings());
    navigation("/login");
  };
  return (
    <aside
      className={`left-0 top-0 z-9999 flex min-h-screen flex-col  bg-gradient-primary duration-100 ease-linear lg:translate-x-0  
     ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
     ${collapse ? "w-[69.8px]" : "w-[220px]"}
      `}
    >
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex items-center justify-center mt-[21px] mb-[29.25px] -ml-[5px]">
        {/* <NavLink to="/">
          <div className="image-container">
            <img
              style={{
                width: !collapse ? "143px" : "28px",
                height: !collapse ? "45px" : "45px",
                transition: "width 0.2s ease-in-out, height 0.5s ease-in-out",
              }}
              src={!collapse ? "/icons/BigLogo.png" : "/icons/BigLogo.png"}
              alt=""
            />
          </div>
        </NavLink> */}
      </div>
      {/* <!-- SIDEBAR HEADER END--> */}

      <div className="no-scrollbar flex flex-col min-h-fit duration-200 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="">
          <div className="">
            <ul className="mb-6 flex justify-center items-center -ml-[5px] flex-col gap-1.5">
              {routes
                // .filter((route) => route.dashboardItem)
                .filter((route) => {
                  // Filter based on user role condition
                  if (route.path === "/customers") {
                    return currentUser.role === "Admin";
                  }
                  return route.dashboardItem;
                })
                .map((route, index) => {
                  return (
                    <div key={index} className="flex">
                      <div className="relative">
                        <li>
                          <NavLink
                            to={route.path}
                            className={`group relative flex  items-center gap-2.5 rounded-[15px] font-medium text-bodydark1 duration-200 ease-in-out 
                      ${
                        collapse
                          ? "w-[58px] h-[54px] justify-center"
                          : " w-[200px] h-[54px] px-5"
                      }
                      ${
                        pathname === route.path ||
                        route?.childrens?.includes(childrenPath)
                          ? "bg-white bg-opacity-[26%]"
                          : ""
                      }
                      `}
                          >
                            {route.icon}
                            {!collapse && (
                              <span className=" text-white text-heading2R pt-1">
                                {route.title}
                              </span>
                            )}
                          </NavLink>
                        </li>
                      </div>
                      {(pathname === route.path ||
                        route?.childrens?.includes(childrenPath)) && (
                        <div className="border-l-4 h-[54px] rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-none absolute right-[0.9px] border-white"></div>
                      )}
                    </div>
                  );
                })}
              <div className=" mt-2 flex md:hidden ">
                <div className="relative">
                  <li>
                    <div
                      className={`group relative flex justify-start items-center gap-2.5 rounded-[15px] font-medium text-bodydark1 duration-200 ease-in-out cursor-pointer w-[200px] h-[54px] px-5
                                hover:bg-white hover:bg-opacity-[26%]`}
                      onClick={handleLogout}
                    >
                      <div className="mt-0.5">
                        <ExitIcon />
                      </div>
                      <span className=" text-white text-heading2R pt-1">
                        Logout
                      </span>
                    </div>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default SideBar;
