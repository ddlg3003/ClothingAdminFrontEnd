import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const CancelOrderDialog = ({ onClose, open, orderId, handleConfirmCancelOrder }) => {

  const handleClose = () => {
    onClose();
  };

//   const [deleteAddress] = useDeleteAddressMutation();

//   const handleConfirmClick = async () => {
//     await deleteAddress(id);
//     onClose();
//   };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận hủy đơn hàng?"}
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{ mb: 1 }}
            onClick={handleClose}
          >
            Trở lại
          </Button>
          <Button
            sx={{ mb: 1 }}
            onClick={() => handleConfirmCancelOrder(orderId)}
          >
            Hủy đơn hàng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CancelOrderDialog;
