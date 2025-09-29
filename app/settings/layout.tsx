"use client";

import { AuthProvider } from '@/hooks/use-auth';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}