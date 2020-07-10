import React, { useReducer } from "react";
import PhotoContext from "./photoContext";
import PhotoReducer from "./photoReducer";
import { photoApi } from "../../api/photos/photoApi";
import {
  TOGGLE_PHOTO_CONTAINER,
  SET_SELECTED_PHOTOS,
  UPLOAD_NEW_PHOTO,
  UPDATE_FILTERS,
  SET_NEW_USER_PHOTOS,
  SET_IMAGES_UPLOADING,
} from "../types";
import { PHOTO_METADATA } from "../../api/photos";

const PhotoState = (props) => {
  const initialState = {
    allPhotos: [],
    filteredPhotos: [],
    isPhotoContainerOpen: false,
    imagesUploading: false,
    selectedPhotos: [],
    filterValues: {
      City: [],
      Country: [],
      Labels: [],
    },
  };

  const [state, dispatch] = useReducer(PhotoReducer, initialState);

  const togglePhotoContainer = (isOpen) => {
    dispatch({
      type: TOGGLE_PHOTO_CONTAINER,
      payload: isOpen,
    });
  };

  const setSelectedPhotos = (photos) => {
    dispatch({
      type: SET_SELECTED_PHOTOS,
      payload: photos,
    });
  };

  const setImagesUploading = () => {
    dispatch({
      type: SET_IMAGES_UPLOADING,
    });
  };

  const uploadNewPhotos = (photos) => {
    setImagesUploading();

    Promise.all(
      photos.map((photo) => {
        if (
          JSON.stringify({
            image: photo.photoData,
            name: photo.photoName,
            username: photo.username,
          }).length > 6144000
        ) {
          return {
            data: {
              Error: "Error",
            },
          };
        }

        return photoApi.post(
          "/photo",
          JSON.stringify({
            image: photo.photoData,
            name: photo.photoName,
            username: photo.username,
          })
        );
      })
    ).then((results) => {
      const goodPhotos = results.filter((res) => res.data.Error !== "Error");
      const uploadedPhotos = goodPhotos.map((res) => {
        return "undefined" !== res.data.Error
          ? {
              ...res.data,
              GPSLat: parseFloat(res.data.GPSLat),
              GPSLng: parseFloat(res.data.GPSLng),
              ImageWidth: parseInt(res.data.ImageWidth),
              ImageLength: parseInt(res.data.ImageLength),
            }
          : null;
      });

      console.log(uploadedPhotos);

      dispatch({
        type: UPLOAD_NEW_PHOTO,
        payload: uploadedPhotos,
      });
    });
  };

  const updateFilters = (updatedFilterType, newFilterValues) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: {
        updatedFilterType,
        newFilterValues,
      },
    });
  };

  const setNewUserPhotos = (user) => {
    dispatch({
      type: SET_NEW_USER_PHOTOS,
      payload: !user ? PHOTO_METADATA : user.photos,
    });
  };

  return (
    <PhotoContext.Provider
      value={{
        isPhotoContainerOpen: state.isPhotoContainerOpen,
        selectedPhotos: state.selectedPhotos,
        filteredPhotos: state.filteredPhotos,
        filterValues: state.filterValues,
        imagesUploading: state.imagesUploading,
        togglePhotoContainer,
        setSelectedPhotos,
        uploadNewPhotos,
        updateFilters,
        setNewUserPhotos,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoState;
