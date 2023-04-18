import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import PageCreator from "../components/pagecreator";
import { DATETIMEFORMAT } from "../constants";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategorys,
} from "../redux/actions/categoryActions";
import { loadingSelector } from "../redux/reducers/loadingReducer";
import { categoryTypes } from "../redux/types";

const Categories = () => {
  // const dispatch = useDispatch();
  const tableHeaders = [
    {
      field: "categoryName",
      headerName: "Category Name",
      type: "string",
      editable: false,
      flex: 1,
    },
    {
      field: "enableNotification",
      headerName: "Enable Notification",
      type: "boolean",
      editable: false,
      flex: 1,
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
  ];

  const tableData = useSelector((state) => state.common.categories);

  const isTableLoading = useSelector((state) =>
    loadingSelector(state, categoryTypes.GET_CATEGORYS)
  );
  const isFormLoading = useSelector((state) =>
    loadingSelector(state, [
      categoryTypes.ADD_CATEGORY,
      categoryTypes.UPDATE_CATEGORY,
      categoryTypes.DELETE_CATEGORY,
    ])
  );
  return (
    <div>
      <PageCreator
        screenName={"Category"}
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
        onAdd={addCategory}
        onEdit={editCategory}
        onDelete={deleteCategory}
        getTableData={getCategorys}
        deleteTitle="categoryName"
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
    width: 4,
  },

  {
    type: "boolean",
    name: "enableNotification",
    label: "Enable Notification",
    placeholder: " Enable Notification",
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
    name: "categoryName",
    label: "Category Name",
    placeholder: "Enter Category Name",
    required: false,
    disabled: false,
    readOnly: false,
    width: 6,
  },
];
