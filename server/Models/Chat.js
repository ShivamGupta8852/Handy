import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, 
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: { type: String },
      timestamp: { type: Date, default: Date.now },
      isRead: { type: Boolean, default: false }, // Message read status
    },
  ],
  lastMessage: { type: String },        // For quick previews of the most recent chat activity
  lastMessageTimestamp: { type: Date },
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
