import React, { useEffect, useState } from "react";
import { IoIosDocument } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";

const FileIcon = (fileType) => {
    const isImage = typeof fileType === 'string' && fileType?.startsWith('blob:');

  if (isImage) {
    return (
      <img
        src={fileType}
        className="w-[100px] h-[100px] rounded-15"
        alt="Image"
        // onClick={() => handleViewImage(file)}
      />
    );
  }
  const getFileIcon = () => {
    switch (fileType?.type) {
      case "application/pdf":
        return <FaFilePdf />;
      case "application/msword":
        return <IoIosDocument />;
      // Add more cases for other file types as needed
      default:
        // Return a default icon or text for unrecognized file types
        return <FaFileAlt />;
    }
  };

  return (
    <div className="w-[100px] h-[100px] flex items-center justify-center rounded-15">
      {getFileIcon()}
    </div>
  );
};

// Usage example:
// <FileIcon fileType={item.file.type} />

export default FileIcon;
