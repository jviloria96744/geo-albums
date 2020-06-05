import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
//import { PHOTO_METADATA } from "../../api/photos";
import FilterContext from "../../context/filter/filterContext";

export const Filter = ({ filterType, filterLabel }) => {
  const [searchOptions, setsearchOptions] = useState([]);

  const filterContext = useContext(FilterContext);
  const { filteredPhotos, filterValues, updateFilters } = filterContext;

  const getOptions = () => {
    let filterOptions = [];
    filteredPhotos.map((photo) => {
      if (filterType !== "Labels") {
        filterOptions = [...filterOptions, photo[filterType]];
      } else {
        filterOptions = [...filterOptions, ...photo[filterType]];
      }

      return null;
    });
    filterOptions = [...new Set(filterOptions)];
    filterOptions.sort();
    return filterOptions.map((option) => {
      return { Label: option, value: option };
    });
  };

  useEffect(() => {
    setsearchOptions(getOptions());
    // eslint-disable-next-line
  }, []);

  return (
    <Autocomplete
      style={{ marginTop: "3vh" }}
      multiple
      options={searchOptions}
      getOptionLabel={(option) => option.Label}
      value={filterValues[filterType]}
      onChange={(event, newValue) => {
        updateFilters(filterType, newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={filterLabel} />
      )}
    />
  );
};

Filter.propTypes = {
  filterType: PropTypes.string.isRequired,
  filterLabel: PropTypes.string.isRequired,
};

export default Filter;
