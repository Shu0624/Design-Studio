'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IProject } from '@/types';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter((p) => p._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-charcoal mb-1">
                        Projects
                    </h1>
                    <p className="text-warm-gray text-sm">{projects.length} projects total</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="px-6 py-3 bg-charcoal text-white text-sm font-medium hover:bg-accent-gold transition-colors"
                >
                    + Add Project
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-12 text-warm-gray">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="bg-white border border-light-border p-12 text-center">
                    <p className="text-2xl mb-3">🏗️</p>
                    <p className="text-warm-gray mb-4">No projects yet. Add your first project to get started.</p>
                    <Link
                        href="/admin/projects/new"
                        className="inline-block px-6 py-3 bg-accent-gold text-white text-sm font-medium hover:bg-accent-gold-light transition-colors"
                    >
                        + Add Project
                    </Link>
                </div>
            ) : (
                <div className="bg-white border border-light-border overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-light-border bg-off-white">
                                <th className="text-left px-6 py-3 text-xs font-medium text-warm-gray uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-warm-gray uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-warm-gray uppercase tracking-wider">
                                    Featured
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-warm-gray uppercase tracking-wider">
                                    Images
                                </th>
                                <th className="text-right px-6 py-3 text-xs font-medium text-warm-gray uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-light-border">
                            {projects.map((project) => (
                                <tr key={project._id} className="hover:bg-off-white/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-charcoal text-sm">
                                            {project.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs px-3 py-1 bg-off-white text-warm-gray capitalize">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs ${project.featured ? 'text-accent-gold' : 'text-warm-gray'}`}>
                                            {project.featured ? '★ Featured' : '—'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-warm-gray">
                                        {project.images?.length || 0}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/projects/${project._id}/edit`}
                                            className="text-sm text-accent-gold hover:underline mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="text-sm text-red-500 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
