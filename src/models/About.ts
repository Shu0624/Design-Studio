import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutDocument extends Document {
    founderName: string;
    founderBio: string;
    founderImages: string[];
    projectsCompleted: string;
    yearsOfExperience: string;
    happyClients: string;
    designAwards: string;
    createdAt: Date;
    updatedAt: Date;
}

const AboutSchema = new Schema<IAboutDocument>(
    {
        founderName: {
            type: String,
            required: [true, 'Founder name is required'],
            trim: true,
            default: 'Ar. Namrata Pawar',
        },
        founderBio: {
            type: String,
            required: [true, 'Founder bio is required'],
            default: 'Founder and Principal Architect',
        },
        founderImages: [
            {
                type: String,
            },
        ],
        projectsCompleted: {
            type: String,
            default: '50+',
        },
        yearsOfExperience: {
            type: String,
            default: '8+',
        },
        happyClients: {
            type: String,
            default: '30+',
        },
        designAwards: {
            type: String,
            default: '5',
        },
    },
    {
        timestamps: true,
    }
);

// Delete cached model to ensure schema changes take effect
if (mongoose.models.About) {
    delete mongoose.models.About;
}

export default mongoose.model<IAboutDocument>('About', AboutSchema);
