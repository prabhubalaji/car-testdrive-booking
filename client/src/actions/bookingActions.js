import { checkSlotAvailabilityAPI, bookSlotAPI } from '../api/api';

export const CHECK_SLOT_AVAILABILITY = 'CHECK_SLOT_AVAILABILITY';
export const SET_SLOT_AVAILABILITY = 'SET_SLOT_AVAILABILITY';
export const BOOK_SLOT = 'BOOK_SLOT';

//Action Creators
export const checkSlotAvailability = (payload) => async (dispatch) => {
  try {
    const response = await checkSlotAvailabilityAPI(payload);
    dispatch({ type: CHECK_SLOT_AVAILABILITY, payload: response });
  } catch (error) {
    console.error('Error checking slot availability', error);
  }
};

export const setSlotAvailability = (selectedDateTime) => ({
  type: SET_SLOT_AVAILABILITY,
  payload: selectedDateTime
});

export const bookSlot = (payload) => async (dispatch) => {
  try {
    const response = await bookSlotAPI(payload);
    dispatch({ type: BOOK_SLOT, payload: response });
  } catch (error) {
    console.error('Error booking slot', error);
  }
};
