"use client"

import { ArrowLeft, Package, MapPin, Calendar, DollarSign, User, Weight, Truck, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Shipment } from "@/lib/types"
import { getStatusColor } from "@/lib/utils"

interface ShipmentDetailProps {
  shipment: Shipment
  onBack: () => void
}

export function ShipmentDetail({ shipment, onBack }: ShipmentDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to list</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-balance">Shipment Details</h1>
          <p className="text-sm text-muted-foreground">ID: {shipment.id}</p>
        </div>
        <Badge variant={getStatusColor(shipment.status)} className="text-base px-4 py-1.5">
          {shipment.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Route Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Origin</p>
                  <p className="text-base font-semibold">{shipment.origin}</p>
                  <p className="text-sm text-muted-foreground">{shipment.originAddress}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Destination</p>
                  <p className="text-base font-semibold">{shipment.destination}</p>
                  <p className="text-sm text-muted-foreground">{shipment.destinationAddress}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Distance</p>
                <p className="text-base font-semibold">{shipment.distance} miles</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Shipment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Carrier</p>
                      <p className="text-base font-semibold">{shipment.carrier}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Weight className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Weight</p>
                      <p className="text-base font-semibold">{shipment.weight}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Priority</p>
                      <Badge variant="outline" className="mt-1">
                        {shipment.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ship Date</p>
                      <p className="text-base font-semibold">{shipment.shipDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Estimated Arrival</p>
                      <p className="text-base font-semibold">{shipment.eta}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cost</p>
                      <p className="text-base font-semibold text-primary">{shipment.cost}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking History */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
              <CardDescription>Real-time updates for this shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipment.trackingHistory.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary bg-background">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>
                      {index < shipment.trackingHistory.length - 1 && <div className="h-full w-px bg-border" />}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-base font-semibold">{shipment.customer}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact</p>
                <p className="text-sm">{shipment.contact.email}</p>
                <p className="text-sm">{shipment.contact.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                Update Status
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Print Label
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Send Notification
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                View Invoice
              </Button>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Tracking Number</p>
                <p className="font-mono">{shipment.trackingNumber}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium text-muted-foreground">Container Type</p>
                <p>{shipment.containerType}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium text-muted-foreground">Service Type</p>
                <p>{shipment.serviceType}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
