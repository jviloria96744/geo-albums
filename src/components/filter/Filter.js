import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PhotoContext from "../../context/photo/photoContext";

/**
 *
 * Component for Photo Filters, filters exist for city, country, and photo content, e.g. food, architecture
 */

export const Filter = ({ filterType, filterLabel }) => {
  const [searchOptions, setsearchOptions] = useState([]);

  const photoContext = useContext(PhotoContext);
  const { filteredPhotos, filterValues, updateFilters } = photoContext;

  const getOptions = () => {
    let filterOptions = [];
    filteredPhotos.map((photo) => {
      filterOptions = [...filterOptions, ...photo[filterType]];
      return null;
    });

    filterOptions = [...new Set(filterOptions)].sort();
    return filterOptions.map((option) => {
      return { Label: option, value: option };
    });
  };

  useEffect(() => {
    setsearchOptions(getOptions());
    // eslint-disable-next-line
  }, [filteredPhotos]);

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
  /**
   * Filter Type used to access data from the API response
   */
  filterType: PropTypes.string.isRequired,
  /**
   * Filter Label that is displayed in the UI
   */
  filterLabel: PropTypes.string.isRequired,
};

export default Filter;
