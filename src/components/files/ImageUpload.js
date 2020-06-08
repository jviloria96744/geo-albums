import React, { useContext } from "react";
import ImageUploader from "react-images-upload";
import PhotoContext from "../../context/photo/photoContext";
import "./ImageUpload.css";

const ImageUpload = () => {
  const photoContext = useContext(PhotoContext);

  const onDrop = (photos) => {
    photos.map((photo) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () =>
        photoContext.uploadNewPhoto(reader.result, photo.name);

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
