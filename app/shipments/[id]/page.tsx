'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GET_SHIPMENT_QUERY } from '@/lib/graphql/operations';
import type { Shipment } from '@/lib/graphql/types';
import { getStatusColor } from '@/lib/utils';

type GetShipmentResponse = { shipment: Shipment | null };

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, loading, error } = useQuery<GetShipmentResponse>(GET_SHIPMENT_QUERY, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network'
  });

  const shipment = data?.shipment;

  return (
    <AppShell title="Shipment Detail">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          {shipment && <Badge variant={getStatusColor(shipment.status as any)}>{shipment.status}</Badge>}
        </div>

        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {error && <p className="text-sm text-destructive">{error.message}</p>}

        {shipment && (
          <Card>
            <CardHeader>
              <CardTitle>{shipment.reference}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Origin</span>
                <span>{shipment.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destination</span>
                <span>{shipment.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scheduled</span>
                <span>{shipment.scheduledAt ? new Date(shipment.scheduledAt).toLocaleString() : '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned To</span>
                <span>{shipment.assignedTo?.name ?? '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(shipment.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{new Date(shipment.updatedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
