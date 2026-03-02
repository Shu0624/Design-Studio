import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex-1 bg-gray-50">
                <div className="p-6 md:p-8 max-w-6xl">
                    {children}
                </div>
            </div>
        </div>
    );
}

