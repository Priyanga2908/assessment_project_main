"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/agent-evaluation');
  }, [router]);
  return null;
}
