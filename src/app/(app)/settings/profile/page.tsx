'use client';

 "use client";

 import { useEffect } from 'react';
 import { useRouter } from 'next/navigation';

 export default function SettingsProfilePage() {
   const router = useRouter();
   useEffect(() => {
     router.replace('/agent-evaluation');
   }, [router]);
   return null;
}