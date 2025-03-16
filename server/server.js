const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes and origins
app.use(cors());

// File paths
const vehiclePath = path.join(__dirname, 'vehicles.json');
const reservationsPath = path.join(__dirname, 'reservations.json');

// Function to read data from the JSON file
const readDataFromFile = (dataFilePath) => {
    const fileData = fs.readFileSync(dataFilePath);
    return JSON.parse(fileData);
};

// Function to write data to the JSON file
const writeDataToFile = async (dataFilePath, data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};
// API to get vehicles inventory data
app.get('/api/vehicles', (req, res) => {
    const { date, time } = req.query;
    const vehicles = readDataFromFile(vehiclePath);
    return res.json(vehicles);
});

// API to check availability of a slot
app.post('/api/check-availability', (req, res) => {
    const { vehicleType, startDateTime, location } = req.body;
    const data = readDataFromFile(reservationsPath);
    const car = data.reservations.find(car => car.vehicleType === vehicleType && car.location === location);

    if(!!car) {
        const timeslotNotAvailable = car.bookings.find(booking => {
            return new Date(booking.startDateTime).getTime() === new Date(startDateTime).getTime();
        });
        return res.json({available: !timeslotNotAvailable, notAvailableText: "Sorry ,kindly choose a different time slot so that we can book test drive for you"} );
    }
    return res.json({available: true});
});

// API to book a test drive
app.post('/api/book-test-drive', async (req, res) => {
    const {  vehicleId, vehicleType, location, customerName, customerPhone, customerEmail, startDateTime, } = req.body;

    const existingReservations = readDataFromFile(reservationsPath);
    const selectedVehicleTotalBookings = existingReservations.reservations.find(booking => {
        return booking.vehicleType === vehicleType;
    });
    const randomNumber = 10000 + Math.floor(Math.random() * 90000);
    const endDateTime = new Date(startDateTime).getTime() + 1000 * 60 * 45;
    const bookingData = {
        id: randomNumber,
        startDateTime,
        endDateTime: new Date(endDateTime).toISOString(),
        customerName,
        customerEmail,
        customerPhone
    }

    if(!!selectedVehicleTotalBookings) {
        selectedVehicleTotalBookings.bookings.push(bookingData);
    } else {
        const newVehicleBooking = {
            vehicleId,
            vehicleType,
            location,
            bookings: [bookingData]
        }
        existingReservations.reservations.push(newVehicleBooking);
    }
    await writeDataToFile(reservationsPath, existingReservations);
    res.status(201).json({ message: 'Slot booked successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});