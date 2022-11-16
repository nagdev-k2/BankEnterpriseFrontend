import { ADD_BANK, GET_ALL_BANKS, SET_BANK_DETAILS } from "../types";

const initialState = {
  banks: [],
  selectedBank: {}
}

const BankReducer = (action, state = initialState) => {
  // switch(action.type) {
  //   case GET_ALL_BANKS:
  //     return {...state, banks: action.banks}
  // }
  return initialState;
};

export default BankReducer;