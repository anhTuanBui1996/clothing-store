import { Menu, Button, PopoverOrigin, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState<string | undefined>("1");

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 352);
    }
  }, [open, inputRef.current]);

  const handleValueChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setValue(e?.target.value);
  };

  const handleOkButtonClicked = () => {
    if (onOkClick) {
      value && onOkClick(parseInt(value));
    }
  };

  const handleEnterKeyboardPressedWhenFocusingInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (onOkClick) {
      if (e.key === "Enter") {
        value && onOkClick(parseInt(value));
      }
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
      sx={{
        "& .MuiMenu-list": {
          paddingLeft: 1,
          paddingRight: 1,
        },
      }}
      anchorOrigin={position?.anchorOrigin}
      transformOrigin={position?.transformOrigin}
    >
      <TextField
        inputRef={inputRef}
        value={value}
        onChange={handleValueChanged}
        onKeyUp={handleEnterKeyboardPressedWhenFocusingInput}
        placeholder="1"
        label="Amount"
        variant="outlined"
        type="number"
        size="small"
        sx={{ width: "100px" }}
      />
      {onOkClick && (
        <Button
          className="bg-[#1976d2]"
          onClick={handleOkButtonClicked}
          variant="contained"
          sx={{
            textAlign: "center",
            width: "auto",
            marginLeft: 1,
          }}
        >
          Ok
        </Button>
      )}
    </Menu>
  );
}
