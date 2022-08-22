const socket=io('http://localhost:8000');
// var CryptoJS = require("crypto-js");

//get DOM elements in respective JS variables
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//audio will play on receiving message
var audio = new Audio('../notification.mp3');

//function which will append event to the container
const append = (message, position) => {
    const messageElement = document.createElement("div"); 
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=="left"){
    audio.play();
}
}

//Ask new User for his name and let the server know
const myname=prompt("Enter your name to join");
socket.emit('new-user-joined',myname);//emit the event new-user-joined and pass the name of the user

//if a new user joins receive his name from server
socket.on('user-joined',myname=>{
    append(`${myname} joined the chat`, "right");
}
);

//if server sends a message receive it
socket.on('receive',data=>{
    append(`${data.myname}:${data.message}`, "left");
}
);

//if a user leaves the chat ,append the info to container
socket.on('left',myname=>{
    append(`${myname} left the chat`, "left");
})

//if the form gets submitted,send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, "right");
    //var ciphertext = CryptoJS.AES.encrypt(message, 'secret key 123').toString();
    //socket.emit('send',ciphertext);//emit the event send and pass the message
    socket.emit('send',message);//emit the event send and pass the message
    messageInput.value  ="";
})




