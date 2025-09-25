import React, { useEffect, useState } from "react";
import Button from "../../../../../common/buttons/Button";
import ModalWrapper from "../../../../../common/modal/ModalWrapper";
import {
  getTreatmentFiles,
  updateTreatmentImages,
} from "../../../../../../api/Treatments";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../../utils/toaster";
import UploadImages from "./upload_images/UploadImages";
import { updatePatientFiles } from "../../../../../../api/Treatments/PatientDatabase/PatientDatabase";

const Images_Documents = ({ images, patientId, getPatientData }) => {
  const [imageData, setImageData] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState("");
  const [viewImage, setViewImage] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleViewImage = (params) => {
    setViewImage(!viewImage);
    setViewData(params);
  };

  const uploadImages = () => {
    setUploadLoading(true);
    setUploadLoading(true);
    updateTreatmentImages(imageData)
      .then((img) => {
        const imgNames = [...img?.data?.data];
        handleAddImagePatientProfile(imgNames);
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

  const handleAddImagePatientProfile = (imgNames) => {
    const payload = { treatmentFiles: [...imgNames, ...images] };
    updatePatientFiles(payload, patientId)
      .then((img) => {
        showSuccessToast("Success");
        getPatientData();
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => {});
  };

  const getFiles = async () => {
    try {
      if (images?.length > 0) {
        const promises = images?.map(
          async (image) => await getTreatmentFiles(image)
        );
        const urls = await Promise.all(promises);
        setImageUrls(urls);
      }
    } catch (error) {
      console.error("Error fetching image URLs", error);
    }
  };

  useEffect(() => {
    getFiles();
  }, [images]);

  return (
    <div>
      <div className="">
        <div className="shadow-card rounded-tl-15 rounded-tr-15 bg-secondary p-3 flex flex-wrap gap-2 justify-between items-center mb-1">
          <h1 className="text-bodyBB text-darkgrey">Images / Documents</h1>
          <div className="lg:w-[200px] w-full">
            <Button
              type={"primary"}
              className={"py-[8px] lg:py-[10px] text-bodyBB"}
              onClick={() => setOpen(true)}
            >
              Upload
            </Button>
          </div>
        </div>
        {images?.length > 0 && (
          <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[50px]  max-h-[350px] overflow-auto">
            <div className="flex flex-wrap gap-3 items-center p-5">
              {imageUrls &&
                imageUrls?.map((img, index) => (
                  <div key={index} className="flex flex-col">
                    <img
                      src={img}
                      className="w-[107px] h-[107px] rounded-15 shadow-card"
                      alt={"Img"}
                      onClick={() => handleViewImage(img)}
                    />
                    {/* <p className="w-[100px] max-h-[50px] overflow-hidden text-bodyRB text-darkgrey whitespace-nowrap overflow-ellipsis">
                    {img}
                  </p> */}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <ModalWrapper open={open} handleClose={() => setOpen(false)}>
        <div className="min-w-[90vw] md:min-w-[500px]">
          <UploadImages imageData={imageData} setImageData={setImageData} />
        </div>
        <div className="grid md:grid-cols-2 mt-3">
          <div className="grid grid-flow-col col-start-2">
            <Button
              action={"button"}
              type={"secondary"}
              className={"!w-[100px] !h-[40px]"}
            >
              Close
            </Button>
            <Button
              action={"button"}
              type={"primary"}
              className={"!w-[100px] !h-[40px]"}
              onClick={uploadImages}
              loading={uploadLoading}
            >
              Upload
            </Button>
          </div>
        </div>
      </ModalWrapper>

      {/* View Image Modal */}
      <ModalWrapper open={viewImage} handleClose={handleViewImage}>
        <div className="">
          <img
            src={viewData}
            className="w-[90vw] md:w-[1000px] md:h-[700px] rounded-15"
            alt={`Image`}
          />
        </div>
      </ModalWrapper>
    </div>
  );
};

export default Images_Documents;
