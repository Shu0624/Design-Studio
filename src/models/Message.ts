import mongoose, { Schema, Document } from 'mongoose';

export interface IMessageDocument extends Document {
    name: string;
    email: string;
    phone: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

const MessageSchema = new Schema<IMessageDocument>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Message || mongoose.model<IMessageDocument>('Message', MessageSchema);
