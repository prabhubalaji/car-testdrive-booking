# Car-TestDrive-Booking
An app to book test drive

## Tech Stack used
- React JS (frontend)
- Node JS - Express (backend)
- Redux (State management)
- Redux thunk (Middleware)

## Features
- ### Server
  - API to get the vehicles list.
  - API to check if the particular slot is available.
  - API to book the slot.
  - All read and write will be performed on the local JSON file available in server directory(`vehicles.json, reservations.json`)
- ### Client
  - Available vehicle models and locations will be prepopulated from the local json file (vehicles.json)
  - DatePicker will show only eligible dates and time for the selected model.
  - Once the user selects the date-time, `Check eligibility` button will be enabled.
  - On clicking the button, if slot is not available you will be thrown with alert message "No Slot Available".
  - If slot available, you will be asked to `enter name, email and contact` to book the slot.
  - On entering all the details and clicking on `Book Slot`, your test drive slot will be booked and the user will be shown with success message.
  - Once slot is booked, you can view the `reservations.json` file to view your booking.

## Available Scripts
Goto server directory (`~/car-testdrive-booking/server`) and run the below script to download dependencies

### `npm install`

Goto client directory (`~/car-testdrive-booking/client`) and execute the below scripts,
### `npm install`
### `npm run start-server-client`

### Server will run at location  http://localhost:3002/api/vehicles
### Client will run at location http://localhost:3000/
