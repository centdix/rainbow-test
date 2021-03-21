import { IconButton, Paper } from "@material-ui/core";
import { SettingsBackupRestoreSharp } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  className?: string;
  children?: any;
  address: string;
  deleteAddress: Function;
}

const AddressItem = ({ address, deleteAddress }) => {
  return (
    <Paper className="flex items-center justify-between p-2 mb-1 font-thin text-sm hover:bg-gray-50 cursor-pointer">
      <p className="w-1/2 overflow-hidden">{address.address}</p>

      <IconButton
        color="primary"
        className="p-4 "
        aria-label="directions"
        onClick={deleteAddress(address.address)}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default AddressItem;
