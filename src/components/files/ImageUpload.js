import React, { useContext, Fragment } from "react";
import { Typography, Divider, CircularProgress } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import PhotoContext from "../../context/photo/photoContext";
import UserContext from "../../context/user/userContext";
import "./ImageUpload.css";

/**
 *
 * Component for uploading images
 */

const ImageUpload = () => {
  const photoContext = useContext(PhotoContext);
  const { uploadNewPhotos, imagesUploading } = photoContext;
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const onDrop = async (photos) => {
    let photoObjects = [];
    for (let index = 0; index < photos.length; index++) {
      const photo = photos[index];
      const photoData = await readUploadedImage(photo);
      photoObjects.push({
        photoData: photoData,
        photoName: photo.name,
        username: user.username,
      });
    }

    uploadNewPhotos(photoObjects);
  };

  const readUploadedImage = (image) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        //console.log("Done reading");
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(image);
    });
  };

  if (user === null) {
    return null;
  }

  if (imagesUploading) {
    return (
      <div style={{ marginTop: "1vh", marginLeft: "9vh" }}>
        <CircularProgress size={150} color="primary" />
      </div>
    );
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
        maxFileSize={5120000}
        label="Max file size: 5mb, accepted: jpg"
        className="image-uploader"
      />
    </Fragment>
  );
};

export default ImageUpload;
