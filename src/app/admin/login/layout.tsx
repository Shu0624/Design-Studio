export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Hide admin sidebar on login page */}
            <style>{`
        .flex.min-h-screen > aside { display: none !important; }
        .flex.min-h-screen > .flex-1 { padding: 0 !important; }
        .flex.min-h-screen > .flex-1 > div { padding: 0 !important; max-width: none !important; }
      `}</style>
            {children}
        </>
    );
}

