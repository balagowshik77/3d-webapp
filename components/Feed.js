"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";
import { Context } from "@/context";

const Feed = () => {
  const { uploaded } = useContext(Context);
  const [modelUrls, setModelUrls] = useState([]);

  useEffect(() => {
    //function to fetch models
    const fetchModelUrls = async () => {
      const listRef = ref(storage, "models/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setModelUrls(urls);
    };

    fetchModelUrls();
  }, [uploaded]);
  return (
    <div className="flex flex-col gap-10 px-6 py-4 ">
      <div className="text-2xl font-bold text-black">Uploaded Models</div>
      <div className="grid items-center justify-center w-full grid-cols-3 gap-4">
        {modelUrls.map((url, index) => (
          <div className="">
            <Fragment>
              <model-viewer
                className="w-64 bg-black h-96"
                alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
                src={url}
                ar
                poster="shared-assets/models/NeilArmstrong.webp"
                shadow-intensity="1"
                camera-controls
                touch-action="pan-y"
              ></model-viewer>
            </Fragment>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
