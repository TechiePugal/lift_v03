import React, { useEffect, useState } from "react";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import EditPatient from "./EditPatient";
import { formatDate } from "../../../../../../utils/date";
import { getProfilePic } from "../../../../../../api/Treatments/PatientDatabase/PatientDatabase";
import { useSelector } from "react-redux";
import SMS from "../../../../../icons/SMS";
import Whatsapp from "../../../../../icons/Whatsapp";

const Profile = ({ patientProfile, getPatientData }) => {
  const hospitalInfo = useSelector((state) => state.hospitalInfo);
  const [editOpen, setEditOpen] = useState(false);
  const [img, setImg] = useState("");
  const handleEdit = () => {
    setEditOpen(!editOpen);
  };

  useEffect(() => {
    patientProfile?._id &&
      getProfilePic(patientProfile._id)
        .then((response) => {
          setImg(response);
        })
        .catch((error) => {});
  }, [patientProfile]);
  return (
    <div className="shadow-card rounded-15 pb-4">
      <div
        className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-2 flex flex-wrap gap-2 justify-between items-center mb-4`}
      >
        <p className="text-bodyBB text-darkgrey">Patient Information</p>
        <div className="lg:w-[200px] w-full">
          <Button
            type={"primary"}
            action={"button"}
            onClick={handleEdit}
            className={"py-[8px] lg:py-[10px] text-bodyBB"}
          >
            Edit Patient info
          </Button>
        </div>
      </div>
      <div className="lg:flex px-4">
        <div className="lg:flex gap-11">
          <div className="flex justify-center">
            <img
              src={img}
              className="min-w-[122px] max-w-[122px] h-[122px] rounded-full shadow-sm border-4"
              alt="Profile pic"
            />
          </div>
          <div>
            <dl>
              <div class="px-4 py-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-0 xl:px-6 items-center">
                <dt class="text-bodyLB text-darkgrey">Patient ID</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {hospitalInfo?.patientId_prefix + patientProfile?.patient_id}
                </dd>
              </div>
              <div class=" px-4 py-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-0 xl:px-6 items-center">
                <dt class="text-bodyLB text-darkgrey">Patient Name</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.name}
                </dd>
              </div>
              <div class=" px-4 py-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-0 xl:px-6 items-center">
                <dt class="text-bodyLB text-darkgrey">Mobile Number</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.phone}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div>
            <dl>
              <div class=" px-4 py-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-0 xl:px-6 items-center">
                <dt class="text-bodyLB text-darkgrey">Gender</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2 items-center">
                  {patientProfile?.gender}
                </dd>
              </div>
              <div class=" px-4 py-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-0 xl:px-6 items-center">
                <dt class="text-bodyLB text-darkgrey">Date of Birth</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {formatDate(patientProfile?.dob) || "-"}
                </dd>
              </div>
              <div class=" px-4 py-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-0 xl:px-6 items-center">
                <dt class="text-bodyLB text-darkgrey">Age</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.age}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className=" lg:!max-w-[400px] xl:!max-w-[500px]">
          <div>
            <dl>
              <div class=" px-4 py-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-0 xl:px-6 items-center">
                <dt class="text-bodyLB text-darkgrey">Address</dt>
                <dd class="mt-1 text-bodyRB text-darkgrey sm:mt-0 sm:col-span-2">
                  {patientProfile?.address}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <dl>
              <div className="shadow-card rounded-15 flex justify-center">
                <div className=" flex flex-col p-5 justify-center">
                  <p className="text-darkgrey  text-bodyBB mb-2">
                    Preferred Communication Channel{" "}
                  </p>

                  <div className="flex  justify-between">
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                        name={"whatsapp"}
                        checked={patientProfile.whatsapp}
                      />
                      <p className="text-bodyRB text-darkgrey">Whatsapp</p>
                      <div className="mt-1">
                        <Whatsapp />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        checked={patientProfile.sms}
                        type="checkbox"
                        className="h-[14px] w-[14px] accent-pink  rounded focus:accent-pink-500"
                        name={"sms"}
                      />
                      <p className="text-bodyRB text-darkgrey">SMS</p>
                      <div className="mt-1">
                        <SMS />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Register Patient*/}
      <ModalWrapper
        open={editOpen}
        handleClose={handleEdit}
        title={"Edit Patient"}
      >
        <EditPatient
          handleEdit={handleEdit}
          patientProfile={patientProfile}
          getPatientData={getPatientData}
        />
      </ModalWrapper>
    </div>
  );
};

export default Profile;
