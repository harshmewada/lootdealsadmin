import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import React from "react";
import useDisclosure from "../../../hooks/useDisclosure";
import Iconify from "../iconify/Iconify";

const ActionMenu = ({ data = [] }) => {
  const { isOpen, data: anchorEl, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton onClick={(e) => onOpen(e.currentTarget)}>
        <Iconify icon="eva:more-vertical-outline" />
      </IconButton>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={onClose}>
        <MenuList dense>
          {data.map((d) => (
            <MenuItem key={d.label} onClick={d?.onClick}>
              {d.icon && (
                <ListItemIcon>
                  <Iconify icon={d.icon} size={20} />
                </ListItemIcon>
              )}
              <ListItemText>{d.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default ActionMenu;
