import { NextResponse } from 'next/server';

// Authenticating with jsonwebtoken via cookies.
// It seems custom JWT judging from AdminSidebar (document.cookie = 'admin-token=...').
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import About from '@/models/About';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function isAuthenticated(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;

    if (!token) return false;

    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

export async function GET() {
    try {
        await dbConnect();

        // Return the first/only About document (we just need one for settings)
        const aboutInfo = await About.findOne();

        // If it doesn't exist, return defaults
        if (!aboutInfo) {
            return NextResponse.json({
                founderName: 'Ar. Namrata Pawar',
                founderBio: 'Architecture & Interior Design',
                founderImages: [],
                projectsCompleted: '50+',
                yearsOfExperience: '8+',
                happyClients: '30+',
                designAwards: '5',
            });
        }

        return NextResponse.json(aboutInfo);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch about info' },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    if (!(await isAuthenticated(req))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const data = await req.json();

        // Find existing or create a new one (singleton pattern)
        let aboutInfo = await About.findOne();

        if (aboutInfo) {
            aboutInfo.founderName = data.founderName;
            aboutInfo.founderBio = data.founderBio;
            aboutInfo.founderImages = data.founderImages;
            aboutInfo.projectsCompleted = data.projectsCompleted;
            aboutInfo.yearsOfExperience = data.yearsOfExperience;
            aboutInfo.happyClients = data.happyClients;
            aboutInfo.designAwards = data.designAwards;
            await aboutInfo.save();
        } else {
            aboutInfo = await About.create({
                founderName: data.founderName,
                founderBio: data.founderBio,
                founderImages: data.founderImages,
                projectsCompleted: data.projectsCompleted,
                yearsOfExperience: data.yearsOfExperience,
                happyClients: data.happyClients,
                designAwards: data.designAwards,
            });
        }

        return NextResponse.json(aboutInfo);
    } catch (error) {
        console.error('About save error:', error);
        return NextResponse.json(
            { error: 'Failed to update about info' },
            { status: 500 }
        );
    }
}
