import { AddressItem } from "../AddressItem";

interface Props {
  className?: string;
  children?: any;
  addressList: Array<EndAddress>;
  deleteAddress: Function;
}

const AddressList = ({ addressList, deleteAddress }) => {
  return addressList.map((address, index) => (
    <AddressItem key={index} address={address} deleteAddress={deleteAddress} />
  ));
};

export default AddressList;
