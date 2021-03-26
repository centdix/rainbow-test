import { FC, useState, useContext } from "react";
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
import { AddressesContext } from '../../pages/index.tsx';
import { DirectionsContext } from '../../pages/index.tsx';

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

const SearchBar: FC<Props> = ({
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

  const { addresses, setAddresses } = useContext(AddressesContext);
  const { directions, setDirections } = useContext(DirectionsContext);

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
  };

  const fetchDirections = async () => {
    if (value === "") {
      alert("adresse non renseignée");
      return ;
    }
    let items = [];
    await Promise.all(addresses.map(async (address) => {
      const origin = address.address;
      const destination = value;
      try {
        let result = await fetchWrapper(origin, destination);
        items.push(result);        
      }
      catch (err) {
        console.log(err);
      }
    }));
    setDirections(items);
  };

  let fetchWrapper = (origin, destination) => new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.TRANSIT,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK)
        resolve(result);
      else
        reject(new Error('fail'));
    });
  })

  const addAddress = () => {
    let items = [...addresses];
    let alreadyExists = items.find((i) => i.address === value);
    if (typeof(alreadyExists) === 'undefined') {
      const id = newId();
      items.push({ id: id, address: value });
      value !== "" ? setAddresses(items) : alert("adresse non renseignée");
    }
  }

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
          onClick={addAddress}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="primary"
          className="p-4 "
          aria-label="directions"
          onClick={fetchDirections}
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
