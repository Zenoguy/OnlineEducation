"use client";

import { AuthProvider } from '@/hooks/use-auth';

export default function ClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}