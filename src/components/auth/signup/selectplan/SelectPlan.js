import React from "react";
import FeaturesList from "../../../common/FeaturesList/FeaturesList";
import Button from "../../../common/buttons/Button";
import { Link } from "react-router-dom";

const SelectPlan = ({ handleSignupStartTrail, loading,showPlansSelection ,setShowPlansSelection}) => {
  return (
    <div className=" pb-10">
      <div className="flex lg:flex-row flex-col gap-3">
        <div className="md:w-[60%]">
          <FeaturesList />
        </div>

        <div className="md:w-[40%]">
          <div className=" justify-center shadow-card rounded-15 bg-white p-5  pt-8">
            <div className="flex flex-col gap-5 ">
              <button
                onClick={()=>setShowPlansSelection(!showPlansSelection)}
                className="flex  justify-center items-center  lg:w-[45px] lg:h-[45px] w-[50px] h-[35px] bg-white bg-opacity-[60%] shadow-card rounded-full hover:scale-01"
              >
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.337232 8.60567C0.121631 8.38689 0.000513077 8.09019 0.000513077 7.78084C0.000513077 7.47148 0.121631 7.17479 0.337232 6.956L6.84305 0.35617C6.94914 0.244741 7.07604 0.155862 7.21635 0.094718C7.35666 0.0335742 7.50757 0.00139017 7.66027 4.40491e-05C7.81297 -0.00130207 7.96441 0.0282169 8.10575 0.0868779C8.24708 0.145539 8.37549 0.232168 8.48347 0.341709C8.59145 0.451251 8.67685 0.581511 8.73467 0.72489C8.7925 0.868269 8.8216 1.0219 8.82027 1.1768C8.81894 1.33171 8.78722 1.4848 8.72694 1.62714C8.66667 1.76948 8.57906 1.89822 8.46922 2.00584L2.77648 7.78084L8.46922 13.5558C8.67871 13.7759 8.79463 14.0706 8.79201 14.3765C8.78939 14.6824 8.66844 14.975 8.45521 15.1913C8.24198 15.4076 7.95353 15.5303 7.65199 15.533C7.35046 15.5356 7.05995 15.418 6.84305 15.2055L0.337232 8.60567Z"
                    fill="#DE4AC4"
                  />
                </svg>

                {/* <p className="text-bodyRB text-darkgrey hidden lg:block">Back</p> */}
              </button>
              <div className="flex flex-col gap-4 sticky bg-white">
                <h1 className="text-center text-heading2B">Select Your Plan</h1>
                {/* Small card */}
                <div className="flex justify-center text-center">
                  <p className="text-heading2B text-primary w-[264px]">
                    Get Free Trial for 15 days <br /> No payment details
                    required
                  </p>
                </div>
              </div>
              {/* Essentials */}
              <div className="w-full h-full bg-warning bg-opacity-[30%] rounded-15 p-3 pt-4 pb-4 grid justify-center">
                <h1 className="text-center text-heading2B text-[#CFBB00] mb-3">
                  Essentials
                </h1>
                <div className="w-[264px]">
                  <Button
                    type={"gold"}
                    className={""}
                    onClick={() => handleSignupStartTrail("Essentials")}
                    loading={loading === "Essentials"}
                  >
                    Start free trail
                  </Button>
                </div>
              </div>
              {/* Essentials Plans End*/}

              {/* Pro Plans*/}
              <div className="w-full h-full bg-[#6AB483] bg-opacity-[25%] rounded-15 p-3 pt-4 pb-4 grid justify-center">
                <h1 className="text-center text-heading2B text-success mb-3">
                  Pro
                </h1>
                <div className="w-[264px]">
                  <Button
                    type={"success"}
                    className={""}
                    onClick={() => handleSignupStartTrail("Pro")}
                    loading={loading === "Pro"}
                  >
                    Start free trail
                  </Button>
                </div>
              </div>
              {/* Pro Plans End*/}

              <div className="w-full flex justify-center  text-bodyRB text-darkgrey">
                <Link to={"/login"} className="">
                  Already registered?
                  <span className="text-primary underline">Login</span> Now
                </Link>
              </div>
              <div>
                <div className="self-center text-center ">tnc apply*</div>
                <div className="self-center text-center  text-greyedtext">
                  Need support in choosing the plans? We are happy to assist.{" "}
                  <br />
                  Do reach us at +91 90420 75906 / sales@simpld.in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
