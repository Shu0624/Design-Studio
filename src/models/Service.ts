import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceDocument extends Document {
    title: string;
    description: string;
    icon: string;
    image?: string;
    order: number;
    createdAt: Date;
}

const ServiceSchema = new Schema<IServiceDocument>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    icon: {
        type: String,
        default: '🏗️',
    },
    image: {
        type: String,
        default: '',
    },
    order: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Service || mongoose.model<IServiceDocument>('Service', ServiceSchema);
