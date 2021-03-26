import { SearchBar } from "@components/SearchBar";
import { IconButton } from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";
import { FC, useRef, useEffect, useState, useContext } from "react";
import { DirectionsService } from "google-map-react";
import { AddressList } from "../AddressList";
import { CodeSharp, MapSharp } from "@material-ui/icons";

interface Props {
  className?: string;
  children?: any;
}

const Controls: FC<Props> = () => {

  return (
    <div
      id="controls"
      className="w-1/6 p-4 absolute left-0 top-0 bottom-0 z-10 bg-white min-w-90 lg:min-w-25 "
    >
      <SearchBar />
      <AddressList />
    </div>
  );
};

export default Controls;
