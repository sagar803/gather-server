import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin : '*'
    }
})

app.get("/", (req ,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

io.on("connection" , (socket)=> {
    console.log("User Connected:" , socket.id)

    socket.on("join_room" , (data) => {
        socket.join(data.room);
        socket.to(data.room).emit("joined_room", data)
        console.log(data.userName, 'joined room:',  data.room);
    })
    socket.on("leave_room" , (data) => {
        socket.to(data.room).emit("left_room", data)
        console.log(data.userName, 'left room:',  data.room);
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