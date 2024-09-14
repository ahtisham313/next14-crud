import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Web Innovations",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-3xl mx-auto text-slate-800"> 
          <header className="bg-purple-500 rounded-br-lg items-center rounded-bl-lg flex justify-between p-6 border-b">
           <Link href="/" className="font-bold text-white text-2xl">
           Web Development Innovations
           </Link>
           <Link href="/create" className="font-bold bg-slate-100 grid place-items-center rounded-full shadow-md p-2 px-4">
            Add New
           </Link>
          </header>
          <main className="p-4 text-lg">
        {children}
        </main>
        </div>
      </body>
    </html>
  );
}
