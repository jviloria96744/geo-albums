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
        filteredPhotos: PHOTO_METADATA.filter((photo) => {
          const filterChecks = Object.keys(state.filterValues).map(
            (filterType) => {
              let valueArray = [];
              if (filterType !== updatedFilterType) {
                valueArray = state.filterValues[filterType].map(
                  (filter) => filter.value
                );
              } else {
                valueArray = newFilterValues.map((filter) => filter.value);
              }
              return (
                valueArray.includes(photo[filterType]) ||
                valueArray.length === 0
              );
            }
          );

          return filterChecks.every((item) => item);
        }),
      };
    default:
      return state;
  }
};
