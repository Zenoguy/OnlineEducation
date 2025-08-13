"use client";

import { AuthProvider } from '@/hooks/use-auth';

export default function HomeworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}