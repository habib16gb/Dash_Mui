import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { inNavList } from "../../main";
import { NavLink } from "react-router-dom";
import { useState } from "react";

interface Props {
  navList: inNavList[];
  open: boolean;
  parentPath?: string;
  className?: string;
  level?: number;
}

const MuiTreeView = ({ navList, open, parentPath = "/", level = 0 }: Props) => {
  const [treeList, setTreeList] = useState(navList);

  const toggleNode = (tree: inNavList[], nodeId: number): inNavList[] => {
    return tree.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          isOpen: !node.isOpen,
        };
      } else if (node.children) {
        return { ...node, children: toggleNode(node.children, nodeId) };
      }
      return node;
    });
  };

  const handleToggle = (nodeId: number) => {
    setTreeList((prevData) => {
      return toggleNode(prevData, nodeId);
    });
  };

  return (
    <List sx={{}}>
      {treeList.map(({ label, children, icon, path, id, isOpen }, index) => {
        return (
          <Box sx={{}} key={index}>
            <NavLink
              key={index}
              className={({ isActive }) =>
                `block capitalize  ${isActive && " text-white bg-blue-500"} `
              }
              onClick={() => handleToggle(id)}
              to={
                path === "/" || parentPath === "/"
                  ? path
                  : `${parentPath}/${path}`
              }
              end
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    width: "100%",
                    color: "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: 30,
                        cursor: "pointer",
                        paddingLeft: open ? level * 2 : 0,
                      }}
                    >
                      {icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            {isOpen && (
              <Box>
                {children && (
                  <MuiTreeView
                    level={level + 1}
                    navList={children}
                    open={open}
                    parentPath={path}
                  />
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </List>
  );
};
export default MuiTreeView;
