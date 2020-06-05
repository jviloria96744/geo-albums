import React, { useContext } from "react";
import { Modal, Button } from "@material-ui/core";
import PhotoContext from "../../context/photo/photoContext";

export const PhotoContainer = () => {
  const photoContext = useContext(PhotoContext);
  const {
    isPhotoContainerOpen,
    togglePhotoContainer,
    selectedPhotos,
  } = photoContext;

  const baseUrl = "https://map-image-test.s3-us-west-2.amazonaws.com/";

  const handleClose = () => {
    togglePhotoContainer(false);
  };

  if (!isPhotoContainerOpen) {
    return null;
  }
  return (
    <Modal open={isPhotoContainerOpen} onClose={() => handleClose(false)}>
      <div>
        <div>
          <Button onClick={() => handleClose(false)}>Close</Button>
        </div>
        {selectedPhotos.map((marker) => {
          return (
            <img
              key={marker.File}
              src={baseUrl + marker.File}
              alt=""
              style={{ height: "400px", width: "600px" }}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default PhotoContainer;
