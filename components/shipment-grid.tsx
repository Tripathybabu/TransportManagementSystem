"use client"

import { Badge } from "@/components/ui/badge"
import type { Shipment } from "@/lib/types"
import { getStatusColor } from "@/lib/utils"

interface ShipmentGridProps {
  shipments: Shipment[]
  onShipmentClick: (shipment: Shipment) => void
}

export function ShipmentGrid({ shipments, onShipmentClick }: ShipmentGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-balance">Shipment Management</h1>
        <p className="text-sm text-muted-foreground">{shipments.length} shipments</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Shipment ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Origin
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Destination
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Carrier
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Weight
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                ETA
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Cost
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Customer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shipments.map((shipment) => (
              <tr
                key={shipment.id}
                onClick={() => onShipmentClick(shipment)}
                className="cursor-pointer transition-colors hover:bg-muted/50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono font-medium">{shipment.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{shipment.origin}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{shipment.destination}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <Badge variant={getStatusColor(shipment.status)}>{shipment.status}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{shipment.carrier}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{shipment.weight}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{shipment.eta}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <Badge variant="outline">{shipment.priority}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{shipment.cost}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{shipment.customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
