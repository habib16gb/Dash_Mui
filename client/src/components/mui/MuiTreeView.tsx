import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { inNavList } from "../../main";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
  navList: inNavList[];
  open: boolean;
  parentPath?: string;
}

const MuiTreeView = ({ navList, open, parentPath = "/" }: Props) => {
  const [treeList, setTreeList] = useState(navList);

  const toggleNode = (tree: inNavList[], nodeId: number) => {
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
    <List>
      {treeList.map(({ label, children, icon, path, id, isOpen }, index) => {
        return (
          <Box key={index}>
            <Link
              onClick={() => handleToggle(id)}
              to={
                path === "/" || parentPath === "/"
                  ? path
                  : `${parentPath}/${path}`
              }
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    width: "100%",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ fontSize: 30, cursor: "pointer" }}>{icon}</Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            {isOpen && (
              <Box>
                {children && (
                  <Box sx={{ paddingLeft: open ? 2 : 0 }}>
                    <MuiTreeView
                      navList={children}
                      open={open}
                      parentPath={path}
                    />
                  </Box>
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
