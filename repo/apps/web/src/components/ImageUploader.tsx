import React from "react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { Paper } from "ui/server";
import ImageCompressor from "browser-image-compression";
import Image from "next/image";

type ImageUploaderProps = {
  onClick: () => void;
  onChange: (result: string | ArrayBuffer | null) => void;
  value: ImageListType | ArrayBuffer | string;
  className?: string;
};

const ImageUploader = ({ ...props }: ImageUploaderProps) => {
  const handleImageUpload = async (imageList) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    try {
      const compressedImage = await ImageCompressor(
        imageList[0]?.file,
        options
      );
      const reader = new FileReader();
      reader.readAsDataURL(compressedImage);
      reader.onloadend = () => {
        props?.onChange(reader?.result);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReactImageUploading
      value={props?.value as ImageListType}
      onChange={handleImageUpload}
      dataURLKey="data_url"
    >
      {({ onImageUpload, dragProps }) => (
        <div className={props?.className + " w-full flex gap-5"}>
          <Paper
            border
            className="flex-auto bg-p-9 dark:bg-p-2 p-5 flex h-48 rounded-lg justify-center items-center"
            onClick={() => {
              props?.onClick();
              onImageUpload();
            }}
            {...dragProps}
          >
            <h6>Cover Photo (optional). Click or Drop here.</h6>
          </Paper>
          {props?.value && (
            <div className="w-1/2">
              <Image
                className="flex-1 rounded-lg object-cover h-48 w-full"
                src={props?.value as string}
                alt="cover photo"
                height="150"
                width="150"
              />
            </div>
          )}
        </div>
      )}
    </ReactImageUploading>
  );
};

export default ImageUploader;
