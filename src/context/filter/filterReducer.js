import { UPDATE_FILTERS } from "../types";
import { PHOTO_METADATA } from "../../api/photos";

export default (state, { type, payload }) => {
  const { updatedFilterType, newFilterValues } = payload;
  switch (type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          [updatedFilterType]: [...newFilterValues],
        },
        filteredPhotos: getFilteredPhotos(
          state,
          newFilterValues,
          updatedFilterType
        ),
      };
    default:
      return state;
  }
};

const getFilteredPhotos = (state, newFilterValues, updatedFilterType) => {
  const { filterValues } = state;

  return PHOTO_METADATA.filter((photo) => {
    const filterChecks = Object.keys(filterValues).map((filterType) => {
      let valueArray =
        filterType !== updatedFilterType
          ? filterValues[filterType].map((filter) => filter.value)
          : newFilterValues.map((filter) => filter.value);

      if (valueArray.length === 0) {
        return true;
      }

      return valueArray.filter((x) => photo[filterType].includes(x)).length > 0;
    });

    return filterChecks.every((item) => item);
  });
};
