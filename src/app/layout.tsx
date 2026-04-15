import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Automobili Lamborghini - Official Website",
  description: "Official Lamborghini Website generated with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
