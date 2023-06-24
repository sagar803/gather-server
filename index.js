import express from 'express'
import dotenv  from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser'

import authRoutes from './routes/auth.js';
import roomRoutes from './routes/room.js';

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/auth", authRoutes);
app.use("/api", roomRoutes);

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

mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser : true, 
    useUnifiedTopology: true,
}) 
.then(() => {console.log('Connected to MongoDB')})
.catch((error) => { console.error('Error connecting to MongoDB:', error) });

const port = process.env.PORT || 3001;
server.listen(port, ()=> {
    console.log('socket is up and running');
})