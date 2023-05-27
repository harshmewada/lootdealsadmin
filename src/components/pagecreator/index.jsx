import {
  Card,
  CardHeader,
  Button,
  Divider,
  IconButton,
  Stack,
  Hidden,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import Iconify from "../layout/iconify/Iconify";
import { DataGrid } from "@mui/x-data-grid";
import FormModal from "../FormModal";
import { FORMMODE } from "../../enums";
import ErrorBoundary from "../ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../DeleteModal";
import FormCreator from "../FormCreator";
import { useDebounce, useEffectOnce, useTitle } from "react-use";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import SearchDrawerMobile from "../layout/SearchDrawerMobile";
import ActionMenu from "../layout/ActionMenu";
import useResponsive from "../../hooks/useResponsive";

const PageCreator = ({
  tableData = [],
  tableHeaders = [],
  isTabular = true,
  screenName,
  selectable = true,
  enableFilters = false,
  enableColumnMenu = false,
  filterMode = "server",
  isLoading = false,
  isFormLoading = false,
  onSelect,
  formTitle,
  formFields,
  searchFields,
  defaultFormData,
  dialogWidth,

  getTableData,
  onAdd,
  onEdit,
  onDelete,
  totalCount,
  deleteTitle,
  selectOptions,
  toolbarActions,
  rowActions = [],
  mobileToolbarActions = [],
  mobileRowActionColumnWidth = null,
}) => {
  const theme = useTheme();
  const searchFormRef = useRef();
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState([]);
  // const selected = useSelector((state) => state.common.selected);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [, cancel] = useDebounce(
    () => {
      dispatch(getTableData({ query: paginationModel }));
    },
    500,
    [paginationModel, selected]
  );
  const [modalState, setModalState] = React.useState({
    open: false,
    modalData: undefined,
    mode: undefined,
  });
  // useEffectOnce(() => {
  //   dispatch(getTableData({ query: paginationModel }));
  // }, []);

  const onOpenFormModal = ({ mode, data }) =>
    setModalState({ open: true, mode, modalData: data });
  const onCloseFormModal = () =>
    setModalState({ open: false, modalData: undefined, mode: undefined });

  const tableRef = React.useRef();

  const AddActions = ({ data }) => {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<Iconify icon={"eva:plus-circle-outline"} />}
        onClick={() => onOpenFormModal({ mode: FORMMODE.ADD })}
      >
        Add {screenName}
      </Button>
    );
  };
  const EditActions = ({ data }) => {
    return (
      <IconButton
        mode={FORMMODE.EDIT}
        onClick={() => onOpenFormModal({ mode: FORMMODE.EDIT, data: data })}
      >
        <Iconify icon="eva:edit-2-outline" />
      </IconButton>
    );
  };

  const DeleteActions = ({ data }) => {
    return (
      <IconButton
        mode={FORMMODE.DELETE}
        onClick={() => onOpenFormModal({ mode: FORMMODE.DELETE, data: data })}
      >
        <Iconify icon="eva:trash-2-outline" />
      </IconButton>
    );
  };

  const onFormSubmit = (values) => {
    switch (modalState.mode) {
      case FORMMODE.ADD:
        dispatch(
          onAdd({
            data: values,
            callBack: () => {
              dispatch(getTableData({ query: paginationModel }));
              onCloseFormModal();
            },
          })
        );

        break;

      case FORMMODE.EDIT:
        dispatch(
          onEdit({
            data: values,
            callBack: () => {
              dispatch(getTableData({ query: paginationModel }));
              onCloseFormModal();
            },
          })
        );

        break;

      case FORMMODE.DELETE:
        dispatch(
          onDelete({
            data: values,
            callBack: () => {
              dispatch(getTableData({ query: paginationModel }));
              onCloseFormModal();
            },
          })
        );

        break;

      default:
        break;
    }
  };
  useTitle(screenName);
  return (
    <ErrorBoundary>
      <>
        <Hidden mdDown></Hidden>
        <FormModal
          open={modalState.open && modalState.mode !== FORMMODE.DELETE}
          onClose={onCloseFormModal}
          title={`${modalState.mode} ${formTitle || screenName}`}
          onFormSubmit={(values) => onFormSubmit(values)}
          formFields={formFields}
          formData={{ ...defaultFormData, ...modalState.modalData }}
          dialogWidth={dialogWidth || "xl"}
          isLoading={isFormLoading}
          selectOptions={selectOptions}
        />
        <DeleteModal
          open={modalState.open && modalState.mode === FORMMODE.DELETE}
          title={`${modalState?.modalData?.[deleteTitle]}`}
          confirmTitle="Confirm"
          onClose={onCloseFormModal}
          onConfirm={() => onFormSubmit(modalState.modalData)}
          isLoading={isFormLoading}
        />
        <Card variant="outlined" elevation={0}>
          <CardHeader
            title={screenName}
            sx={{
              "& .MuiCardHeader-action": {
                // width: "40%",
                flex: 10,
                [theme.breakpoints.down("md")]: {
                  flex: 10,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                },
              },
            }}
            action={
              <>
                <Hidden mdDown>
                  <Stack
                    justifyContent={"space-between"}
                    direction="row"
                    alignItems={"center"}
                    // sx={{
                    //   backgroundColor: (theme) => theme.palette.primary.main,
                    //   width: "100%",
                    // }}
                  >
                    <Box display={"flex"} justifyContent="flex-end">
                      {searchFields && (
                        <FormCreator
                          ref={searchFormRef}
                          formFields={searchFields}
                          isSearchForm={true}
                          onSubmit={(val) => {
                            setPaginationModel({
                              ...paginationModel,
                              ...val,
                            });
                          }}
                        />
                      )}
                    </Box>
                    <Stack direction={"row"} spacing={2}>
                      {toolbarActions &&
                        toolbarActions.map((El) => (
                          <El
                            selected={selected}
                            setSelected={setSelected}
                            modalState={modalState}
                            setModalState={setModalState}
                            getterFunction={() =>
                              dispatch(getTableData({ query: paginationModel }))
                            }
                          />
                        ))}
                      {onAdd && <AddActions />}
                    </Stack>
                  </Stack>
                </Hidden>

                <Hidden smUp>
                  <Stack
                    justifyContent={"space-between"}
                    direction="row"
                    alignItems={"center"}
                  >
                    {searchFields && (
                      <SearchDrawerMobile
                        ref={searchFormRef}
                        onClearSearch={() =>
                          setPaginationModel({
                            page: 0,
                            pageSize: 10,
                          })
                        }
                      >
                        <FormCreator
                          ref={searchFormRef}
                          formFields={searchFields}
                          isSearchForm={false}
                          onSubmit={(val) => {
                            setPaginationModel({
                              ...paginationModel,
                              ...val,
                            });
                          }}
                        />
                      </SearchDrawerMobile>
                    )}

                    <ActionMenu
                      data={[
                        {
                          label: `Add ${screenName}`,
                          icon: "eva:plus-circle-outline",
                          onClick: () =>
                            onOpenFormModal({ mode: FORMMODE.ADD }),
                        },

                        ...mobileToolbarActions.map((el) => {
                          return {
                            ...el,
                            ...(el.hasGetterFn && {
                              onClick: (d) =>
                                el.onClick({
                                  data: d,
                                  getterFunction: () =>
                                    dispatch(
                                      getTableData({ query: paginationModel })
                                    ),
                                  selected,
                                  setSelected: setSelected,
                                  modalState,
                                  setModalState,
                                }),
                            }),
                          };
                        }),
                      ]}
                    />
                  </Stack>
                </Hidden>
              </>
            }
          />
          <Divider />
          {isTabular && (
            <DataGrid
              ref={tableRef}
              autoHeight
              rows={tableData}
              // sx={{ width: "100%" }}

              columns={[
                ...tableHeaders,
                {
                  field: "actions",
                  type: "actions",
                  label: "Actions",
                  flex: 1,
                  getActions: (params) => [
                    <EditActions data={params.row} />,
                    <DeleteActions data={params.row} />,
                    ...rowActions.map((El) => <El data={params.row} />),
                  ],

                  ...(mobileRowActionColumnWidth && {
                    minWidth: mobileRowActionColumnWidth,
                  }),
                },
              ]}
              checkboxSelection={selectable}
              disableColumnFilter={!enableFilters}
              disableColumnMenu={!enableColumnMenu}
              disableColumnSelector={true}
              filterMode={filterMode}
              loading={isLoading}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                onSelect?.(newRowSelectionModel);
                setSelected(newRowSelectionModel);
              }}
              rowSelectionModel={selected}
              paginationMode="server"
              rowCount={totalCount || 10}
              paginationModel={paginationModel}
              onPaginationModelChange={(paginationModel) => {
                setPaginationModel(paginationModel);
              }}
              pageSizeOptions={[10, 20, 30, 100]}
              onSortModelChange={(data) => {}}
              getRowId={(row) => row._id}
            />
          )}
        </Card>
      </>
    </ErrorBoundary>
  );
};

export default PageCreator;

const styles = {
  actions: {
    width: "500px",
  },
};
