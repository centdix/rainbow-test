import { SearchBar } from "@components/SearchBar";
import { FC, useRef, useEffect } from "react";

interface Props {
  className?: string;
  children?: any;
}

const Controls: FC<Props> = ({}) => {
  return (
    <div
      id="controls"
      className="w-1/6 p-4 absolute left-0 top-0 bottom-0 z-10 bg-white min-w-90 lg:min-w-25 "
    >
      <SearchBar />
    </div>
  );
};

export default Controls;
