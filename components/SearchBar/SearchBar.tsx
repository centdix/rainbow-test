import { FC, useState } from "react";
import DirectionsIcon from "@material-ui/icons/Directions";
import AddIcon from "@material-ui/icons/Add";
import { TextField, IconButton } from "@material-ui/core";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import _uniqueId from "lodash/uniqueId";
import newId from "../../utils/newid";

interface Props {
  className?: string;
  children?: any;
  setStartAddress: Function;
  setEndAddress: Function;
  fetchDirections: Function;
  endAddresses: Array<EndAddress>;
}

const center = { lat: 48.85641, lng: 2.3488 };
const defaultBounds = {
  north: center.lat + 0.15,
  south: center.lat - 0.15,
  east: center.lng + 0.15,
  west: center.lng - 0.15,
};

const SearchBar: FC<Props> = ({
  setStartAddress,
  setEndAddress,
  endAddresses,
  fetchDirections,
}) => {
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
    console.log(description);
  };

  const getDirections = () => {
    value === ""
      ? alert("adresse non renseignée")
      : (setStartAddress(value), fetchDirections());
  };

  const setEndAddresses = () => {
    let items = [...endAddresses];
    const id = newId();
    items.push({ id: id, address: value });
    console.log(items);
    value !== "" ? setEndAddress(items) : alert("adresse non renseignée");
  };

  return (
    <>
      <div className="w-full px-2 py-4 flex flex-row items-center ">
        <TextField
          variant="outlined"
          id="start-adress"
          autoComplete="off"
          onChange={handleInput}
          value={value}
          disabled={!ready}
          placeholder="Adresse de départ"
          className="w-11/12"
        />
        <IconButton
          color="primary"
          className="p-4 "
          aria-label="addtolist"
          onClick={setEndAddresses}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="primary"
          className="p-4 "
          aria-label="directions"
          onClick={getDirections}
        >
          <DirectionsIcon />
        </IconButton>
      </div>

      {status === "OK" && (
        <ul className=" w-5/6 px-2 absolute">
          {data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;
            return (
              <li
                className="hover:bg-gray-500 cursor-pointer bg-gray-300"
                key={place_id}
                onClick={handleSelect(suggestion)}
                ref={ref}
              >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
