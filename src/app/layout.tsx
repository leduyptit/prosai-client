import React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { App as AntdApp, ConfigProvider } from 'antd';
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
  title: "ProSai Client",
  description: "Property Management System",
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
            <AntdApp>
              <MainLayout>
                {children}
              </MainLayout>
            </AntdApp>
          </ConfigProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
