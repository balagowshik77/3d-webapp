"use client";
import React, { useState } from "react";
import UploadForm from "./UploadForm";
import { MdOutlineCloudUpload } from "react-icons/md";

const Header = () => {
  const [uploadModel, setUploadModel] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center h-auto px-4 rounded-b-lg py-4 bg-[#4E0D3A] min-w-screen">
        <div className="text-2xl font-semibold text-white">3D Models</div>
        <button
          onClick={() => {
            setUploadModel(true);
          }}
          className="flex flex-row items-center justify-center gap-2 p-2 text-lg font-semibold text-black rounded-md cursor-pointer bg-slate-200 hover:bg-white hover:text-black"
        >
          <MdOutlineCloudUpload className="text-xl" /> Upload
        </button>
      </div>
      {uploadModel && <UploadForm setUploadModel={setUploadModel} />}
    </>
  );
};

export default Header;
