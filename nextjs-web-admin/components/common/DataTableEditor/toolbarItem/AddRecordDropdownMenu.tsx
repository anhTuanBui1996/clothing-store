import { Menu, Button, PopoverOrigin, TextField } from "@mui/material";
import React from "react";

export interface DropdownMenuProps {
  anchorEl: null | HTMLElement;
  position?: {
    anchorOrigin: PopoverOrigin | undefined;
    transformOrigin: PopoverOrigin | undefined;
  };
  onOkClick?: (v: any) => void;
  onClose?: (
    event: {},
    reason: "escapeKeyDown" | "backdropClick" | "tabKeyDown"
  ) => void;
}

export default function AddRecordDropdownMenu(props: DropdownMenuProps) {
  const { anchorEl, position, onOkClick, onClose } = props;

  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState<number | undefined>(1);

  const handleValueChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setValue(parseInt(e?.target.value || "1"));
  };

  const handleOkButtonClicked = () => {
    if (onOkClick) {
      onOkClick(value);
    }
  };

  return (
    <Menu
      id="toolbar-dropdown-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "toolbar-dropdown-menu",
      }}
      sx={{ textAlign: "end" }}
      anchorOrigin={position?.anchorOrigin}
      transformOrigin={position?.transformOrigin}
    >
      <TextField
        value={value}
        onChange={handleValueChanged}
        label="Amount"
        variant="outlined"
        type="number"
        size="small"
      />
      {onOkClick && (
        <Button
          className="bg-[#1976d2]"
          onClick={handleOkButtonClicked}
          variant="contained"
          sx={{
            textAlign: "center",
            margin: "0 1rem",
            width: "auto",
          }}
        >
          Ok
        </Button>
      )}
    </Menu>
  );
}
