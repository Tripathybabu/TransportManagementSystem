'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { clearToken } from '@/lib/auth';
import { useMe } from '@/hooks/use-me';

export function AppShell({ children, title }: { children: React.ReactNode; title: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { data } = useMe();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
            <Button variant="ghost" onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
              Menu
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">TransportHub</span>
              <span className="text-sm text-muted-foreground">{title}</span>
            </div>

            <nav className="hidden flex-1 items-center gap-6 px-6 lg:flex">
              <Link href="/shipments" className="text-sm font-medium text-foreground hover:text-primary">
                Shipments
              </Link>
              {data?.me?.role === 'admin' && (
                <Link href="/admin/employees" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Employees
                </Link>
              )}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              {data?.me && <span className="text-sm text-muted-foreground">{data.me.name} ({data.me.role})</span>}
              <Button
                variant="outline"
                onClick={() => {
                  clearToken();
                  router.replace('/login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
