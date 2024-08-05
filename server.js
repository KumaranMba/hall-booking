// import the module express
const express = require('express');
const app = express();

// middleware
app.use(express.json());


// creating variables for storing data

let rooms = [{
    'roomId':"R101",
    'roomName': 'Deluxe & Superior Room',
    'seatsAvaliable':2,
    'Amenities in room': ['tv','ac','geyser','Hair dryer'],
    'pricePerHr':100
},
{
    'roomId':"R201",
    'roomName': 'Executive Room',
    'seatsAvaliable':3,
    'Amenities in room': ['tv','ac','geyser','Hair dryer'],
    'pricePerHr':150
}];

let bookings = [{
    'customerName':"Kumaran",
    'bookingDate':"2023/08/03",
    'startTime':"12.00pm",
    'endTime':"11.59am",
    'roomName':"Deluxe & Superior Room",
    'roomId':"R101",
    'status':"booked",
    'booked_On':"2023/08/25",
    'booking_id':"4234-0458-2879"
}];

let customers = [{
    'customerName':"Kumaran",
    bookings :[{
        'customerName':"Kumaran",
        'bookingDate':"2023/08/03",
        'startTime':"12.00pm",
        'endTime':"11.59am",
        'roomName':"Deluxe & Superior Room",
        'roomId':"R101",
        'status':"booked",
        'booked_On':"2023/08/25",
        'booking_id':"4234-0458-2879"
    }]
}];

// To view all the rooms and details

app.get('/rooms/all',(request,response)=>{
    response.status(200).json({rooms});
});

// API endpoint for creating room
app.post('/rooms/create',(request,respone)=>{
    const room = request.body;
    console.log(request.body);

});


const HOSTNAME = '127.0.0.1';
const PORT = 3001;

// listen to the server
app.listen(PORT,()=>{
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});