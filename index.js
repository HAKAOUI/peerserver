const express = require("express");
const { ExpressPeerServer } = require("peer");
const path = require("path");
const http = require("http");
const axios = require('axios');

var peers =[];

var app = express();

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

const peerServer = ExpressPeerServer(server, {
	path: "/webrtc",
    key: "peerjs",
    allow_discovery: true
});

app.set('view engine', 'ejs');

app.use("/", peerServer);
app.use(express.static("public"));

const url = "http://localhost:9000/webrtc/:key/peers"

peerServer.on('connection', (client) => { 
    console.log(`user Id : ${client.getId()}`);
        axios.get(url)
        .then(response => {
            console.log(response.data);
            peers = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
        });

});

peerServer.on('disconnect', (client) => { 
    
    console.log(`user Id : ${client.getId()}`);
        axios.get(url)
        .then(response => {
            console.log(response.data);
            peers = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
        });

});



server.listen(PORT, () => console.log("Server is Running..."));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./views/index.ejs"));
    res.render('index',{peers: peers})
});



