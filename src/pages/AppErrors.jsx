import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import TableImage from "../components/layout/TableImage";
import PageCreator from "../components/pagecreator";
import { DATETIMEFORMAT } from "../constants";
import useResponsive from "../hooks/useResponsive";
import { loadingSelector } from "../redux/reducers/loadingReducer";
import { categoryTypes } from "../redux/types";
import { addTableColumnMinWidth } from "../utils/addTableColumnMinWidth";
import { getAppErrors } from "../redux/actions/appErrorActions";

const AppErrors = () => {
  const isMobile = useResponsive("down", "sm");

  // const dispatch = useDispatch();
  const tableHeaders = [
    {
      field: "message",
      headerName: "Error Message",
      type: "string",
      editable: false,
      flex: 1,
      ...addTableColumnMinWidth(isMobile, 100),
    },
    {
      field: "deviceName",
      headerName: "Device Name",
      type: "string",
      editable: false,
      flex: 0.5,
      ...addTableColumnMinWidth(isMobile, 100),
    },

    {
      field: "brand",
      headerName: "Device Brand",
      type: "string",
      editable: false,
      flex: 0.5,
      ...addTableColumnMinWidth(isMobile, 100),
    },
    {
      field: "buildNumber",
      headerName: "Build Number",
      type: "string",
      editable: false,
      flex: 0.5,
      ...addTableColumnMinWidth(isMobile, 100),
    },

    {
      field: "error",
      headerName: "Error",
      type: "string",
      editable: false,
      flex: 1,
      ...addTableColumnMinWidth(isMobile, 100),
    },
    // {
    //   field: "deviceName",
    //   headerName: " Image",
    //   type: "string",
    //   editable: false,
    //   flex: 0.5,
    //   renderCell: (params) => <TableImage src={params.value} />,
    //   ...addTableColumnMinWidth(isMobile, 70),
    // },
    // {
    //   field: "enableNotification",
    //   headerName: "Enable Notification",
    //   type: "boolean",
    //   editable: false,
    //   flex: 1,
    //   ...addTableColumnMinWidth(isMobile, 150),
    // },

    // {
    //   field: "showInHomepage",
    //   headerName: "Show in Home ",
    //   type: "boolean",
    //   editable: false,
    //   flex: 1,
    //   ...addTableColumnMinWidth(isMobile, 150),
    // },

    // {
    //   field: "createdBy",
    //   headerName: "Created By",
    //   type: "string",
    //   flex: 0.5,
    //   editable: false,
    //   ...addTableColumnMinWidth(isMobile, 100),
    // },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      flex: 0.5,
      editable: false,
      valueFormatter: ({ value }) => moment(value).format(DATETIMEFORMAT),
      ...addTableColumnMinWidth(isMobile, 150),
    },
    // {
    //   field: "products",
    //   headerName: "Product Count",
    //   flex: 0.5,

    //   type: "number",

    //   editable: false,
    //   valueGetter: ({ row }) => row?.products?.length,
    //   ...addTableColumnMinWidth(isMobile, 150),
    // },
  ];

  const tableData = useSelector((state) => state.common.appErrors);

  const isTableLoading = useSelector((state) =>
    loadingSelector(state, categoryTypes.GET_CATEGORYS)
  );

  return (
    <div>
      <PageCreator
        screenName={"App Errors"}
        tableHeaders={tableHeaders}
        tableData={tableData?.data}
        formFields={null}
        searchFields={searchFields}
        defaultFormData={{
          isActive: true,
          enableNotification: false,
          showInHomepage: false,
        }}
        dialogWidth="lg"
        isLoading={isTableLoading}
        isFormLoading={false}
        totalCount={tableData?.totalCount}
        isTableViewOnly={true}
        // onFormSubmit={onFormSubmit}

        getTableData={getAppErrors}
        selectable={false}
        mobileRowActionColumnWidth={120}
      />
    </div>
  );
};

export default AppErrors;

const searchFields = [
  {
    type: "text",
    name: "categoryName",
    label: "Category Name",
    placeholder: "Enter Category Name",
    required: false,
    disabled: false,
    readOnly: false,
    width: 6,
  },
];
