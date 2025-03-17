import { getVehicleListAPI } from '../api/api';

// Action Types
export const SET_AVAILABLE_MODELS = 'SET_AVAILABLE_MODELS';
export const SET_ALL_LOCATIONS = 'SET_ALL_LOCATIONS';
export const SET_SELECTED_CAR_MODEL = 'SET_SELECTED_CAR_MODEL';
export const SET_SELECTED_CAR_MODEL_DATA = 'SET_SELECTED_CAR_MODEL_DATA';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_SELECTED_DATE_TIME = 'SET_SELECTED_DATE_TIME';
export const SET_CUSTOMER_NAME = 'SET_CUSTOMER_NAME';
export const SET_CUSTOMER_EMAIL = 'SET_CUSTOMER_EMAIL';
export const SET_CUSTOMER_PHONE = 'SET_CUSTOMER_PHONE';
export const GET_VEHICLES = 'GET_VEHICLES';

// Action Creators
export const setAvailableModels = (models) => ({
  type: SET_AVAILABLE_MODELS,
  payload: models
});

export const setAllLocations = (locations) => ({
  type: SET_ALL_LOCATIONS,
  payload: locations
});

export const setSelectedCarModel = (model) => ({
  type: SET_SELECTED_CAR_MODEL,
  payload: model
});

export const setSelectedCarModelData = (selectedModelData) => ({
  type: SET_SELECTED_CAR_MODEL_DATA,
  payload: selectedModelData
});

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location
});

export const setSelectedDateTime = (selectedDateTime) => ({
  type: SET_SELECTED_DATE_TIME,
  payload: selectedDateTime
});

export const setCustomerName = (selectedDateTime) => ({
  type: SET_CUSTOMER_NAME,
  payload: selectedDateTime
});

export const setCustomerEmail = (selectedDateTime) => ({
  type: SET_CUSTOMER_EMAIL,
  payload: selectedDateTime
});

export const setCustomerPhone = (selectedDateTime) => ({
  type: SET_CUSTOMER_PHONE,
  payload: selectedDateTime
});

export const getVehicles = () => async (dispatch) => {
  try {
    const response = await getVehicleListAPI();
    dispatch({ type: GET_VEHICLES, payload: response });
  } catch (error) {
    console.error('Error fetching vehicles', error);
  }
};
