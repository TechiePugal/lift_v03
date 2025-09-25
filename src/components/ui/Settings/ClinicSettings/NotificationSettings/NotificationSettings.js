import React from 'react'
import SendBirthDayWishSwitch from '../Switchs/SendBirthdayWishSwitch'
import ShowFinanceAbstractSwitch from '../Switchs/ShowFinanceAbstractSwitch'
import SendLabOrderToPatientSwitch from '../Switchs/SendLabOrderToPatientSwitch'

const NotificationSettings = ({}) => {
  return (
    <div className="shadow-card rounded-15 p-5 bg-white h-fit">
    <div className="mb-[50px]">
      <h1 className="mb-4 text-bodyBB text-darkgrey">
        Notification Settings
      </h1>
      <div className="grid  gap-x-[72px] gap-y-[16px]">
        <SendBirthDayWishSwitch />
        <ShowFinanceAbstractSwitch />
        <SendLabOrderToPatientSwitch />
        
        
      </div>
    </div>
  </div>
  )
}

export default NotificationSettings