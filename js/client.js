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



//if a user leaves the chat ,append the info to container
socket.on('left',myname=>{
    append(`${myname} left the chat`, "left");
})
const secret="hi";
//if the form gets submitted,send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, "right");
    
    
    let encrypted=CryptoJS.AES.encrypt(message,secret).toString();
    console.log(encrypted);
    socket.emit('send',encrypted);//emit the event send and pass the message
    messageInput.value  ="";
})

//if server sends a message receive it
socket.on('receive',data=>{
    let decrypted=CryptoJS.AES.decrypt(data.message,secret).toString(CryptoJS.enc.Utf8);
    append(`${data.myname}:${decrypted}`, "left");
}
);


