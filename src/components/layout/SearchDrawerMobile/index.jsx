import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Drawer,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import useDisclosure from "../../../hooks/useDisclosure";
import Iconify from "../iconify/Iconify";

const SearchDrawerMobile = React.forwardRef(
  ({ children, onClearSearch }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <IconButton onClick={onOpen}>
          <Iconify icon="eva:search-outline" />
        </IconButton>
        <Drawer anchor={"top"} open={isOpen} onClose={onClose}>
          <Card>
            <CardHeader
              title="Search"
              sx={{
                padding: (theme) => theme.spacing(2),
              }}
              action={
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                    color: (theme) => theme.palette.grey[700],
                  }}
                >
                  <Iconify icon="eva:close-circle-outline" width={30} />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>{children}</CardContent>
            <Divider />
            <CardActions
              sx={{
                padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)}`,
              }}
            >
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent="flex-end"
                sx={{ flex: 1 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    onClearSearch();
                    onClose();
                  }}
                >
                  Clear Search
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Close
                </Button>
                <LoadingButton
                  loading={false}
                  variant="contained"
                  startIcon={
                    <Iconify
                      icon="eva:search-outline"
                      width={20}
                      color="white"
                    />
                  }
                  onClick={() => {
                    ref.current.click();
                    onClose();
                  }}
                >
                  Search
                </LoadingButton>
              </Stack>
            </CardActions>
          </Card>
        </Drawer>
      </>
    );
  }
);

export default SearchDrawerMobile;
