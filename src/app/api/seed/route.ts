import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST() {
    try {
        await dbConnect();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Admin user already exists' },
                { status: 400 }
            );
        }

        // Check for required environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return NextResponse.json(
                { error: 'ADMIN_EMAIL and ADMIN_PASSWORD must be configured in environment variables' },
                { status: 500 }
            );
        }

        const hashedPassword = await hashPassword(adminPassword);

        const admin = await User.create({
            name: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully',
            user: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            }
        });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Failed to seed admin user' }, { status: 500 });
    }
}
