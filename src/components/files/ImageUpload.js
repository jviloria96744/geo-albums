import React, { useContext, Fragment } from "react";
import { Typography, Divider } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import PhotoContext from "../../context/photo/photoContext";
import UserContext from "../../context/user/userContext";
import "./ImageUpload.css";

const ImageUpload = () => {
  const photoContext = useContext(PhotoContext);
  const userContext = useContext(UserContext);

  const onDrop = async (photos) => {
    let photoObjects = [];
    for (let index = 0; index < photos.length; index++) {
      const photo = photos[index];
      const photoData = await readUploadedImage(photo);
      photoObjects.push({
        photoData: photoData,
        photoName: photo.name,
        username: userContext.user.username,
      });
    }

    photoContext.uploadNewPhotos(photoObjects);
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
