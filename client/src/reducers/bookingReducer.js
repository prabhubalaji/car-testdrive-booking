import { CHECK_SLOT_AVAILABILITY, SET_SLOT_AVAILABILITY, BOOK_SLOT } from '../actions/bookingActions';

const initialState = {
  slotCheck: null,
  slotAvailableState: false,
  bookingStatus: null
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_SLOT_AVAILABILITY:
      return {
        ...state,
        slotCheck: action.payload
      }
    case SET_SLOT_AVAILABILITY:
      return {
        ...state,
        slotAvailableState: action.payload
      }
    case BOOK_SLOT:
      return {
        ...state,
        bookingStatus: action.payload
      }
    default:
      return state;
  }
}

export default bookingReducer;