import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import Image from "next/image";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
  thumbnail_url: string;
  url: string;
}

interface ImageUploadProps {
  setCoverImage: React.Dispatch<React.SetStateAction<string>>;
  setThumbNail: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setCoverImage,
  setThumbNail,
}) => {
  const [publicId, setPublicId] = useState("");
  const [secureUrl, setSecureUrl] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="flex flex-col space-y-2 w-full md:flex-1">
      <label
        htmlFor="imageUrl"
        id="imageUrl"
        className="text-sm text-slate-600"
      >
        Image Upload
      </label>
      {publicId && <Image src={url} width={270} height={180} alt="Image" />}
      <CldUploadWidget
        uploadPreset="nah8zwf4"
        options={{
          sources: ["local", "camera"],
          multiple: false,
          maxFiles: 5,
          // showAdvancedOptions: true,
          folder: "musa-blog",
        }}
        onUpload={(result) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
          setCoverImage(info.secure_url); // Set the imageUrl using the public_id
          setSecureUrl(info.secure_url); // Set the imageUrl using the public_id
          setThumbNail(info.thumbnail_url); // Set the imageUrl using the public_id
          setUrl(info.url); // Set the imageUrl using the public_id
        }}
      >
        {({ open }) => (
          <button
            className=" py-2 border border-blue-700 text-blue-700 font-bold rounded-xl"
            onClick={() => open()}
            type="button"
          >
            Upload Product Image
          </button>
        )}
      </CldUploadWidget>
      <p className="text-red-600 text-xs font-extralight">
        {/* Add validation/error messages here if needed */}
      </p>
    </div>
  );
};

export default ImageUpload;
