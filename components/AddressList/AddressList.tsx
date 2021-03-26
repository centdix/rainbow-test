import { AddressItem } from "../AddressItem";
import { AddressesContext } from '../../pages/index.tsx';
import { useContext } from "react";

interface Props {
  className?: string;
  children?: any;
}

const AddressList = () => {
	const { addresses, setAddresses } = useContext(AddressesContext);

  const deleteAddress = (address) => () => {
    setAddresses(
      addresses.filter((addressItem) => addressItem.address !== address)
    );
  };

  return addresses.map((address, index) => (
    <AddressItem key={index} address={address} deleteAddress={deleteAddress} />
  ));
};

export default AddressList;
