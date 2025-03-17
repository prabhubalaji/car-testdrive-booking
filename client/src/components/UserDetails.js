import { useEffect } from 'react';
import {
  setCustomerName,
  setCustomerEmail,
  setCustomerPhone
} from '../actions/vehicleActions';
import {useDispatch, useSelector} from "react-redux";

const UserDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      // Reset the state when the component unmounts
      dispatch(setCustomerName(''));
      dispatch(setCustomerEmail(''));
      dispatch(setCustomerPhone(''));
    };
  }, [dispatch]);
  const {
    customerNameState,
    customerEmailState,
    customerPhoneState
  } = useSelector(state => state.vehicle);
  return (
    <div className="user-fields">
      <input
        type="text"
        value={customerNameState}
        maxLength={20}
        onChange={(event) => dispatch(setCustomerName(event.target.value))}
        placeholder="Enter your name"
      />
      <input
        type="text"
        maxLength={20}
        value={customerEmailState}
        onChange={(event) => dispatch(setCustomerEmail(event.target.value))}
        placeholder="Enter your email"
      />
      <input
        type="text"
        maxLength={10}
        value={customerPhoneState}
        onChange={(event) => dispatch(setCustomerPhone(event.target.value))}
        placeholder="Enter your Contact No"
      />
    </div>
  )
}

export default UserDetails;