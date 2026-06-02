"use client";

import { withDelay } from "@/app/utils/common";
import Image from "next/image";
import { useState } from "react";

const ScanForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [inputFile, setInputFile] = useState<File | null>();
  null;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setInputFile(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleReplaceImage = withDelay(() => {
    setInputFile(null);
    setImagePreview(null);
  });

  const handleConfirmImage = () => {};

  return (
    <div className="flexCenter flex-col gap-4">
      {imagePreview && (
        <Image
          alt="scan_preview_image"
          width={200}
          height={200}
          src={imagePreview}
          className="standardBorder"
        />
      )}
      {inputFile ? (
        <div className="flexCenter gap-4">
          <button
            className="standardButton  !bg-lime-200"
            onClick={handleConfirmImage}
          >
            Confirm
          </button>
          <button className="standardButton " onClick={handleReplaceImage}>
            Replace
          </button>
        </div>
      ) : (
        <div>
          <label className="standardButton  cursor-pointer inline-block">
            Add file
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ScanForm;
