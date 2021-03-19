import { SearchBar } from "@components/SearchBar";
import { IconButton } from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";
import { FC, useRef, useEffect, useState } from "react";
import { DirectionsService } from "google-map-react";
import { AddressList } from "../AddressList";

interface Props {
  className?: string;
  children?: any;
  setDirections: Function;
}

const Controls: FC<Props> = ({}) => {
  const [startAddress, setStartAddress] = useState(null);
  const [endAddresses, setEndAddress] = useState(new Array<EndAddress>());
  const fetchDirections = async () => {};
  const deleteAddress = (address) => () => {
    console.log(address);
    setEndAddress(
      endAddresses.filter((addressItem) => addressItem.address !== address)
    );
  };
  return (
    <div
      id="controls"
      className="w-1/6 p-4 absolute left-0 top-0 bottom-0 z-10 bg-white min-w-90 lg:min-w-25 "
    >
      <SearchBar
        setStartAddress={setStartAddress}
        endAddresses={endAddresses}
        setEndAddress={setEndAddress}
      />
      <AddressList addressList={endAddresses} deleteAddress={deleteAddress} />
    </div>
  );
};

export default Controls;
