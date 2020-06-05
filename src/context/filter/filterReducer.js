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

              let filterIntersection = valueArray.filter((x) =>
                photo[filterType].includes(x)
              );

              return filterIntersection.length > 0 || valueArray.length === 0;
            }
          );

          if (photo.City.includes("Athens")) {
            console.log(photo);
            console.log(filterChecks);
          }

          return filterChecks.every((item) => item);
        }),
      };
    default:
      return state;
  }
};
