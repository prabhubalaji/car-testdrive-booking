import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedDateTime } from '../actions/vehicleActions';

const DriveDatePicker = ({ isSelectDisabled, datePickerInputClass }) => {
  const dispatch = useDispatch();
  const { selectedModelDataState, selectedDateState } = useSelector(state => state.vehicle);

  const today = new Date();
  // Calculate the date 14 days from today
  const fourteenDaysFromToday = new Date();
  fourteenDaysFromToday.setDate(today.getDate() + 14);

  const handleDateChange = (date) => {
    dispatch(setSelectedDateTime(date));
  }

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
    return selectedModelDataState.availableDays.includes(Object.keys(dayMapping).find(key => dayMapping[key] === date.getDay()));
  }

  const filterTime = (time) => {
    const hour = new Date(time).getHours();
    const allowedStartHour = parseInt(selectedModelDataState.availableFromTime.split(":")[0]);
    const allowedEndHour = parseInt(selectedModelDataState.availableToTime.split(":")[0]);
    return hour >= allowedStartHour && hour <= allowedEndHour;
  };

  return (
    <DatePicker
    selected={selectedDateState}
    onChange={(date) => handleDateChange(date) }
    minDate={today} // Minimum date is today
    maxDate={fourteenDaysFromToday} // Maximum date is 14 days from today
    showTimeSelect
    dateFormat="Pp" // Format to show date and time (e.g., "MM/dd/yyyy h:mm aa")
    timeFormat="HH:mm" // 24-hour time format
    filterDate={isDateEnabled}
    filterTime={filterTime}
    timeIntervals={60}
    utcOffset={0}
    disabled={isSelectDisabled}
    className={datePickerInputClass}
    />
  )
}

export default DriveDatePicker;