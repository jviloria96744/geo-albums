import React, { useReducer } from "react";
import PhotoContext from "./photoContext";
import PhotoReducer from "./photoReducer";
import { TOGGLE_PHOTO_CONTAINER, SET_SELECTED_PHOTOS } from "../types";

const PhotoState = (props) => {
  const initialState = {
    isPhotoContainerOpen: false,
    selectedPhotos: [],
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

  return (
    <PhotoContext.Provider
      value={{
        isPhotoContainerOpen: state.isPhotoContainerOpen,
        selectedPhotos: state.selectedPhotos,
        togglePhotoContainer,
        setSelectedPhotos,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoState;
