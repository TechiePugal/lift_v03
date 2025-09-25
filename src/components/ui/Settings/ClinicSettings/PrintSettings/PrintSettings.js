import React, { useEffect, useRef, useState } from "react";
import Camera from "../../../../icons/Camera";
import Gallery from "../../../../icons/Gallery";
import {
  closeCamera,
  openCamera,
  takePicture,
} from "../../../../../utils/files";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toaster";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import { MdFlipCameraAndroid } from "react-icons/md";
import RedClose from "../../../../icons/Red-Close";
import Button from "../../../../common/buttons/Button";
import {
  getHospitalLogo,
  getHospitalsign,
  getSummaryPreview,
  
  uploadHospitalLogo,
  uploadHospitalsign,
} from "../../../../../api/settings/Settings";
import { useSelector } from "react-redux";
import Switch from "../../../../common/Switch/Switch";
import ShowPendingBalance from "../Switchs/ShowPendingBalance";

const PrintSettings = () => {
  const videoRef = useRef(null);
  const logoInputRef = React.createRef();
  const sealInputRef = React.createRef();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [imageData, setImageData] = useState("");
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [modalTittle, setModalTittle] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [signImage, setSignImage] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [previewSelectedImageOpen, setPreviewSelectedImageOpen] =
    useState(false);
  const [loadingSummaryPreview, setLoadingSummaryPreview] = useState(false);
  const hospitalInfo = useSelector((state) => state.hospitalInfo);

  /** Preview Modal Handler */
  const handlePreviewSelectedImage = () => {
    setPreviewSelectedImageOpen(!previewSelectedImageOpen);
  };

  /** Camera modal handler */
  const handleCapture = async (_, modalTittle) => {
    try {
      /** Open camera modal */
      setCameraOpen(true);
      /** camre config */
      openCamera(videoRef);
      /** Set tittle for modal */
      setModalTittle(modalTittle);
    } catch (error) {
      console.error("Error accessing the camera:", error);
      showErrorToast(error);
    }
  };

  // Function to close the camera
  const handleCloseCamera = () => {
    closeCamera(videoRef);
    setCameraOpen(false);
  };

  /** Camera image handler */
  const handleTakePicture = async () => {
    try {
      const image = await takePicture(videoRef);
      const imageFile = new File([image], "captured_image.jpg", {
        type: "image/jpeg",
      }); // Adjust the filename and type
      /** Setting preview url */
      setPreviewImg(URL.createObjectURL(image));
      /** Setting image data for api */
      setImageData(imageFile);
      /** Close the camera modal */
      handleCloseCamera();
      /** Opening preview Modal */
      handlePreviewSelectedImage();
    } catch (error) {
      console.error("Error capturing image:", error);
      showErrorToast(error);
    }
  };
  /** Camera flip handler */
  const handleToggleCamera = async () => {
    setIsFrontCamera(!isFrontCamera);
    // Close the current camera stream
    const currentStream = videoRef?.current?.srcObject;
    const tracks = currentStream?.getTracks();
    tracks?.forEach((track) => track?.stop());
    // Open the camera with the new facing mode
    openCamera(videoRef, !isFrontCamera);
  };

  // Function to handle file input change
  const handleFileInputChange = (e, modalTittle) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    /** Set tittle for modal */
    setModalTittle(modalTittle);
    /** setting preview url */
    setPreviewImg(imageUrls);
    /** setting image data for api */
    setImageData(e.target.files[0]);
    /** Opening preview Modal */
    handlePreviewSelectedImage();

    // Reset the value of the file input to allow re-selection of the same file
    e.target.value = null;
  };

  /** Image remove handler */
  const handleRemoveImage = () => {
    /** Clearing image data and preview url  */
    setPreviewImg("");
    setImageData("");
    /** Clearing image data and preview url end */

    /** Closing preview modal */
    handlePreviewSelectedImage();
  };

  /** Upload Logo Api */
  const handleUploadLogo = () => {
    if (modalTittle === "Logo Preview") {
      setLoadingUpload(true);
      uploadHospitalLogo(imageData, hospitalInfo?._id)
        .then(() => {
          showSuccessToast("Logo updated!");
          handlePreviewSelectedImage();
          setLogoImage(previewImg);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoadingUpload(false);
        });
    }
    if (modalTittle === "Sign Preview") {
      uploadHospitalsign(imageData, hospitalInfo?._id)
        .then(() => {
          showSuccessToast("Sign updated!");
          handlePreviewSelectedImage();
          setSignImage(previewImg);
        })
        .catch((error) => {})
        .finally(() => {});
    }
  };

  /** Get Logo Api  */
  const getLogoPic = () => {
    getHospitalLogo(hospitalInfo?._id)
      .then((response) => {
        setLogoImage(response);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {});
  };
  /** Get Sign Api  */
  const getSignPic = () => {
    getHospitalsign(hospitalInfo?._id)
      .then((response) => {
        setSignImage(response);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {});
  };

  useEffect(() => {
    getLogoPic();
    getSignPic();
  }, []);

  const handleSummaryPreviewButton = () => {
    setLoadingSummaryPreview(true);
    getSummaryPreview()
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        showErrorToast(error, "error");
      })
      .finally(() => {
        setLoadingSummaryPreview(false);
      });
  };

  return (
    <div className="shadow-card rounded-15 p-5 bg-white">
      <div className="flex items-center gap-3 mb-1">
        <div className="pt-4">
          <h1 className="mb-4 text-bodyBB text-darkgrey">Print Settings</h1>
        </div>
      </div>

      <div className="flex gap-10">
        <div>
          <h5 className="text-bodyRB text-darkgrey">Upload Logo</h5>
          {logoImage && (
            <div className="flex justify-center mt-1">
              <img
                src={logoImage}
                className="min-w-[122px] max-w-[122px] h-[122px] rounded-15 shadow-sm border-2 "
                alt="Logo"
              />
            </div>
          )}

          <div className="flex gap-3">
            <div className="w-[52px] h-[52px]">
              <button
                type="button"
                onClick={(e) => handleCapture(e, "Logo Preview")}
              >
                <Camera />
              </button>
            </div>
            <div className="w-[52px] h-[52px]">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={logoInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileInputChange(e, "Logo Preview")}
              />
              <button
                type="button"
                onClick={() => logoInputRef.current.click()}
              >
                <Gallery />
              </button>
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-bodyRB text-darkgrey">Upload Seal Sign</h5>
          {signImage && (
            <div className="flex justify-center mt-1">
              <img
                src={signImage}
                className="min-w-[122px] max-w-[122px] h-[122px] rounded-15 shadow-sm border-2"
                alt="Logo"
              />
            </div>
          )}
          <div className="flex gap-3">
            <div className="w-[52px] h-[52px]">
              <button
                type="button"
                onClick={(e) => handleCapture(e, "Sign Preview")}
              >
                <Camera />
              </button>
            </div>
            <div className="w-[52px] h-[52px]">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={sealInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileInputChange(e, "Sign Preview")}
              />
              <button
                type="button"
                onClick={() => sealInputRef.current.click()}
              >
                <Gallery />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <Button
            type={"secondary"}
            action={"button"}
            className={"px-2 w-[90px] !h-[40px] "}
            onClick={handleSummaryPreviewButton}
            loading={loadingSummaryPreview}
          >
            Previews
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <ShowPendingBalance />
      </div>

      {/* Preview Selected Image */}
      <ModalWrapper
        open={previewSelectedImageOpen}
        title={modalTittle}
        handleClose={handlePreviewSelectedImage}
        restrictClickOutSide={true}
      >
        <div className="w-[500px] p-5">
          <div className="">
            <img
              src={previewImg}
              className="w-[100%] h-[100%] rounded-15 border-2 border-primary"
              alt={`Image`}
            />
            <div
              onClick={() => handleRemoveImage()}
              className="cursor-pointer flex justify-center w-full mt-3"
            >
              <RedClose />
            </div>
            <div className=" flex justify-center w-full mt-3">
              <div className="w-[50%]">
                <Button
                  type={"primary"}
                  loading={loadingUpload}
                  onClick={handleUploadLogo}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
      {/* Preview Selected Image end*/}

      {/* Camera */}
      <ModalWrapper
        open={cameraOpen}
        title={"Camera"}
        handleClose={handleCloseCamera}
      >
        <div className="w-[500px] p-5">
          <video
            className="rounded-15"
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
          <div className="flex justify-center mt-5 items-center">
            <button
              className="w-14 h-12 flex justify-center items-center  text-pink bg-white text-[30px] shadow-card rounded-15"
              onClick={handleToggleCamera}
            >
              <MdFlipCameraAndroid />
            </button>
            <button onClick={handleTakePicture}>
              <Camera />
            </button>
          </div>
        </div>
      </ModalWrapper>
      {/* Camera end*/}
    </div>
  );
};

export default PrintSettings;
