'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    return (
        <>
            {!isAdmin && <Navbar />}
            <main>{children}</main>
            {!isAdmin && <Footer />}
            {!isAdmin && <WhatsAppFloat />}
        </>
    );
}
