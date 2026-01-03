'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getToken } from '@/lib/auth';
import { useMe } from '@/hooks/use-me';

export default function EmployeesAliasPage() {
  const router = useRouter();
  const token = getToken();
  const { data, loading } = useMe();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }

    if (!loading && data?.me) {
      router.replace(data.me.role === 'admin' ? '/admin/employees' : '/shipments');
    }
  }, [token, loading, data, router]);

  return <div className="min-h-screen bg-background" />;
}
