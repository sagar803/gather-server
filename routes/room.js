import express from 'express';
import { joinRoom, createRoom, getRooms, getRoomById, updateRoom, deleteRoom } from "../controllers/room.js";

const router = express.Router();

// POST /api/rooms
router.post('/rooms', createRoom);

// GET /api/rooms
router.get('/rooms', getRooms);

// GET /api/rooms/:id
router.get('/rooms/:id', getRoomById);

// PUT /api/rooms/:id
router.put('/rooms/:id', updateRoom);

// DELETE /api/rooms/:id
router.delete('/rooms/:id', deleteRoom);

// POST /api/rooms/:id/join
router.post('/rooms/:id/join', joinRoom);

export default router;
