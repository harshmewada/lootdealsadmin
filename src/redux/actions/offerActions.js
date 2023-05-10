import { offerApi } from "../../API";
import { offerTypes, REQUESTMETHOD } from "../types";

export const getOffers = ({ query, callBack }) => {
  return {
    type: offerTypes.GET_OFFERS,
    request: {
      method: REQUESTMETHOD.GET,
      params: query,

      enableMessages: false,
      url: offerApi.GET_OFFERS,
      callBack,
    },
  };
};

export const getAllOffers = () => {
  return {
    type: offerTypes.GET_ALL_OFFERS,
    request: {
      method: REQUESTMETHOD.GET,

      enableMessages: false,
      url: offerApi.GET_ALL_OFFERS,
    },
  };
};

export const addOffer = ({ data, callBack }) => {
  return {
    type: offerTypes.ADD_OFFER,
    request: {
      method: REQUESTMETHOD.POST,
      data: data,
      url: offerApi.ADD_OFFER,
      isFormData: true,
      enableMessages: true,
      successMessage: "Offer Added Successfully",
      failMessage: "Failed to add Offer",
      callBack,
    },
  };
};

export const editOffer = ({ data, callBack }) => {
  return {
    type: offerTypes.UPDATE_OFFER,
    request: {
      method: REQUESTMETHOD.PATCH,
      data: data,
      url: offerApi.UPDATE_OFFER,
      isFormData: true,
      enableMessages: true,
      successMessage: "Offer Updated Successfully",
      failMessage: "Failed to update Offer",
      callBack,
    },
  };
};

export const deleteOffer = ({ data, callBack }) => {
  return {
    type: offerTypes.DELETE_OFFER,
    request: {
      method: REQUESTMETHOD.DELETE,
      data: data,
      url: offerApi.DELETE_OFFER,
      isFormData: false,
      enableMessages: true,
      successMessage: "Offer deleted Successfully",
      failMessage: "Failed to delete Offer",
      callBack,
    },
  };
};
