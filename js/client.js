const socket=io('http://localhost:8000');
// var CryptoJS = require("crypto-js");

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('../notification.mp3');
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

const myname=prompt("Enter your name to join");
socket.emit('new-user-joined',myname);//emit the event new-user-joined and pass the name of the user


//listen to the event receive from the server and pass the message and name of the user
socket.on('user-joined',myname=>{
    append(`${myname} joined the chat`, "right");
}
);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, "right");
    //var ciphertext = CryptoJS.AES.encrypt(message, 'secret key 123').toString();
    //socket.emit('send',ciphertext);//emit the event send and pass the message
    socket.emit('send',message);//emit the event send and pass the message
    messageInput.value  ="";
})

socket.on('receive',data=>{
    append(`${data.myname}:${data.message}`, "left");
}
);

socket.on('left',myname=>{
    append(`${myname} left the chat`, "left");
})

