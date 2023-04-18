import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffectOnce } from "react-use";
import TableImage from "../components/layout/TableImage";
import PageCreator from "../components/pagecreator";
import { DATETIMEFORMAT } from "../constants";
import {
  addProduct,
  batchDeleteProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../redux/actions/productActions";
import { getAllPlatforms } from "../redux/actions/platformActions";
import { loadingSelector } from "../redux/reducers/loadingReducer";
import { productTypes } from "../redux/types";
import { getAllCategories } from "../redux/actions/categoryActions";
import { Button, Typography } from "@mui/material";
import { FORMMODE } from "../enums";
import DeleteModal from "../components/DeleteModal";

const Products = () => {
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = React.useState({
    deleteIds: undefined,
    setSelected: undefined,
  });
  const CountColumn = ({ params }) => {
    return (
      <Typography
        color="white"
        sx={{
          backgroundColor: (theme) => theme.palette.error.main,
          paddingRight: (theme) => theme.spacing(),
          paddingLeft: (theme) => theme.spacing(),
        }}
      >
        {params.value}
      </Typography>
    );
  };
  const tableHeaders = [
    {
      field: "productName",
      headerName: "Product Name",
      type: "string",
      editable: false,
      flex: 1,
    },
    {
      field: "productImage",
      headerName: " Image",
      type: "string",
      editable: false,
      flex: 0.5,
      renderCell: (params) => <TableImage src={params.value} />,
    },
    {
      field: "viewCount",
      headerName: "Views",
      type: "string",
      flex: 0.5,
      editable: false,
      renderCell: (params) => <CountColumn params={params} />,
    },

    {
      field: "mrpPrice",
      headerName: "M.R.P",
      type: "string",
      editable: false,
      flex: 0.5,
    },
    {
      field: "sellPrice",
      headerName: "Sell Price",
      type: "string",
      editable: false,
      flex: 0.5,
    },
    {
      field: "platformName",
      headerName: "Platform",
      type: "string",
      editable: false,
      flex: 1,
    },
    {
      field: "isExpired",
      headerName: "Expired",
      type: "boolean",
      flex: 0.5,
      editable: false,
    },
    {
      field: "isActive",
      headerName: "Active",
      type: "boolean",
      flex: 0.5,
      editable: false,
    },
    {
      field: "isAutoAdded",
      headerName: "Auto Added",
      type: "boolean",
      flex: 1,
      editable: false,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      type: "string",
      flex: 0.7,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      flex: 1,
      editable: false,
      valueFormatter: ({ value }) => moment(value).format(DATETIMEFORMAT),
    },
  ];

  const tableData = useSelector((state) => state.common.products);

  const platforms = useSelector((state) => state.common.platforms);
  const categories = useSelector((state) => state.common.categories);

  const isTableLoading = useSelector((state) =>
    loadingSelector(state, productTypes.GET_PRODUCTS)
  );
  const isFormLoading = useSelector((state) =>
    loadingSelector(state, [
      productTypes.ADD_PRODUCT,
      productTypes.UPDATE_PRODUCT,
      productTypes.DELETE_PRODUCT,
    ])
  );

  useEffectOnce(() => {
    dispatch(getAllPlatforms());
    dispatch(getAllCategories());
  }, []);

  const BatchAction = ({ selected, setSelected, getterFunctions }) => {
    return (
      selected?.length > 0 && (
        <Button
          variant="contained"
          onClick={() =>
            setDeleteData({
              deleteIds: selected,
              setSelected: setSelected,
            })
          }
        >
          Delete {selected?.length} Products
        </Button>
      )
    );
  };

  return (
    <div>
      <DeleteModal
        open={Boolean(deleteData?.deleteIds)}
        title={`${deleteData?.deleteIds?.length} Products`}
        onConfirm={() =>
          dispatch(
            batchDeleteProduct({
              data: deleteData?.deleteIds,
              callBack: () => {
                deleteData.setSelected();
                setDeleteData();
              },
            })
          )
        }
        onClose={() => setDeleteIds()}
      />
      <PageCreator
        screenName={"Products"}
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
        onAdd={addProduct}
        onEdit={editProduct}
        onDelete={deleteProduct}
        getTableData={getProducts}
        deleteTitle="productName"
        selectOptions={{
          platformId: platforms?.data || [],
          categoryId: categories?.data || [],
        }}
        toolbarActions={[BatchAction]}
      />
    </div>
  );
};

export default Products;

const formFields = [
  {
    type: "text",
    name: "productName",
    label: "Product Name",
    placeholder: "Enter Product Name",
    required: true,
    disabled: false,
    readOnly: false,
    width: 6,
  },
  {
    type: "image",
    name: "productImage",
    label: "Choose Product Image",
    placeholder: "Choose Product Image",
    required: true,
    disabled: false,
    readOnly: false,
    width: 6,
  },

  {
    type: "float",
    name: "mrpPrice",
    label: "M.R.P ",
    placeholder: "Enter M.R.P",
    required: true,
    disabled: false,
    readOnly: false,
    width: 3,
  },

  {
    type: "float",
    name: "sellPrice",
    label: "Sell Price ",
    placeholder: "Enter Sell Price",
    required: true,
    disabled: false,
    readOnly: false,
    width: 3,
  },

  {
    type: "asyncselect",
    name: "platformId",
    label: "Choose Platform ",
    placeholder: "Choose Platform",
    optionLabel: "platformName",
    optionValue: "_id",
    hasExternalOptions: true,
    required: true,
    disabled: false,
    readOnly: false,
    width: 3,
  },

  {
    type: "asyncselect",
    name: "categoryId",
    label: "Choose Category ",
    placeholder: "Choose Category",
    optionLabel: "categoryName",
    optionValue: "_id",
    hasExternalOptions: true,
    required: true,
    disabled: false,
    readOnly: false,
    width: 3,
  },

  {
    type: "text",
    name: "productUrl",
    label: "Product Url",
    placeholder: "Enter Product Url",
    required: true,
    disabled: false,
    readOnly: false,
    width: 12,
  },

  {
    type: "boolean",
    name: "isActive",
    label: "Status",
    placeholder: "Enter Status",
    required: true,
    disabled: false,
    readOnly: false,
    width: 2,
  },

  {
    type: "boolean",
    name: "isExpired",
    hideAt: FORMMODE.ADD,
    label: "Expired",
    placeholder: "Enter Expired",
    required: true,
    disabled: false,
    readOnly: false,
    width: 3,
  },

  {
    type: "richtext",
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
    required: false,
    disabled: false,
    readOnly: false,
    width: 12,
  },
];
const searchFields = [
  {
    type: "text",
    name: "productName",
    label: "Product Name",
    placeholder: "Enter Product Name",
    required: false,
    disabled: false,
    readOnly: false,
    width: 6,
  },
];
