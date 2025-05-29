"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{ color: "white", padding: "0" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span className="btn capitalize ">Categories</span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href={"/men"}>Men</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={"/women"}>Women</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={"/jewelery"}>Jewelery</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={"/electronics"}>Electronics</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
