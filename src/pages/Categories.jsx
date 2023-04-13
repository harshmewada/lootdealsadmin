import { IconButton } from "@mui/material";
import moment from "moment";
import React from "react";
import Iconify from "../components/layout/iconify/Iconify";
import PageCreator from "../components/pagecreator";
import { categories } from "../configs/category.config";
import { DATETIMEFORMAT } from "../constants";

const Categories = () => {
  const tableHeaders = [
    {
      field: "categoryName",
      headerName: "Category Name",
      type: "string",
      editable: false,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      flex: 0.5,
      editable: false,
      valueFormatter: (value) => moment(value).format(DATETIMEFORMAT),
    },
    {
      field: "products",
      headerName: "Product Count",
      flex: 0.5,

      type: "number",

      editable: false,
      valueGetter: ({ row }) => row.products.length,
    },
    {
      field: "enableNotifications",
      headerName: "Notifications",
      flex: 0.5,

      type: "boolean",

      editable: false,
    },

    {
      field: "actions",
      type: "actions",
      label: "Actions",
      getActions: (params) => [
        <IconButton>
          <Iconify icon="eva:edit-2-outline" />
        </IconButton>,
        <IconButton>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>,
      ],
    },
  ];

  const tableData = categories;
  return (
    <div>
      <PageCreator
        screenName={"Categories"}
        tableHeaders={tableHeaders}
        tableData={[...tableData]}
        formFields={formFields}
        dialogWidth="sm"
      />
    </div>
  );
};

export default Categories;

const formFields = [
  {
    type: "text",
    name: "categoryName",
    label: "Category Name",
    placeholder: "Enter Category Name",
    required: true,
    disabled: false,
    readOnly: false,
    width: 6,
  },
  {
    type: "boolean",
    name: "enableNotifications",
    label: "Enable Notifications",
    placeholder: "Enter Enable Notifications",
    required: true,
    disabled: false,
    readOnly: false,
    width: 6,
  },
];
