import {
  TOGGLE_PHOTO_CONTAINER,
  SET_SELECTED_PHOTOS,
  UPDATE_FILTERS,
  UPLOAD_NEW_PHOTO,
  SET_NEW_USER_PHOTOS,
} from "../types";

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

    case UPLOAD_NEW_PHOTO:
      return {
        ...state,
        allPhotos: !action.payload
          ? [...state.allPhotos, ...action.payload]
          : state.allPhotos,
        filteredPhotos: getFilteredPhotos(
          [...state.allPhotos, ...action.payload],
          state.filterValues
        ),
      };

    case UPDATE_FILTERS:
      const { updatedFilterType, newFilterValues } = action.payload;
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          [updatedFilterType]: [...newFilterValues],
        },
        filteredPhotos: getFilteredPhotos(state.allPhotos, {
          ...state.filterValues,
          [updatedFilterType]: [...newFilterValues],
        }),
      };

    case SET_NEW_USER_PHOTOS:
      return {
        ...state,
        allPhotos: action.payload,
        filteredPhotos: action.payload,
        isPhotoContainerOpen: false,
        selectedPhotos: [],
        filterValues: {
          City: [],
          Country: [],
          Labels: [],
        },
      };
    default:
      return state;
  }
};

const getFilteredPhotos = (photos, filterValues) => {
  return photos.filter((photo) => {
    const filterChecks = Object.keys(filterValues).map((filterType) => {
      let valueArray = filterValues[filterType].map((filter) => filter.value);

      if (valueArray.length === 0) {
        return true;
      }

      return valueArray.filter((x) => photo[filterType].includes(x)).length > 0;
    });

    return filterChecks.every((item) => item);
  });
};
