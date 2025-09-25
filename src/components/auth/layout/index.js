import { useEffect } from "react";
import AuthHeader from "./header/AuthHeader";
import { useNavigate } from "react-router-dom";

const AuthUiLayout = ({ children, signup }) => {
  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigation(-1);
  }, []);

  return (
    <div className="px-[10px] md:px-[150px] py-[40px] grid grid-flow-row grid-cols-1 xl:h-screen">
      {/* <AuthHeader /> */}
      <div className="w-full h-full shadow-md rounded-[20px] gap-5 p-10 flex justify-around ">
        {!signup ? (
          <img
            src="/Group.png"
            alt=""
            className="lg:w-[400px] lg:h-[400px] hidden md:block mt-10 sticky top-10"
          />
        ) : (
          <img
            src="/signupLogo.png"
            alt=""
            className="lg:w-[400px] lg:h-[400px] hidden md:block mt-10 sticky top-10"
          />
        )}

        <div className="w-full max-w-[397px] md:mt-10 flex flex-col">
          {children}
        </div>
      </div>
      {/* <div className="flex justify-center mt-[25px] pb-2">
        <span className="text-bodyRB text-greyedtext">
          Reach us for support at 7010895652
        </span>
      </div> */}
    </div>
  );
};

export default AuthUiLayout;
