import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin : 'https://quickchat.netlify.app'
    }
})

io.on("connection" , (socket)=> {
    console.log("User Connected:" , socket.id)

    socket.on("join_room" , (data) => {
        socket.join(data.room);
        console.log(data.userName, 'joined room:',  data.room);
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data)
    })
    socket.on('disconnect', () => {
        console.log("User Disconnected:" , socket.id)
    })
})

const port = process.env.PORT || 3001;
server.listen(port, ()=> {
    console.log('socket is up and running');
})