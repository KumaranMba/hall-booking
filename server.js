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
app.post('/rooms/create',(request,response)=>{
    const room = request.body;
    const idExists = rooms.find((el)=>el.roomId == room.roomId);
    if(idExists){
        response.status(400).json({message:"room already exits"});
    }else{
        rooms.push(room);
        response.status(200).json({message:"room created successfully"});
    }      

});

// API endpoint
app.get('/',(request,response)=>{
    response.send('Welcome to Hotel Booking API');
})

//Localhost and port number
const HOSTNAME = '127.0.0.1';
const PORT = 3001;

// listen to the server
app.listen(PORT,()=>{
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});