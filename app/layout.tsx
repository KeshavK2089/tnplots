import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TNPlots - Premium Land Plots in Tamil Nadu",
    description: "Discover verified land plots for sale across Tamil Nadu. Trusted marketplace for residential, agricultural, and commercial land with instant WhatsApp contact.",
    keywords: ["land plots", "Tamil Nadu", "real estate", "agricultural land", "residential plots", "premium plots"],
    authors: [{ name: "TNPlots" }],
    openGraph: {
        title: "TNPlots - Premium Land Plots in Tamil Nadu",
        description: "Verified land plots marketplace for Tamil Nadu",
        type: "website",
        locale: "en_IN",
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 5,
    },
    themeColor: "#f97316",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "TNPlots",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
            </head>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

import { Providers } from '@/components/providers/SessionProvider';
