import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  senderName: {
    type: String
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text',
  }
});

const Message = model('Message', messageSchema);

export default Message;
