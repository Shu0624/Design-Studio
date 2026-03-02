import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

const DEFAULT_CATEGORIES = ['residential', 'commercial', 'interior', 'architecture'];

export async function GET() {
    try {
        await dbConnect();

        // Get distinct categories from existing projects
        const dbCategories: string[] = await Project.distinct('category');

        // Merge defaults with any custom ones from database
        const allCategories = [...new Set([...DEFAULT_CATEGORIES, ...dbCategories])];

        return NextResponse.json(allCategories.sort());
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(DEFAULT_CATEGORIES);
    }
}
