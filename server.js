// import the module express
const express = require('express');
const http = require('http');
const app = express();

// middleware
app.use(express.json());


// creating variables for storing data

let rooms = [{
    "roomId":"R101",
    "roomName":"Deluxe & Superior Room",
    "seatsAvaliable":2,
    "Amenities in room": ["tv","ac","geyser","Hair dryer"],
    'pricePerHr':100
},
{
    "roomId":"R201",
    "roomName": "Executive Room",
    "seatsAvaliable":3,
    "Amenities in room": ["tv","ac","geyser","Hair dryer"],
    "pricePerHr":150
}];

let bookings = [{
    "customer":"Kumaran",
    "bookingDate":"2023/08/03",
    "startTime":"12.00pm",
    "endTime":"11.59am",
    "roomName":"Deluxe & Superior Room",
    "roomId":"R101",
    "status":"booked",
    "booked_On":"2023/08/25",
    "booking_id":"4234-0458-2879"
}];

let customers = [{
    "name":"Kumaran",
    bookings :[{
        "customer":"Kumaran",
        "bookingDate":"2023/08/03",
        "startTime":"12.00pm",
        "endTime":"11.59am",
        "roomName":"Deluxe & Superior Room",
        "roomId":"R101",
        "status":"booked",
        "booked_On":"2023/08/25",
        "booking_i":"4234-0458-2879"
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

// api endpoint for booking room using params
app.post('/booking/create/:id',(request,response)=>{
    try{
        const id = request.params.id; // getting the room Id through params
        let bookRoom = request.body;  // getting the entire booking object through request
        let date = new Date();         
        let dateFormat = date.toLocaleDateString();  // generating the booking date  
        let idExists = rooms.find((el)=>el.roomId == id);  // Identifying the provided room Id is correct 
        if(idExists === undefined){
           return response.status(400).json({message:"room does not exist", rooms});
        } 

       // verifying the booked date
        let matchID = bookings.filter(booking => booking.roomId === id);
        if(matchID.length > 0){
            let dateCheck = matchID.filter((m)=>{ return m.bookingDate === bookRoom.bookingDate})
            console.log(dateCheck);
        if(dateCheck.length === 0){
            let newID = "B" +  (bookings.length + 1);
            let newbooking = {...bookRoom, bookingID: newID, roomId: id, status:"booked", booked_On: dateFormat}
            bookings.push(newbooking);
            return response.status(201).json({message:"hall booked",Bookings: bookings,added:newbooking});
        }else{
            return response.status(400).json({message:"hall already booked for this date,choose another hall",Bookings:bookings});
        }
    }
    else{
        let newID = "B"+(bookings.length + 1);
        let newbooking = { ...bookRoom,bookingID: newID,roomId:id,status:"booked",booked_On: dateFormat}
        bookings.push(newbooking);
        const customerdetails = customers.find(customer => customer.name === newbooking.customer);
        console.log(customerdetails);
        if(customerdetails){
            customerdetails.bookings.push(newbooking);
        } else{
            customers.push({name:newbooking.customer,bookings:[newbooking]});
        }
        return response.status(201).json({message:"hall booked", Bookings:bookings,added:newbooking});
    }
   }catch(error){
        response.status(400).json({message:"error booking room",error: error,data: bookings});
    }
});

// api endpoint for viewing all the booked room

app.get('/viewbooking',(request,response) => {

    const bookedRooms = bookings.map( booking => {
        const {roomId,status,customer,bookingDate,startTime,endTime} = booking;
        return {roomId,status,customer,bookingDate,startTime,endTime}
    });
        response.status(201).json(bookedRooms);
});

//api to list all the customers with booked data
app.get('/customers', (request,response) => {
const customerBooking = customers.map( customer => {
const { name, bookings } = customer;

const customerDetails = bookings.map(booking => {
    const { roomId, bookingDate,startTime,endTime} = booking;
    return { name,roomId,bookingDate,startTime,endTime};
});

return customerDetails;

})
response.json(customerBooking);
});

// api to list how many times the user booked the room

app.get('/customer/:name',(request,response) => {
    const name = request.params.name;
    const customer = customers.find(cust => cust.name === name);
    if (!customer){
        response.status(404).json({error: "Customer not found"});
        return;
    }
    const customerBookings = customer.bookings.map(booking => {
        const { customer,roomId,startTime,endTime,booking_id,status,bookingDate,booked_On } = booking;
        return{ customer,roomId,startTime,endTime,booking_id,status,bookingDate,booked_On };
    });
    response.json(customerBookings);
});


// API endpoint
app.get('/',(request,response)=>{
    response.send('Welcome to Hotel Booking API');
});

//Localhost and port number
const HOSTNAME = '127.0.0.1';
const PORT = 3001;

// listen to the server
app.listen(PORT,()=>{
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});