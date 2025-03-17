import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DriveDatePicker from "./components/DriveDatePicker";
import UserDetails from "./components/UserDetails";

import {
  setAvailableModels,
  setAllLocations,
  setSelectedCarModel,
  setSelectedCarModelData,
  setLocation,
  getVehicles
} from './actions/vehicleActions';
import { checkSlotAvailability, setSlotAvailability, bookSlot } from "./actions/bookingActions";

function App() {
  const dispatch = useDispatch();
  const {
    modelsState,
    locationsState,
    selectedModelState,
    selectedModelDataState,
    selectedLocationState,
    selectedDateState,
    customerNameState,
    customerEmailState,
    customerPhoneState,
    vehiclesState
  } = useSelector(state => state.vehicle);
  const {
    slotCheck,
    slotAvailableState,
    bookingStatus
  } = useSelector(state => state.booking);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getVehicles());
      } catch (error) {
        // If there's an error, set the error state
       console.error(error);
      }
    };
    fetchData();
  },[dispatch]);

  useEffect(() => {
    console.log('slotCheck', slotCheck);
    if(!!slotCheck) {
      if(slotCheck?.available) {
        setShowUserModal(true);
        dispatch(setSlotAvailability(true));
      } else {
        alert(slotCheck?.notAvailableText || "No slot available");
        dispatch(setSlotAvailability(false));
      }
    }
  },[dispatch, slotCheck]);

  useEffect(() => {
    if(bookingStatus && bookingStatus.status === 201) {
      dispatch(setSlotAvailability(false));
      setShowUserModal(false);
      alert(bookingStatus?.data?.message);
    }
  },[dispatch, bookingStatus]);

  useEffect(() => {
    if(vehiclesState?.vehicles?.length > 0) {
      const locationsArr = [];
      const vehicleModelsArr = [];
      vehiclesState.vehicles.forEach((vehicle) => {
        if(!modelsState) {
          vehicleModelsArr.push(vehicle.type);
          locationsArr.push(vehicle.location);
        }
        if(vehicle.type === selectedModelState) {
          dispatch(setSelectedCarModelData(vehicle));
        }
      });
      if(!modelsState) {
        dispatch(setAvailableModels([...new Set(vehicleModelsArr)]));
        dispatch(setAllLocations([...new Set(locationsArr)]));
      }
    }
  },[dispatch, vehiclesState, selectedModelState]);

  useEffect(() => {
    if(slotAvailableState) {
      setIsSelectDisabled(true);
    }
  },[slotAvailableState])
  const checkAvailability = async () => {
    await dispatch(checkSlotAvailability({
        vehicleType: selectedModelState,
        location: selectedLocationState,
        startDateTime: new Date(selectedDateState).toISOString()
    }));
  }

  const bookTestDriveSlot = async () => {
    await dispatch(bookSlot({
      vehicleId: selectedModelDataState.id,
      vehicleType: selectedModelDataState.type,
      location: selectedLocationState,
      customerName: customerNameState,
      customerPhone: customerPhoneState,
      customerEmail: customerEmailState,
      startDateTime: new Date(selectedDateState).toISOString()
    }));
    setIsSelectDisabled(false);
  }

  const handleModelChange = (event) => {
    dispatch(setSelectedCarModel(event.target.value));
  };

  const handleLocationChange = (event) => {
    dispatch(setLocation(event.target.value));
  };

  const checkAndBookingText = () => {
    return slotAvailableState ? "Book Slot" : "Check Availability";
  }

  return (
    <div className="App">
      <div className="container">
        <div className="left-item">
            <h1>Car Test Drive Booking</h1>
            {modelsState && modelsState.length > 0 && (
              <div className="field">
                <label htmlFor="model">Select Vehicle Model: </label>
                <select id="model" value={selectedModelState} disabled={isSelectDisabled} onChange={handleModelChange}>
                  <option value="">Select Model</option>
                  {modelsState.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {locationsState && locationsState.length > 0 && (
              <div className="field">
                <label htmlFor="locations">Select Vehicle Location: </label>
                <select id="locations" value={selectedLocationState} disabled={isSelectDisabled} onChange={handleLocationChange}>
                  <option value="">Select Location</option>
                  {locationsState.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="field">
              <span>Select a Date: </span>
              <DriveDatePicker isSelectDisabled={isSelectDisabled} datePickerInputClass ="datepicker-input"/>
            </div>
        </div>
        <div className="right-item">
          {showUserModal && (
            <>
            <h1>Slot available! You can now book your test drive</h1>
            <UserDetails />
            </>
          )}
        </div>
      </div>
      <button className="action-button" disabled={!selectedModelState || !selectedLocationState || !selectedDateState} onClick={slotAvailableState ? bookTestDriveSlot : checkAvailability}>{checkAndBookingText()}</button>
    </div>
  );
}

export default App;
