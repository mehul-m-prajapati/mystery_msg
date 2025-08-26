'use client';

import { SessionProvider } from "next-auth/react";

interface childrenInterface {
    children: React.ReactNode
}

export default function AuthProvider({children} : childrenInterface) {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
