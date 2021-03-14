interface Props {
  className?: string;
  children?: any;
  addressList: Array<EndAddress>;
}

const AddressList = ({ addressList }) => {
  console.log(addressList);
  return addressList.map((address, index) => (
    <div key={index}>{address.address}</div>
  ));
};

export default AddressList;
