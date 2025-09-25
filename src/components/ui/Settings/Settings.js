import { useState } from "react";
import CardSmall from "../../common/card/card-small";
import Button from "../../common/buttons/Button";
import CardRow from "./list/card-row";
import { Link, NavLink } from "react-router-dom";
import Switch from "../../common/Switch/Switch";
import ClinicSettings from "./ClinicSettings/ClinicSettings";
import ModalWrapper from "../../common/modal/ModalWrapper";
import AddCredit from "./AddCredit/AddCredit";

const Settings = ({ counts, serialNo, prefix }) => {
  const [sendFinanceAbstract, setSendFinanceAbstract] = useState(false);
  const [sendBdayWishes, setSendBdayWishes] = useState(false);
  const [openCredit, setOpenCredit] = useState(false);

  const handleFinanceAbstractClick = (title) => {
    setSendFinanceAbstract(!sendFinanceAbstract);
  };
  const handleBdayWishesClick = (title) => {
    setSendBdayWishes(!sendBdayWishes);
  };

  const handleCredit = () => {
    setOpenCredit(!openCredit);
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Test Notification", {
              body: "You clicked the button!",
              icon: "/favicon/android-chrome-144x144.png", // Replace with your icon path
            });
          } else {
            console.log("Notification permission denied.");
          }
        });
      } else {
        console.log("Notifications not supported in this browser.");
      }
    }, 2000);
  };

  return (
    <div>
      {/* Summary section */}
      <div className="lg:flex justify-around mb-[50px]">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-heading2B text-darkgrey">Subscription</h1>
          <CardSmall
            label={"Subscription valid till"}
            value={"-"}
            className={" bg-primary text-primary !min-w-[300px]"}
          />
          <Button
            className={`w-fit lg:max-w-[385px] text-heading2B`}
            type={"primary"}
          >
            <Link to={"/settings/planandpricing"}>Manage subscription</Link>
          </Button>
        </div>
        <div className="border-r-[1.5px] border-[#B9B9B9]"></div>
        <div className="flex flex-col items-center gap-5">
          <div className="grid grid-cols-3 lg:w-full mt-2 lg:mt-0">
            <h1 className="text-heading2B text-darkgrey lg:col-start-2">
              Wallet
            </h1>
            <h1
              className="text-bodyRU text-[#DE4AC4] underline cursor-pointer"
              onClick={handleCredit}
            >
              Add Credits
            </h1>
          </div>
          <CardSmall
            label={"Whatsapp Credit Balance"}
            value={"-"}
            className={" bg-success text-success"}
          />
          <CardSmall
            label={"SMS Credit Balance"}
            value={"-"}
            className={" bg-warning text-[#CFBB00]"}
          />
          <p>
          credits valid till subscription expiry*
          </p>
        </div>
      </div>
      {/* Summary section end*/}

      

      {/*  Manage Master Database Section */}
      <div className="mb-[50px]">
        <h1 className="mb-4 text-bodyBB text-darkgrey">
          Manage Master Database
        </h1>
        <div className="grid lg:grid-cols-3 gap-x-[72px] gap-y-[16px]">
          {counts.map((data, index) => (
            <NavLink key={index} to={data?.path}>
              <CardRow label={data.label} value={data.value} />
            </NavLink>
          ))}
        </div>
      </div>
      {/*  Manage Master Database Section end*/}

      

      
      <div className="!pb-10">
        {/*  Manage clinic settings */}
        <ClinicSettings serialNo={serialNo} prefix={prefix}  sendFinanceAbstract={sendFinanceAbstract} handleFinanceAbstractClick={handleFinanceAbstractClick} handleBdayWishesClick={handleBdayWishesClick} sendBdayWishes={sendBdayWishes}/>
        {/*   Manage clinic settings Section end*/}
      </div>

      {/*  Add credit modal */}
      <ModalWrapper
        handleClose={handleCredit}
        open={openCredit}
        title={"Add Credits"}
      >
        <div>
          <AddCredit />
        </div>
      </ModalWrapper>
      {/* <div className="w-fit pb-10">
      <Button type={"secondary"} className={" p-[10px]"} onClick={handleButtonClick}>notification test</Button>
</div> */}
    </div>
  );
};

export default Settings;
