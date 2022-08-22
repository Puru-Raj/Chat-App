//Node server which will handle socket io connections
const io=require('socket.io')(8000);
//var CryptoJS = require("crypto-js");
const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',myname=>{ 
        //new-user-joined is the event name which is emitted from client.js 
        //console.log('new user joined',myname);
        socket.broadcast.emit('user-joined',myname);//broadcast the event user-joined and pass the name of the user
        users[socket.id]=myname;
        
    });
    socket.on('send',message=>{
        // var bytes  = CryptoJS.AES.decrypt(message, 'secret key 123');
        // var originalText = bytes.toString(CryptoJS.enc.Utf8);
        socket.broadcast.emit('receive',{message:message,myname:users[socket.id]});
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

});

