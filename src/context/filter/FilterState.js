import React, { useReducer } from "react";
import FilterContext from "./filterContext";
import FilterReducer from "./filterReducer";
import { UPDATE_FILTERS } from "../types";
import { PHOTO_METADATA } from "../../api/photos";

const FilterState = (props) => {
  const initialState = {
    filteredPhotos: PHOTO_METADATA,
    filterValues: {
      City: [],
      Country: [],
      Labels: [],
    },
  };

  const [state, dispatch] = useReducer(FilterReducer, initialState);

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
    <FilterContext.Provider
      value={{
        filteredPhotos: state.filteredPhotos,
        filterValues: state.filterValues,
        updateFilters: updateFilters,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;
