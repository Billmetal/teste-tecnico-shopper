import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "@/assets/css/Navbar-Right-Links-icons.css";
import "@/assets/css/styles.css";
import HeaderHome from "@/components/header-home";

export const metadata: Metadata = {
    title: "Shopper - Taxi",
    description: "Shopper - Taxi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <HeaderHome />
                {children}
            </body>
        </html>
    );
}
