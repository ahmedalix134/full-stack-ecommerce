"use client";
// This component is a temporary drawer for navigation in a Next.js application.
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (!newOpen && buttonRef.current) {
      // Return focus to the hamburger button after closing
      setTimeout(() => buttonRef.current?.focus(), 0);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List className="flex flex-col gap-10 ">
        <ListItem>
          <Link href={"/"}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={"/contact"}>Contact</Link>
        </ListItem>
        <ListItem>
          <Link href={"/about"}>About Us</Link>
        </ListItem>
        <ListItem>
          <Link href={"/men"}>Men</Link>
        </ListItem>
        <ListItem>
          <Link href={"/women"}>Women</Link>
        </ListItem>
        <ListItem>
          <Link href={"/electronics"}>Electronics</Link>
        </ListItem>
        <ListItem>
          <Link href={"/jewelery"}>Jewelery</Link>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="hidden max-md:block ">
      <button
        ref={buttonRef}
        aria-label="Open navigation drawer"
        style={{ background: "none", border: "none", padding: 0 }}
        onClick={toggleDrawer(true)}
      >
        <RxHamburgerMenu style={{ fontSize: "25px", color: "white" }} />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
