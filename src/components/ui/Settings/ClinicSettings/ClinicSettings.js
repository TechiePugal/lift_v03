import React, { useEffect, useState } from "react";
import RegNumber from "./RegNumber/RegNumber";
import PrintSettings from "./PrintSettings/PrintSettings";
import ContactSettings from "./ContactSettings/ContactSettings";
import Switch from "../../../common/Switch/Switch";
import ShowQuantity from "./Switchs/ShowQuantity";
import NotificationSettings from "./NotificationSettings/NotificationSettings";



const ClinicSettings = ({
  serialNo,
  prefix,
  sendBdayWishes,
  handleBdayWishesClick,
  handleFinanceAbstractClick,
  sendFinanceAbstract,
}) => {
  return (
    <div>
      {/*  Manage clinic settings */}
      <form className="mb-5">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Clinic Settings */}
          <RegNumber serialNo={serialNo} prefix={prefix} />
          {/* Clinic Settings end */}

          {/* Print Settings */}
          <PrintSettings />
          {/* Print Settings end */}

          {/* Contact Settings */}
          <ContactSettings />
          {/* Contact Settings end*/}

          {/* Notification Section */}
          <NotificationSettings />          
          {/* Notification Section end*/}
        </div>
      </form>
      {/*   Manage clinic settings Section end*/}
    </div>
  );
};

export default ClinicSettings;
