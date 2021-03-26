import Map from "@components/Map";
import Controls from "@components/Controls";
import React from "react";
import { useState } from "react";

export const DirectionsContext = React.createContext({
	directions: [],
	setDirections: () => {}
});
export const AddressesContext = React.createContext({
	addresses: [],
	setAddresses: () => {}
});

export default function Home() {

	const [directions, setDirections] = useState([]);
	const [addresses, setAddresses] = useState([]);

  return (
    <>
    	<div className="flex flex-row font-sans">
	      <DirectionsContext.Provider value={{directions, setDirections}}>
		      <AddressesContext.Provider value={{addresses, setAddresses}}>
		        <Controls/>
		        <Map/>
		      </AddressesContext.Provider>
	      </DirectionsContext.Provider>
	     </div>
    </>
  );
}
