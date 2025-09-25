import React from "react";
import dayjs from "dayjs";
import { displayDate } from "../../../../../utils/date";

const ProfileSection = ({ patientProfile }) => {
  return (
    <div className="shadow-card rounded-15 pb-2">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 text-bodyBB text-darkgrey mb-4`}
      >
        Patient Information
      </div>
      <div className="lg:flex px-4">
        <div className="lg:flex gap-11">
          <div className="flex justify-center">
            <img
              src={
                patientProfile?.profilePicture
                  ? `https://api.simpld.in/profileImages/${patientProfile?.profilePicture}`
                  : "/default_pro_pic.png"
              }
              className="min-w-[122px] max-w-[122px] max-h-[122px] rounded-full shadow-sm border-4"
              alt="Profile pic"
            />
          </div>
          <div>
            <dl>
              <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-bodyLB text-darkgrey">Patient ID</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.patient_id || "-"}
                </dd>
              </div>
              <div class=" px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-bodyLB text-darkgrey">Patient Name</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.name || "-"}
                </dd>
              </div>
              <div class=" px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-bodyLB text-darkgrey">Mobile Number</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.phone || "-"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div>
            <dl>
              <div class=" px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-bodyLB text-darkgrey">Gender</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.gender || "-"}
                </dd>
              </div>
              <div class=" px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-bodyLB text-darkgrey">Date of Birth</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {displayDate(patientProfile?.dob)|| "-"}
                </dd>
              </div>
              <div class=" px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-bodyLB text-darkgrey">Age</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.age || "-"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
