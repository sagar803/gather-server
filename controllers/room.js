import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
    try {
      const { name, customId, createdBy, type, members, category, description, isActive } = req.body;
      const room = new Room({
        name,
        description,
        customId,
        createdBy,
        type,
        members,
        category,
      });
      const createdRoom = await room.save();
      res.status(201).json(createdRoom);
    } catch (error) {
      console.error('Error creating room', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getRooms = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      console.error('Error retrieving rooms', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getRoomById = async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      console.error('Error retrieving room by ID', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const updateRoom = async (req, res) => {
    try {
      const { name, customId, type, members, category, isActive } = req.body;
      const room = await Room.findByIdAndUpdate(
        req.params.id,
        {
          name,
          customId,
          type,
          members,
          category,
          isActive,
        },
        { new: true }
      );
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      console.error('Error updating room', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const deleteRoom = async (req, res) => {
    try {
      const room = await Room.findByIdAndDelete(req.params.id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      console.error('Error deleting room', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const joinRoom = async (req, res) => {
    const roomId = req.params.id;
    const { userId } = req.body;
  
    try {
      // Find the room by its ID
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      // Add the user to the members array
      room.members.push(userId);
      await room.save();
  
      res.json({ message: 'User joined the room successfully' });
    } catch (error) {
      console.error('Error joining room', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };