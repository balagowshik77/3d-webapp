"use client";
import { RxCross2 } from "react-icons/rx";
import { useContext, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ProgressBar from "@ramonak/react-progress-bar";
import toast from "react-hot-toast";
import { Context } from "@/context";

const UploadForm = ({ setUploadModel }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setUploaded } = useContext(Context);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  //upload function
  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `models/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed", error);
        toast.error("Error uploading model");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploaded(downloadURL);
          closeClickHandler();
          toast.success("Model uploaded successfully!");
        });
      }
    );
  };

  const closeClickHandler = () => {
    setUploadModel(false);
  };

  //function for string shortening
  function shortenString(str, maxLength) {
    if (str.length > maxLength) {
      const prefixLength = Math.floor((maxLength - 4) / 2);
      const suffixLength = maxLength - 4 - prefixLength;
      return (
        str.slice(0, prefixLength) +
        "...." +
        str.slice(str.length - suffixLength)
      );
    }
    return str;
  }
  return (
    <div className="absolute z-10 flex items-center justify-center w-full min-h-screen transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl top-1/2 left-1/2">
      <form
        style={{ maxHeight: "90vh", overflowY: "auto", overflowX: "hidden" }}
        className="relative flex flex-col p-4 text-black bg-white shadow-md w-96 shadow-pink-300/50 scrollbar-style bg-opacity-70 rounded-xl"
      >
        <h3 className="flex self-start w-full m-auto mt-8 text-2xl font-semibold mb-9">
          Upload 3D model
        </h3>
        <RxCross2
          onClick={closeClickHandler}
          className="absolute p-2 text-4xl bg-white rounded-full shadow-2xl cursor-pointer hover:bg-slate-200 top-2 right-3"
        />

        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div class="flex flex-col items-center justify-center pt-5 px-4 pb-6">
              <AiOutlineCloudUpload className="text-4xl" />
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Only GLB file type
              </p>
              {file && (
                <p className="text-lg font-semibold text-black">
                  {shortenString(file.name, 16)}
                </p>
              )}
            </div>
            <input
              id="dropzone-file"
              class="hidden"
              type="file"
              accept=".glb"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* <input type="file" accept=".glb" onChange={handleFileChange} /> */}
        <div
          className="flex self-end p-2 m-4 font-semibold text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600 w-fit"
          onClick={handleUpload}
        >
          Upload
        </div>
        {uploadProgress > 0 && (
          <div className="flex flex-col gap-2">
            <p>Upload Progress</p>
            <ProgressBar
              completed={uploadProgress}
              customLabel="Uploading..."
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;
