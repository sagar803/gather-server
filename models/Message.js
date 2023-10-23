import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
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
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String, // For image messages
  },
  audioUrl: {
      type: String, // For audio messages
  },
  chatType: {
    type: String,
    enum: ['personal', 'group'],
    required: true
},
});

const Message = model('Message', messageSchema);

export default Message;
