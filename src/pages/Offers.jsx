import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import TableImage from "../components/layout/TableImage";
import PageCreator from "../components/pagecreator";
import { DATETIMEFORMAT } from "../constants";
import useResponsive from "../hooks/useResponsive";
import {
  addOffer,
  deleteOffer,
  editOffer,
  getOffers,
} from "../redux/actions/offerActions";
import { loadingSelector } from "../redux/reducers/loadingReducer";
import { offerTypes } from "../redux/types";
import { addTableColumnMinWidth } from "../utils/addTableColumnMinWidth";

const Offers = () => {
  const isMobile = useResponsive("down", "sm");

  // const dispatch = useDispatch();
  const tableHeaders = [
    {
      field: "offerName",
      headerName: "Offer Name",
      type: "string",
      editable: false,
      flex: 1,

      ...addTableColumnMinWidth(isMobile, 100),
    },
    {
      field: "offerImage",
      headerName: "Offer Image",
      type: "string",
      editable: false,
      flex: 1,
      renderCell: (params) => <TableImage src={params.value} />,
      ...addTableColumnMinWidth(isMobile, 70),
    },
    {
      field: "showInHomepage",
      headerName: "Show in Home ",
      type: "boolean",
      editable: false,
      flex: 1,
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
  ];

  const tableData = useSelector((state) => state.common.offers);

  const isTableLoading = useSelector((state) =>
    loadingSelector(state, offerTypes.GET_OFFERS)
  );
  const isFormLoading = useSelector((state) =>
    loadingSelector(state, [
      offerTypes.ADD_OFFER,
      offerTypes.UPDATE_OFFER,
      offerTypes.DELETE_OFFER,
    ])
  );
  return (
    <div>
      <PageCreator
        screenName={"Offers"}
        tableHeaders={tableHeaders}
        tableData={tableData?.data}
        formFields={formFields}
        searchFields={searchFields}
        defaultFormData={{
          isActive: true,
          showInHomepage: false,
        }}
        dialogWidth="lg"
        isLoading={isTableLoading}
        isFormLoading={isFormLoading}
        totalCount={tableData?.totalCount}
        // onFormSubmit={onFormSubmit}
        onAdd={addOffer}
        onEdit={editOffer}
        onDelete={deleteOffer}
        getTableData={getOffers}
        deleteTitle="offerName"
        mobileRowActionColumnWidth={120}
        selectable={!isMobile}
      />
    </div>
  );
};

export default Offers;

const formFields = [
  {
    type: "text",
    name: "offerName",
    label: "Offer Name",
    placeholder: "Enter Offer Name",
    required: true,
    disabled: false,
    readOnly: false,
    width: 4,
  },

  {
    type: "image",
    name: "offerImage",
    label: "Choose Offer Image",
    placeholder: "Choose Offer Image",
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
  {
    type: "text",
    name: "offerUrl",
    label: "Offer Url",
    placeholder: "Enter Offer Url",
    required: true,
    disabled: false,
    readOnly: false,
    width: 12,
  },
  {
    type: "boolean",
    name: "showInHomepage",
    label: "Show in App Homepage",
    placeholder: "Enter Show in App Homepage",
    required: false,
    disabled: false,
    readOnly: false,
    width: 4,
  },
];
const searchFields = [
  {
    type: "text",
    name: "offerName",
    label: "Offer Name",
    placeholder: "Enter Offer Name",
    required: false,
    disabled: false,
    readOnly: false,
    width: 6,
  },
];
