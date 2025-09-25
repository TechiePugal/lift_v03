export const openCamera = async (videoRef, isFrontCamera = false) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: isFrontCamera ? "user" : "environment" },
    });
    videoRef.current.srcObject = stream;
  } catch (error) {
    console.error("Error accessing the camera:", error);
  }
};

// Function to close the camera
export const closeCamera = (videoRef) => {
  const stream = videoRef.current.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
};

export const takePicture = async (videoRef) => {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);

    // Convert the image to a Blob (binary data)
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Error capturing image."));
        }
      }, "image/jpeg"); // Adjust the format as needed (e.g., "image/png")
    });
  } catch (error) {
    console.error("Error capturing image:", error);
    throw error;
  }
};

// // Function to handle file input change
// const handleFileInputChange = (e) => {
//   const files = Array.from(e.target.files);
//   const imageUrls = files.map((file) => URL.createObjectURL(file));
//   console.log(imageUrls);
//   setAllImages((prevImages) => [...prevImages, ...imageUrls]);
// };

// const handleRemoveImage = (indexToRemove) => {
//   setAllImages((prevImages) => {
//     // Create a copy of the previous images array
//     const updatedImages = [...prevImages];
//     // Remove the image at the specified index
//     updatedImages.splice(indexToRemove, 1);
//     return updatedImages;
//   });
// };
