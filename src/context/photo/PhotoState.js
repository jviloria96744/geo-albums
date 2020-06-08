import React, { useReducer } from "react";
import PhotoContext from "./photoContext";
import PhotoReducer from "./photoReducer";
import { photoApi } from "../../api/photos/photoApi";
import {
  TOGGLE_PHOTO_CONTAINER,
  SET_SELECTED_PHOTOS,
  UPLOAD_NEW_PHOTO,
  UPDATE_FILTERS,
} from "../types";
import { PHOTO_METADATA } from "../../api/photos";

const PhotoState = (props) => {
  const initialState = {
    allPhotos: PHOTO_METADATA,
    filteredPhotos: PHOTO_METADATA,
    isPhotoContainerOpen: false,
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

  const uploadNewPhoto = async (photoData, name) => {
    const res = await photoApi.post(
      "/upload_photo",
      JSON.stringify({
        image: photoData,
        name: name,
      })
    );

    console.log(res);

    dispatch({
      type: UPLOAD_NEW_PHOTO,
      payload: res.data,
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

  return (
    <PhotoContext.Provider
      value={{
        isPhotoContainerOpen: state.isPhotoContainerOpen,
        selectedPhotos: state.selectedPhotos,
        filteredPhotos: state.filteredPhotos,
        filterValues: state.filterValues,
        togglePhotoContainer,
        setSelectedPhotos,
        uploadNewPhoto,
        updateFilters,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoState;
