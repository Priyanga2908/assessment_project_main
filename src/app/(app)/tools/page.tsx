'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ToolsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/agent-evaluation');
  }, [router]);
  return null;
}