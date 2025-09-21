import React from 'react';
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { App as AntdApp, ConfigProvider } from 'antd';
import { antdConfig } from '@/lib/antd-config';
import { SessionProvider } from '@/providers/SessionProvider';
import "./globals.css";
import MainLayout from "@/layouts/shared/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
  display: "swap",
});

// Fallback monospace font configuration
const monospaceFont = {
  variable: "--font-geist-mono",
  className: "font-mono",
};

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
        className={`${geistSans.variable} ${monospaceFont.variable} antialiased`}
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
