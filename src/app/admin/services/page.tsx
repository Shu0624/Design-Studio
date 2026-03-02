'use client';

import { useState, useEffect } from 'react';
import { IService } from '@/types';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/admin/ImageUploader';
import Image from 'next/image';

export default function AdminServicesPage() {
    const [services, setServices] = useState<IService[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '🏗️',
        image: '',
        order: 0,
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            if (res.ok) setServices(await res.json());
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = editingId ? `/api/services/${editingId}` : '/api/services';
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchServices();
                resetForm();
            }
        } catch (error) {
            console.error('Failed to save service:', error);
        }
    };

    const handleEdit = (service: IService) => {
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon,
            image: service.image || '',
            order: service.order,
        });
        setEditingId(service._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this service?')) return;

        try {
            const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
            if (res.ok) setServices(services.filter((s) => s._id !== id));
        } catch (error) {
            console.error('Failed to delete service:', error);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', icon: '🏗️', image: '', order: 0 });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-charcoal mb-1">
                        Services
                    </h1>
                    <p className="text-warm-gray text-sm">{services.length} services listed</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(!showForm);
                    }}
                    className="px-6 py-3 bg-charcoal text-white text-sm font-medium hover:bg-accent-gold transition-colors cursor-pointer"
                >
                    {showForm ? 'Cancel' : '+ Add Service'}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white border border-light-border p-8 mb-8">
                    <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">
                        {editingId ? 'Edit Service' : 'New Service'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., Architecture Design"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Icon (emoji)"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="🏛️"
                                />
                                <Input
                                    label="Sort Priority"
                                    type="number"
                                    value={formData.order.toString()}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-warm-gray -mt-2 mb-3">
                            Sort Priority controls the order services appear on the website. Lower numbers appear first (e.g., 1 = first, 2 = second).
                        </p>
                        <Textarea
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe this service..."
                        />

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2 tracking-wide">
                                Service Image (optional)
                            </label>
                            <p className="text-xs text-warm-gray mb-3">
                                Upload an image to represent this service. It will be shown on the services page.
                            </p>
                            <ImageUploader
                                images={formData.image ? [formData.image] : []}
                                onChange={(images) => setFormData({ ...formData, image: images[0] || '' })}
                                maxImages={1}
                                label=" "
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" variant="primary">
                                {editingId ? 'Save Changes' : 'Add Service'}
                            </Button>
                            <Button type="button" variant="outline" onClick={resetForm}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="text-center py-12 text-warm-gray">Loading services...</div>
            ) : services.length === 0 ? (
                <div className="bg-white border border-light-border p-12 text-center">
                    <p className="text-2xl mb-3">⚙️</p>
                    <p className="text-warm-gray">No services yet. Add your first service to get started.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="bg-white border border-light-border p-6 flex items-start justify-between hover:border-accent-gold transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                {service.image ? (
                                    <div className="w-16 h-16 relative shrink-0 bg-gray-100">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-2xl">{service.icon}</span>
                                )}
                                <div>
                                    <h3 className="font-medium text-charcoal">{service.title}</h3>
                                    <p className="text-warm-gray text-sm mt-1 line-clamp-2">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 ml-4 shrink-0">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="text-sm text-accent-gold hover:underline cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="text-sm text-red-500 hover:underline cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
