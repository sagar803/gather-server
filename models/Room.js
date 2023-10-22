import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  description:{
    type: String,
  },
  isPrivate: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: function() {
      return this.isPrivate;
    }
  },
  customId: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
