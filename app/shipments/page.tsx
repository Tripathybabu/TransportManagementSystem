'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { LIST_SHIPMENTS_QUERY } from '@/lib/graphql/operations';
import type { Shipment } from '@/lib/graphql/types';
import { getStatusColor } from '@/lib/utils';
import { getToken } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';

type ListShipmentsResponse = {
  listShipments: {
    nodes: Shipment[];
    pageInfo: { page: number; pageSize: number; totalCount: number; hasNextPage: boolean };
  };
};

export default function ShipmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus && urlStatus !== status) {
      setStatus(urlStatus);
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filter = useMemo(() => {
    const f: Record<string, string> = {};
    if (status.trim()) f.status = status.trim();
    if (origin.trim()) f.origin = origin.trim();
    if (destination.trim()) f.destination = destination.trim();
    return Object.keys(f).length ? f : undefined;
  }, [status, origin, destination]);

  const { data, loading, error, refetch } = useQuery<ListShipmentsResponse>(LIST_SHIPMENTS_QUERY, {
    variables: {
      filter,
      pagination: { page, pageSize },
      sort: { field: 'createdAt', direction: 'desc' }
    },
    skip: !getToken(),
    fetchPolicy: 'cache-and-network'
  });

  if (!getToken()) {
    router.replace('/login');
    return null;
  }

  return (
    <AppShell title="Shipments">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Shipment Management</h1>
            <p className="text-sm text-muted-foreground">List, filter, sort, and inspect shipments from GraphQL.</p>
          </div>
          <Button variant="outline" onClick={() => refetch()} disabled={loading}>
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="CREATED / IN_TRANSIT" />
            </div>
            <div className="space-y-2">
              <Label>Origin</Label>
              <Input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Mumbai" />
            </div>
            <div className="space-y-2">
              <Label>Destination</Label>
              <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Pune" />
            </div>
            <div className="sm:col-span-3 flex gap-2">
              <Button
                onClick={() => {
                  setPage(1);
                  refetch();
                }}
              >
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStatus('');
                  setOrigin('');
                  setDestination('');
                  setPage(1);
                }}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-sm text-destructive">{error.message}</p>}
            {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Reference</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Origin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Destination</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Assigned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(data?.listShipments.nodes ?? []).map((s: Shipment) => (
                    <tr key={s.id} className="transition-colors hover:bg-muted/50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">
                        <Link className="underline underline-offset-4" href={`/shipments/${s.id}`}>
                          {s.reference}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{s.origin}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{s.destination}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <Badge variant={getStatusColor(s.status as any)}>{s.status}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{s.assignedTo?.name ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total: {data?.listShipments.pageInfo.totalCount ?? 0} | Page {data?.listShipments.pageInfo.page ?? page}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Prev
                </Button>
                <Button
                  variant="outline"
                  disabled={!data?.listShipments.pageInfo.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
