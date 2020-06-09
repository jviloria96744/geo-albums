import React, { useContext, Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import PhotoContext from "../../context/photo/photoContext";
import UserContext from "../../context/user/userContext";
import "./ImageUpload.css";

const ImageUpload = () => {
  const photoContext = useContext(PhotoContext);
  const userContext = useContext(UserContext);

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

  if (userContext.user === null) {
    return null;
  }

  return (
    <Fragment>
      <Divider />
      <Typography variant="h6" style={{ marginTop: "3vh" }}>
        Upload Files
      </Typography>
      <ImageUploader
        //{...props}
        withIcon={true}
        onChange={onDrop}
        imgExtension={[".jpg"]}
        maxFileSize={5242880 * 2}
        label="Max file size: 10mb, accepted: jpg"
        className="image-uploader"
      />
    </Fragment>
  );
};

export default ImageUpload;
