import {
  Card,
  CardHeader,
  Button,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useRef } from "react";
import Iconify from "../layout/iconify/Iconify";
import { DataGrid } from "@mui/x-data-grid";
import FormModal from "../FormModal";
import { FORMMODE } from "../../enums";
import ErrorBoundary from "../ErrorBoundary";
import { useDispatch } from "react-redux";
import DeleteModal from "../DeleteModal";
import FormCreator from "../FormCreator";
import { useDebounce, useEffectOnce } from "react-use";
import { Box } from "@mui/system";

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
}) => {
  const searchFormRef = useRef();
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState([]);

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
  return (
    <ErrorBoundary>
      <>
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
              },
            }}
            action={
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
                      <El selected={selected} setSelected={setSelected} />
                    ))}
                  {onAdd && <AddActions />}
                </Stack>
              </Stack>
            }
          />
          <Divider />
          {isTabular && (
            <DataGrid
              ref={tableRef}
              autoHeight
              rows={tableData}
              columns={[
                ...tableHeaders,
                {
                  field: "actions",
                  type: "actions",
                  label: "Actions",
                  getActions: (params) => [
                    <EditActions data={params.row} />,
                    <DeleteActions data={params.row} />,
                  ],
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
