import Message from "../models/Message.js";
import Room from "../models/Room.js";

export const getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);

        if (!room) return res.status(404).send({ error: 'Room not found' });
        const messages = await Message.find({ roomId: roomId });
        if (!messages || messages.length === 0) return res.status(204).send({ Message: 'Messages not found for the specified room' });
        
        // Send the messages as the response
        res.status(200).send(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
