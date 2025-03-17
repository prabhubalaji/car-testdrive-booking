import {
  SET_AVAILABLE_MODELS,
  SET_ALL_LOCATIONS,
  SET_SELECTED_CAR_MODEL,
  SET_SELECTED_CAR_MODEL_DATA,
  SET_LOCATION,
  SET_SELECTED_DATE_TIME,
  SET_CUSTOMER_NAME,
  SET_CUSTOMER_EMAIL,
  SET_CUSTOMER_PHONE,
  GET_VEHICLES
} from '../actions/vehicleActions';


// Initial state of the vehicles
const initialState = {
  modelsState: null,
  locationsState: null,
  selectedModelState: 'tesla_model3',
  selectedModelDataState: null,
  selectedLocationState: 'dublin',
  selectedDateState: null,
  customerNameState: '',
  customerEmailState: '',
  customerPhoneState: '',
  vehiclesState: null
};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AVAILABLE_MODELS:
      return {
        ...state,
        modelsState: action.payload
      }
    case SET_ALL_LOCATIONS:
      return {
        ...state,
        locationsState: action.payload
      }
    case SET_SELECTED_CAR_MODEL:
      return {
        ...state,
        selectedModelState: action.payload
      }
    case SET_SELECTED_CAR_MODEL_DATA:
      return {
        ...state,
        selectedModelDataState: action.payload
      }
    case SET_LOCATION:
      return {
        ...state,
        selectedLocationState: action.payload
      }
    case SET_SELECTED_DATE_TIME:
      return {
        ...state,
        selectedDateState: action.payload
      }
    case SET_CUSTOMER_NAME:
      return {
        ...state,
        customerNameState: action.payload
      }
    case SET_CUSTOMER_EMAIL:
      return {
        ...state,
        customerEmailState: action.payload
      }
    case SET_CUSTOMER_PHONE:
      return {
        ...state,
        customerPhoneState: action.payload
      }
    case GET_VEHICLES:
      return {
        ...state,
        vehiclesState: action.payload
      }
    default:
      return state;
  }
}

export default vehicleReducer;

