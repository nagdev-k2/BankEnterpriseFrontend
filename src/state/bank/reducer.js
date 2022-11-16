import { GET_ALL_BANKS, SET_BANK_DETAILS } from "../types";

const initialState = {
  banks: [],
  selectedBank: {}
}

const BankReducer = (action = {}, state = initialState) => {
  switch(action.type) {
    case GET_ALL_BANKS:
      return {...state, banks: action.data}
    case SET_BANK_DETAILS:
      return {...state, selectedBank: action.data}
    default:
      return state;
  }
};

export default BankReducer;