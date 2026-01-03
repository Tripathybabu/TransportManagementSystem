"use client"

import type React from "react"

import { Package, MapPin, Calendar, DollarSign, MoreVertical, Edit2, Flag, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Shipment } from "@/lib/types"
import { getStatusColor } from "@/lib/utils"

interface ShipmentTilesProps {
  shipments: Shipment[]
  onShipmentClick: (shipment: Shipment) => void
}

export function ShipmentTiles({ shipments, onShipmentClick }: ShipmentTilesProps) {
  const handleMenuAction = (e: React.MouseEvent, action: string, shipment: Shipment) => {
    e.stopPropagation()
    console.log(`[v0] ${action} action for shipment:`, shipment.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-balance">Shipment Management</h1>
        <p className="text-sm text-muted-foreground">{shipments.length} shipments</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            onClick={() => onShipmentClick(shipment)}
            className="group relative cursor-pointer rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
          >
            {/* Header with ID and Menu */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Shipment ID</p>
                <p className="font-mono text-sm font-semibold">{shipment.id}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => handleMenuAction(e as any, "Edit", shipment)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleMenuAction(e as any, "Flag", shipment)}>
                    <Flag className="mr-2 h-4 w-4" />
                    Flag
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={(e) => handleMenuAction(e as any, "Delete", shipment)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <Badge variant={getStatusColor(shipment.status)}>{shipment.status}</Badge>
            </div>

            {/* Route Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Route</p>
                  <p className="truncate text-sm font-medium">{shipment.origin}</p>
                  <p className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-1">→</span> {shipment.destination}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Carrier</p>
                  <p className="text-sm font-medium">{shipment.carrier}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="text-sm font-medium">{shipment.eta}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-base font-semibold">{shipment.cost}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {shipment.priority}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
