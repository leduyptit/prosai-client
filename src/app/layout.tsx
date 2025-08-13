import React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider } from 'antd';
import { antdConfig } from '@/lib/antd-config';
import { SessionProvider } from '@/providers/SessionProvider';
import "./globals.css";
import MainLayout from "@/layouts/shared/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProSai Client - Project Management",
  description: "Modern project management application built with Next.js and Ant Design",
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
        suppressHydrationWarning={true}
      >
        <SessionProvider>
          <ConfigProvider
            locale={antdConfig.locale}
            theme={antdConfig.theme}
          >
            <MainLayout>
              {children}
            </MainLayout>
          </ConfigProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
