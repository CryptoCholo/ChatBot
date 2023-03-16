require('dotenv').config();
const session = require('express-session');
const express = require("express");
const app = express();
const http = require("http");
const path = require('path');
const Restaurant = require('./services/restaurant');
const moment = require('moment')

const server = http.createServer(app);
const {connect, db} = require('./db/db');
const mongooseStore = require('connect-mongo');

//Initialize socket.io
const { Server } = require("socket.io");
const io = new Server(server);

//connect to mongo atlas
connect();


app.use(express.static(path.resolve(__dirname, '../dist')));




const store =  mongooseStore.create({mongoUrl: process.env.MONGO_URL}).on('create', (e) => { 
  console.log(e, "sessionId created");
})




//configure session option
const sessionMiddleware = session({
  secret: process.env.SESSION,
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: {
    name: "sessionId",
    httpOnly: true,
    maxAge: 3600000,
    secure: false 
  },
})

io.engine.use(sessionMiddleware);

app.get("/", (req, res) => {

 
  var options = {
    root: path.join(__dirname, '../dist'),
  }
 
  res.sendFile("/index.html", options);
});


io.on("connection", (socket) => {

  const restaurant = new Restaurant();

  const sessionId = socket.request.session.id;
  console.log(sessionId, "sessionID");


  socket.on('showmenu', (event) => {

    socket.emit('welcome', {namE:  "chatBot", bodY: "Welcome to CHOPLIFE RESTAURANT. Please reply with any of the numbers in our options menu to continue.", timE: `${moment().toLocaleString().split(' ')[4]}`,})
  })

  socket.on('place_order', (event) => {
    
    const menu = restaurant.getMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })
  socket.on('order_history', (event) => {
   
    console.log('order history')
  })
  socket.on('current_order', (event) => {
   
    console.log('current order')
  })
  socket.on('cancel_order', (event) => {

    console.log('cancelled order')
  })
  socket.on('grilled_options', (event) => {
    const menu = restaurant.getGrilledMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })
  socket.on('peppersoup_options', (event) => {
    const menu = restaurant.getSoupMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  
  })
  socket.on('sides_options', (event) => {
    const menu = restaurant.getSideMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })
  socket.on('beverage_options', (event) => {
    const menu = restaurant.getBeverageMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })
  
  socket.on("user_connected", (e) => {
    socket.emit("user_connected_successful", `${e.info} connected successfully`);
  })    
})

server.listen(4000, () => {
  console.log("listening on *:4000");
});


//   if (req.session.views) {
//     req.session.views++;
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<p>Views: ' + req.session.views + '</p>');
//     res.write('<p>Expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
//     res.end();
// } else {
//     req.session.views = 1;
//     res.end('Welcome to the session demo. Refresh page!');
// }