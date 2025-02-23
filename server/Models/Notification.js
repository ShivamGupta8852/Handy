import mongoose from "mongoose";

// To handle job updates(like inform worker when selected for a work , inform the provider when a worker applied or when job status(like accepted, completed, cancelled) changes for a work) , chat notification(like when new msg arrive in their chat or inform user(worker/provider) when chat is initiated by other user(worker/provider)), system updates(like announce platform updates e.g., new features, promotion or accouint issue in verificatiopn or policy violations)
const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['job', 'chat', 'system'], required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

const  Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;       