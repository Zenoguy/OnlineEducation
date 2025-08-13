"use client";

import { AuthProvider } from '@/hooks/use-auth';

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}