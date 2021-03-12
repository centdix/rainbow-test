import { FC, useEffect, useCallback, useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import DirecionsIcon from "@material-ui/icons/Directions";
import MenuIcon from "@material-ui/core/Menu";
import DirectionsIcon from "@material-ui/icons/Directions";
import {
  InputAdornment,
  InputBase,
  TextField,
  IconButton,
  Divider,
  Paper,
} from "@material-ui/core";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

interface Props {
  className?: string;
  children?: any;
}

const center = { lat: 48.85641, lng: 2.3488 };
const defaultBounds = {
  north: center.lat + 0.15,
  south: center.lat - 0.15,
  east: center.lng + 0.15,
  west: center.lng - 0.15,
};

const SearchBar: FC<Props> = ({}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyABF6S20JPVTeR78NHd7htMhBJ6EBqP2PE",
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      bounds: defaultBounds,
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div className="w-full">
      <Paper
        component="form"
        className="px-2 py-4 flex items-center w-full"
        ref={ref}
      >
        <IconButton className="p-10" aria-label="menu">
          <MenuIcon open={false} />
        </IconButton>
        <TextField
          variant="outlined"
          id="start-adress"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Adresse de départ"
          className="w-5/6"
        />
        <IconButton
          color="primary"
          className="m-10 p-10"
          aria-label="directions"
        >
          <DirectionsIcon />
        </IconButton>
      </Paper>
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default SearchBar;
