import { GET_ALL_BANKS, SET_BANK_DETAILS } from "../types";

export const getAllBanks = (data) => ({
  type: GET_ALL_BANKS,
  data
});

export const setBankDetails = (data) => ({
  type: SET_BANK_DETAILS,
  data
});