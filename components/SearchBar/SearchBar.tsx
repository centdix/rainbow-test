import { FC, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, TextField } from "@material-ui/core";

interface Props {
  className?: string;
  children?: any;
}

const SearchBar: FC<Props> = ({}) => {
  return (
    <TextField
      id="outlined-basic"
      label="Adresse de départ"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      style={{ width: "100%" }}
    />
  );
};

export default SearchBar;
