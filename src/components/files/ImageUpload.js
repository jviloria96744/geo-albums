import React from "react";
import ImageUploader from "react-images-upload";
import { photoApi } from "../../api/photos/photoApi";
import "./ImageUpload.css";

const ImageUpload = () => {
  const onDrop = (photos) => {
    console.log(photos);
    photos.map((photo) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        //Sending image as base 64 string
        photoApi.post(
          "/upload_photo",
          JSON.stringify({
            data: reader.result,
            name: photo.name,
          })
        );
        return null;
      };
      reader.readAsDataURL(photo);
      return null;
    });
  };

  return (
    <ImageUploader
      //{...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg"]}
      maxFileSize={5242880 * 2}
      label="Max file size: 10mb, accepted: jpg"
      className="image-uploader"
    />
  );
};

export default ImageUpload;
