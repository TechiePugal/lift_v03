import React, { useRef, useState } from "react";
import Camera from "../../../../../../icons/Camera";
import Gallery from "../../../../../../icons/Gallery";
import ModalWrapper from "../../../../../../common/modal/ModalWrapper";
import RedClose from "../../../../../../icons/Red-Close";
import {
  closeCamera,
  openCamera,
  takePicture,
} from "../../../../../../../utils/files";
import FileIcon from "../../../../../../../utils/fileIcon";

const UploadImages = ({ imageData, setImageData }) => {
  const videoRef = useRef(null);
  const [allImages, setAllImages] = useState([]);
  const fileInputRef = React.createRef();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [viewData, setViewData] = useState("");

  const handleViewImage = (params) => {
    setViewImage(!viewImage);
    setViewData(params);
  };

  const handleCapture = async () => {
    try {
      setCameraOpen(true);
      openCamera(videoRef);
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  // Function to close the camera
  const handleCloseCamera = () => {
    closeCamera(videoRef);
    setCameraOpen(false);
  };

  const handleTakePicture = async () => {
    try {
      const image = await takePicture(videoRef);
      const imageFile = new File([image], "captured_image.jpg", {
        type: "image/jpeg",
      }); // Adjust the filename and type
      setAllImages((prevImages) => [
        ...prevImages,
        URL.createObjectURL(imageFile),
      ]); // Change this line
      setImageData((imageData) => [...imageData, imageFile]);
      handleCloseCamera();
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  // Function to handle file input change
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    // const imageUrls = files.map((file) => URL.createObjectURL(file));
    // setImageData((imageData) => [...imageData, ...files]);
    // setAllImages((prevImages) => [...prevImages, ...imageUrls]);

    files.forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const objectURL = isImage ? URL.createObjectURL(file) : null;

      setImageData((imageData) => [...imageData, file]);

      if (isImage) {
        setAllImages((prevImages) => [...prevImages, objectURL]);
      } else {
        setAllImages((prevImages) => [...prevImages, file]);
      }
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageData((imagesData) => {
      // Create a copy of the previous images array
      const updateImagesData = [...imagesData];
      updateImagesData.splice(indexToRemove, 1);
      return updateImagesData;
    });
    setAllImages((prevImages) => {
      // Create a copy of the previous images array
      const updatedImages = [...prevImages];
      const updateImagesData = [...imageData];
      updateImagesData.splice(indexToRemove, 1);
      // Remove the image at the specified index
      updatedImages.splice(indexToRemove, 1);
      return updatedImages;
    });
  };

  console.log({ allImages });

  return (
    <div>
      <div className="">
        <div className="w-full bg-secondary h-[55px]  rounded-tl-15 rounded-tr-15 mb-2 flex items-center  pl-5">
          <h1 className="text-bodyBB text-darkgrey">Upload Images</h1>
        </div>
        <div className="rounded-bl-15 rounded-br-15 shadow-card bg-white min-h-[100px] p-5">
          <div className="md:flex">
            <div className="flex items-start">
              <button type="button" onClick={handleCapture}>
                <Camera />
              </button>

              <div>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Gallery />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 max-w-[600px]">
              {allImages.map((image, index) => (
                <div key={index} className="relative">
                  {/* <img
                    src={image}
                    className="w-[100px] h-[100px] rounded-15"
                    alt={`Image ${index}`}
                    onClick={() => handleViewImage(image)}
                  /> */}
                  {FileIcon(image)}
                  <div
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-4 -right-4 cursor-pointer"
                  >
                    <RedClose />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></div>
          </div>
        </div>
      </div>

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
          <div className="flex justify-center mt-5">
            <button type="button" onClick={handleTakePicture}>
              <Camera />
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* View Image Modal */}
      <ModalWrapper open={viewImage} handleClose={handleViewImage}>
        <div className="">
          {isURL(viewData) ? (
            <img
              src={viewData}
              className="md:w-[1000px] md:h-[700px] rounded-15"
              alt={`Image`}
            />
          ) : (
            <img
              src={`https://api.simpld.in/images/${viewData}`}
              className="md:w-[1000px] md:h-[700px] rounded-15"
              alt={`Image`}
            />
          )}
        </div>
      </ModalWrapper>
    </div>
  );
};

function isURL(str) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}

export default UploadImages;
