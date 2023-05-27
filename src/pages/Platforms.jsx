import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import TableImage from "../components/layout/TableImage";
import PageCreator from "../components/pagecreator";
import { DATETIMEFORMAT } from "../constants";
import useResponsive from "../hooks/useResponsive";
import {
  addPlatform,
  deletePlatform,
  editPlatform,
  getPlatforms,
} from "../redux/actions/platformActions";
import { loadingSelector } from "../redux/reducers/loadingReducer";
import { platformTypes } from "../redux/types";
import { addTableColumnMinWidth } from "../utils/addTableColumnMinWidth";

const Platforms = () => {
  const isMobile = useResponsive("down", "sm");

  // const dispatch = useDispatch();
  const tableHeaders = [
    {
      field: "platformName",
      headerName: "Platform Name",
      type: "string",
      editable: false,
      flex: 1,

      ...addTableColumnMinWidth(isMobile, 100),
    },
    {
      field: "platformImage",
      headerName: "Platform Image",
      type: "string",
      editable: false,
      flex: 1,
      renderCell: (params) => <TableImage src={params.value} />,
      ...addTableColumnMinWidth(isMobile, 70),
    },
    {
      field: "createdBy",
      headerName: "Created By",
      type: "string",
      flex: 0.5,
      editable: false,
      ...addTableColumnMinWidth(isMobile, 100),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      flex: 0.5,
      editable: false,
      valueFormatter: ({ value }) => moment(value).format(DATETIMEFORMAT),
      ...addTableColumnMinWidth(isMobile, 150),
    },
    {
      field: "products",
      headerName: "Product Count",
      flex: 0.5,

      type: "number",

      editable: false,
      valueGetter: ({ row }) => row?.products?.length,
      ...addTableColumnMinWidth(isMobile, 150),
    },
  ];

  const tableData = useSelector((state) => state.common.platforms);

  const isTableLoading = useSelector((state) =>
    loadingSelector(state, platformTypes.GET_PLATFORMS)
  );
  const isFormLoading = useSelector((state) =>
    loadingSelector(state, [
      platformTypes.ADD_PLATFORM,
      platformTypes.UPDATE_PLATFORM,
      platformTypes.DELETE_PLATFORM,
    ])
  );
  return (
    <div>
      <PageCreator
        screenName={"Platforms"}
        tableHeaders={tableHeaders}
        tableData={tableData?.data}
        formFields={formFields}
        searchFields={searchFields}
        defaultFormData={{
          isActive: true,
        }}
        dialogWidth="lg"
        isLoading={isTableLoading}
        isFormLoading={isFormLoading}
        totalCount={tableData?.totalCount}
        // onFormSubmit={onFormSubmit}
        onAdd={addPlatform}
        onEdit={editPlatform}
        onDelete={deletePlatform}
        getTableData={getPlatforms}
        deleteTitle="platformName"
        selectable={!isMobile}
        mobileRowActionColumnWidth={120}
      />
    </div>
  );
};

export default Platforms;

const formFields = [
  {
    type: "text",
    name: "platformName",
    label: "Platform Name",
    placeholder: "Enter Platform Name",
    required: true,
    disabled: false,
    readOnly: false,
    width: 4,
  },

  {
    type: "image",
    name: "platformImage",
    label: "Choose Platform Image",
    placeholder: "Choose Platform Image",
    required: true,
    disabled: false,
    readOnly: false,
    width: 4,
  },

  {
    type: "boolean",
    name: "isActive",
    label: "Status",
    placeholder: "Enter Status",
    required: true,
    disabled: false,
    readOnly: false,
    width: 4,
  },
];
const searchFields = [
  {
    type: "text",
    name: "platformName",
    label: "Platform Name",
    placeholder: "Enter Platform Name",
    required: false,
    disabled: false,
    readOnly: false,
    width: 6,
  },
];
