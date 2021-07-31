import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";

export default function DialogMigrate({
  children,
  disableBackdropClick,
  disableEscapeKeyDown,
  onClose,
  ...rest
}) {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") {
      return false;
    }

    if (disableEscapeKeyDown && reason === "escapeKeyDown") {
      return false;
    }

    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <Dialog onClose={handleClose} {...rest}>
      {children}
    </Dialog>
  );
}
