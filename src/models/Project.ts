import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectDocument extends Document {
    title: string;
    slug: string;
    category: string;
    description: string;
    images: string[];
    instagramUrl?: string;
    featured: boolean;
    createdAt: Date;
}

const ProjectSchema = new Schema<IProjectDocument>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    images: [{
        type: String,
    }],
    instagramUrl: {
        type: String,
        default: '',
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ProjectSchema.pre('save', function () {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

// Delete cached model to ensure schema changes (like removed enum) take effect
if (mongoose.models.Project) {
    delete mongoose.models.Project;
}

export default mongoose.model<IProjectDocument>('Project', ProjectSchema);
