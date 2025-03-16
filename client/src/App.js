import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from 'react';
import { getVehicleListAPI, checkSlotAvailabilityAPI, bookSlotAPI } from './api/api';
import DatePicker from "react-datepicker";

function App() {
  const [models, setModels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedModel, setSelectedModel] = useState('tesla_model3');
  const [selectedModelData, setSelectedModelData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('dublin');
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalAvailableDays, setModalAvailableDays] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [slotAvailable, setSlotAvailable] = useState(false);
  // const [validDays, setValidDays] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  const today = new Date();

  // Calculate the date 14 days from today
  const fourteenDaysFromToday = new Date();
  fourteenDaysFromToday.setDate(today.getDate() + 14);

  // Function to check if the date is within the next 14 days
  const isDateEnabled = (date) => {
    return date >= today && date <= fourteenDaysFromToday && isValidDay(date);
  };

  const isValidDay = (date) => {
    const dayMapping = {
      "sun": 0,
      "mon": 1,
      "tue": 2,
      "wed": 3,
      "thur": 4,
      "fri": 5,
      "sat": 6
    };
    const modalAvailability = modalAvailableDays.find(model => model.model === selectedModel);
    return modalAvailability.availableDays.includes(Object.keys(dayMapping).find(key => dayMapping[key] === date.getDay()));
  }

  const filterTime = (time) => {
    const hour = new Date(time).getHours();
    const allowedStartHour = parseInt(selectedModelData.availableFromTime.split(":")[0]);
    const allowedEndHour = parseInt(selectedModelData.availableToTime.split(":")[0]);
    return hour >= allowedStartHour && hour <= allowedEndHour;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call using axios (replace URL with your API endpoint)
        // const response = await axios.get('http://localhost:3002/vehicles');
        const response = await getVehicleListAPI();
        const locationsArr = [];
        const vehicleModelsArr = [];
        setVehicles(response?.vehicles);
        let vehicleTypeDataAdded = [];
        response?.vehicles.forEach((vehicle, index) => {
          vehicleModelsArr.push(vehicle.type);
          locationsArr.push(vehicle.location);
          if(!vehicleTypeDataAdded.includes(vehicle.type)) {
            setModalAvailableDays((prevState) => ([
              ...prevState,
              {model: vehicle.type, vehicleId: vehicle.id, availableDays: vehicle.availableDays, availableFromTime: vehicle.availableFromTime, availableToTime: vehicle.availableToTime},
            ]));
            vehicleTypeDataAdded.push(vehicle.type);
          }
        });
        setModels([...new Set(vehicleModelsArr)]);
        setLocations([...new Set(locationsArr)]);
      } catch (error) {
        // If there's an error, set the error state
       console.error(error);
      }
    };
    fetchData();
  },[]);

  useEffect(() => {
    modalAvailableDays.forEach((vehicle, index) => {
      if(vehicle.model === selectedModel) {
        setSelectedModelData(vehicle);
      }
    })
  },[modalAvailableDays, selectedModel]);
  const checkAvailability = async () => {
    const response = await checkSlotAvailabilityAPI({
      vehicleType: selectedModel,
      location: selectedLocation,
      startDateTime: new Date(selectedDate).toISOString()
    });
    console.log(response);
    if(response?.available) {
      setShowUserModal(true);
      setSlotAvailable(true);
    } else {
      alert(response.notAvailableText);
      setSlotAvailable(false);
    }
  }

  const bookSlot = async () => {
    const response = await bookSlotAPI({
      vehicleId: selectedModelData.vehicleId,
      vehicleType: selectedModelData.model,
      location: selectedLocation,
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      startDateTime: new Date(selectedDate).toISOString()
    });
    if(response.status === 201) {
      setSlotAvailable(false);
      setShowUserModal(false);
      alert(response?.data?.message);
    }
  }

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const checkAndBookingText = () => {
    return slotAvailable ? "Book Slot" : "Check Availability";
  }
  return (
    <div className="App">
      <h1>Car Test Drive Booking</h1>
      <div className="field">
        <label htmlFor="model">Select Vehicle Model: </label>
        <select id="model" value={selectedModel} onChange={handleModelChange}>
          <option value="">Select Model</option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="locations">Select Vehicle Location: </label>
        <select id="locations" value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <span>Select a Date: </span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={today} // Minimum date is today
          maxDate={fourteenDaysFromToday} // Maximum date is 14 days from today
          showTimeSelect
          dateFormat="Pp" // Format to show date and time (e.g., "MM/dd/yyyy h:mm aa")
          timeFormat="HH:mm" // 24-hour time format
          filterDate={isDateEnabled}
          filterTime={filterTime}
          timeIntervals={60}
          utcOffset={0}
        />
      </div>
      {showUserModal && (
        <div className="user-fields">
          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)} // Update state on every input change
            placeholder="Enter your name"
          />
          <input
            type="text"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)} // Update state on every input change
            placeholder="Enter your email"
          />
          <input
            type="text"
            maxLength={10}
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)} // Update state on every input change
            placeholder="Enter your Contact No"
          />
        </div>
      )}
      <button onClick={slotAvailable ? bookSlot : checkAvailability}>{checkAndBookingText()}</button>
    </div>
  );
}

export default App;
