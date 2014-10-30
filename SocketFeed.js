/**
 * Created by patrick conroy on 10/28/14.
 */

var io = require('socket.io').listen(3000);



io.sockets.on('connection', function (socket) {

    var sendValue=function()
    {
        socket.emit('1:CM', Math.floor(Math.random()*10));
        socket.emit('2:CM', Math.floor(Math.random()*10));

    };
console.log("connected");
    var timerFunc =setInterval(sendValue,500);


    socket.on('close', function () {
       clearInterval(timerFunc);
    });
});