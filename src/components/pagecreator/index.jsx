import { Card, CardHeader, Button, Divider } from "@mui/material";
import React from "react";
import Iconify from "../layout/iconify/Iconify";
import { DataGrid } from "@mui/x-data-grid";
import FormModal from "../FormModal";
import { FORMMODE } from "../../enums";
import ErrorBoundary from "../ErrorBoundary";
import { useDispatch } from "react-redux";

const PageCreator = ({
  tableData = [],
  tableHeaders = [],
  permission,
  isTabular = true,
  screenName,
  selectable = true,
  enableFilters = false,
  enableColumnMenu = false,
  filterMode = "server",
  isLoading = false,
  onSelect,
  formTitle,
  formFields,
  defaultFormData,
  dialogWidth,
  onFormSubmit,
  modalState,
  setModalState,
  getTableData,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    dispatch(getTableData({ query: paginationModel }));
  }, [paginationModel.page]);

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
        />
        <Card variant="outlined" elevation={0}>
          <CardHeader
            title={screenName}
            action={
              <>
                <AddActions />
              </>
            }
          />
          <Divider />
          {isTabular && (
            <DataGrid
              ref={tableRef}
              autoHeight
              rows={tableData}
              columns={tableHeaders}
              checkboxSelection={selectable}
              disableColumnFilter={!enableFilters}
              disableColumnMenu={!enableColumnMenu}
              disableColumnSelector={true}
              filterMode={filterMode}
              // isCellEditable={() => false}
              // isRowSelectable={() => false}
              loading={isLoading}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                onSelect?.(newRowSelectionModel);
                setSelected(newRowSelectionModel);
              }}
              rowSelectionModel={selected}
              paginationMode="server"
              rowCount={10}
              paginationModel={paginationModel}
              onPaginationModelChange={(paginationModel) => {
                console.log("pagination model", paginationModel);
                setPaginationModel(paginationModel);
              }}
              pageSizeOptions={[10, 20, 30, 100]}
              onSortModelChange={(data) => {
                console.log("onSortModelChange", data);
              }}
              getRowId={(row) => row._id}
            />
          )}
        </Card>
      </>
    </ErrorBoundary>
  );
};

export default PageCreator;
