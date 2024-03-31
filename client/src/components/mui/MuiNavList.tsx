import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { DashContext, tyDashContext } from "../../App";
import { inNavList } from "../../main";

interface Props {
  nav: inNavList;
}

const MuiNavList = ({ nav }: Props) => {
  const { open } = useContext(DashContext) as tyDashContext;
  return (
    <ListItem
      className='pl-0 bg-red-300'
      disablePadding
      sx={{ display: "block" }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          // justifyContent: open ? "initial" : "center",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <span className='text-3xl cursor-pointer mx-4 text-wrap'>
            {nav.icon}
          </span>
        </ListItemIcon>
        <ListItemText primary={nav.label} />
      </ListItemButton>
    </ListItem>
  );
};

export default MuiNavList;
