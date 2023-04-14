import { IconButton } from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../components/layout/iconify/Iconify";
import TableImage from "../components/layout/TableImage";
import PageCreator from "../components/pagecreator";
import { DATETIMEFORMAT } from "../constants";
import { FORMMODE } from "../enums";
import { addPlatform, getPlatforms } from "../redux/actions/platformActions";

const Platforms = () => {
  const dispatch = useDispatch();
  const tableHeaders = [
    {
      field: "platformName",
      headerName: "Platform Name",
      type: "string",
      editable: false,
      flex: 1,
    },
    {
      field: "platformImage",
      headerName: "Platform Image",
      type: "string",
      editable: false,
      flex: 1,
      renderCell: (params) => <TableImage src={params.value} />,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      type: "string",
      flex: 0.5,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      flex: 0.5,
      editable: false,
      valueFormatter: ({ value }) => moment(value).format(DATETIMEFORMAT),
    },
    {
      field: "products",
      headerName: "Product Count",
      flex: 0.5,

      type: "number",

      editable: false,
      valueGetter: ({ row }) => row?.products?.length,
    },

    {
      field: "actions",
      type: "actions",
      label: "Actions",
      getActions: (params) => [
        <IconButton mode={FORMMODE.EDIT}>
          <Iconify icon="eva:edit-2-outline" />
        </IconButton>,
        <IconButton mode={FORMMODE.DELETE}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>,
      ],
    },
  ];

  const tableData = useSelector((state) => state.common.platforms);
  const [modalState, setModalState] = React.useState({
    open: false,
    modalData: undefined,
    mode: undefined,
  });
  const onFormSubmit = (values) => {
    console.log("onFormSubmit", values);
    dispatch(addPlatform(values));
  };
  return (
    <div>
      <PageCreator
        screenName={"Platforms"}
        tableHeaders={tableHeaders}
        tableData={[...tableData]}
        formFields={formFields}
        defaultFormData={{
          isActive: true,
        }}
        dialogWidth="lg"
        modalState={modalState}
        onFormSubmit={onFormSubmit}
        setModalState={setModalState}
        getTableData={getPlatforms}
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
