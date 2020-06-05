import { TOGGLE_PHOTO_CONTAINER, SET_SELECTED_PHOTOS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_PHOTO_CONTAINER:
      return {
        ...state,
        isPhotoContainerOpen: action.payload,
        selectedPhotos: action.payload ? state.selectedPhotos : [],
      };

    case SET_SELECTED_PHOTOS:
      return {
        ...state,
        selectedPhotos: action.payload,
      };
    default:
      return state;
  }
};
